/* eslint-disable vue/no-v-html */
<template>
  <section>
    <LoadingBar v-if="$fetchState.pending" />
    <Error v-else-if="$fetchState.error" @refresh="$fetch" />
    <section v-else>
      <v-container>
        <!-- back button -->
        <v-row no-gutters>
          <v-col class="py-4">
            <v-btn text color="primary" @click="$router.go(-1)">
              <v-icon left>mdi-arrow-left</v-icon>
              Kembali
            </v-btn>
          </v-col>
        </v-row>
        <!-- end back button -->
        <v-row dense>
          <!-- details job -->
          <v-col cols="12" md="9">
            <v-card elevation="1" rounded="lg">
              <v-card-text class="pa-4 pa-md-10">
                <v-row no-gutters class="mb-2">
                  <v-col>
                    <span class="subtitle-1">{{ details.company_name }}</span>
                  </v-col>
                  <v-col class="text-right">
                    <span
                      v-if="details.activation_date !== null"
                      class="subtitle-1"
                    >
                      <v-icon class="mr-1" small
                        >mdi-clock-time-three-outline</v-icon
                      >
                      {{
                        $moment(details.activation_date).format('D MMM YYYY')
                      }}
                    </span>
                    <span v-else></span>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mb-5">
                  <v-col cols="10">
                    <h1 class="display-2 font-weight-bold">
                      {{ details.name }}
                    </h1>
                  </v-col>
                  <v-col cols="2" class="text-right">
                    <v-tooltip top color="primary" close-delay="250">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" large v-on="on">
                          <v-icon>mdi-bookmark-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>Simpan Pekerjaan</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12" sm="4" class="mb-4 mb-sm-0">
                    <h6 class="mb-2 subtitle-1">Lokasi</h6>
                    <span class="font-weight-bold">{{
                      `${details.google_location.address_components.city}, ${details.google_location.address_components.country}`
                    }}</span>
                  </v-col>
                  <v-col cols="12" sm="4" class="mb-4 mb-sm-0">
                    <h6 class="mb-2 subtitle-1">Jenis Pekerjaan</h6>
                    <span class="font-weight-bold">{{ details.tenure }}</span>
                  </v-col>
                  <v-col cols="12" sm="4" class="mb-4 mb-sm-0">
                    <h6 class="mb-2 subtitle-1">Kisaran Gaji</h6>
                    <span class="font-weight-bold green--text"
                      >{{
                        details.salary_shown === false ||
                        details.salary_currency === null
                          ? '-'
                          : `${details.salary_currency} ${details.base_salary} - ${details.maximum_salary}`
                      }}
                    </span>
                  </v-col>
                </v-row>
                <hr class="grey lighten-5 my-4" />
                <v-row no-gutters class="mb-8">
                  <v-col cols="12">
                    <h6 class="subtitle-1 mb-2 font-weight-bold">
                      Deksripsi Pekerjaan
                    </h6>
                    <div class="body-2" v-html="details.description"></div>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mb-8">
                  <v-col cols="12">
                    <h6 class="subtitle-1 mb-2 font-weight-bold">
                      Persyaratan Pekerjaan
                    </h6>
                    <div class="body-2" v-html="details.qualifications"></div>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mb-4">
                  <v-col cols="12">
                    <h6 class="subtitle-1 mb-2 font-weight-bold">
                      Tingkat Pendidikan
                    </h6>
                    <p class="body-2">
                      {{ educationTypes }}
                    </p>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mb-6">
                  <v-col cols="12">
                    <h6 class="subtitle-1 mb-2 font-weight-bold">
                      Batas Waktu Aplikasi
                    </h6>
                    <p class="body-2">
                      {{
                        $moment(details.application_end_date).format(
                          'D MMM YYYY'
                        )
                      }}
                    </p>
                  </v-col>
                </v-row>
                <div class="text-sm-right">
                  <v-btn color="warning" large class="mr-4">
                    <v-icon left> mdi-share-variant </v-icon>
                    Bagikan
                  </v-btn>
                  <v-btn
                    color="primary"
                    large
                    :href="`https://www.kalibrr.id/c/${details.company_info.code}/jobs/${details.id}/${details.slug}`"
                    target="blank"
                  >
                    <v-icon left> mdi-send </v-icon>
                    Lamar
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- end details job -->

          <!-- detail company -->
          <v-col cols="12" md="3">
            <v-card elevation="1" rounded="lg">
              <v-card-text class="text-center py-4 py-md-10">
                <v-img
                  v-if="details.company_info.logo !== undefined"
                  :src="details.company_info.logo"
                  :lazy-src="details.company_info.logo"
                  width="75"
                  height="75"
                  contain
                  class="mx-auto rounded img-border"
                >
                </v-img>
                <v-img
                  v-else
                  src="/placeholder-profile.svg"
                  lazy-src="/placeholder-profile.svg"
                  width="75"
                  height="75"
                  class="mx-auto rounded img-border"
                >
                </v-img>
                <h2 class="mt-5 mb-4 title font-weight-bold">
                  {{ details.company_name }}
                </h2>
                <p class="line-clamp-5 mb-5 body-2">
                  {{ details.company_info.description }}
                </p>
                <v-btn
                  color="primary"
                  :to="`/jobs/company/${details.company.code}`"
                >
                  Lihat Perusahaan
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- end detail company -->
        </v-row>
      </v-container>

      <!-- latest jobs -->
      <CardJobs :latest-jobs="latestJobs" :wording="true" />
      <!-- end latest jobs -->
    </section>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import CardJobs from '@/components/base/CardJobs'
import LoadingBar from '@/components/base/LoadingBar'

export default {
  components: {
    CardJobs,
    LoadingBar,
  },
  async fetch() {
    await this.getDetailJob(this.id)
    this.details = this.$store.state.jobs.detailJob
    await this.getLatestJobs()
  },
  data: () => ({
    details: [],
  }),
  computed: {
    id() {
      return this.$route.params.id
    },
    latestJobs() {
      return this.$store.state.jobs.latestJobs
    },
    educationTypes() {
      const level = this.details.education_level
      if (level === 100) {
        return 'SD / SMP'
      } else if (level === 150 || level === 200) {
        return 'SMA / SMK'
      } else if (level === 300 || level === 350) {
        return 'Diploma 3'
      } else if (level === 400 || level === 450) {
        return 'Diploma 1 / Diploma 2'
      } else if (level === 500 || level === 550) {
        return 'Sarjana'
      } else if (level === 600 || level === 650) {
        return 'Magister'
      } else if (level === 700 || level === 750) {
        return 'Doktor'
      } else {
        return '-'
      }
    },
  },
  methods: {
    ...mapActions({
      getDetailJob: 'jobs/getDetailJob',
      getLatestJobs: 'jobs/getLatestJobs',
    }),
  },
}
</script>

<style></style>
