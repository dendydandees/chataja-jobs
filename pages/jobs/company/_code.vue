<template>
  <section>
    <LoadingBar v-if="$fetchState.pending" />
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <section v-else>
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card elevation="1" rounded="lg">
              <v-card-text class="pa-4 pa-md-8">
                <v-row>
                  <v-col cols="12" sm="auto">
                    <v-img
                      v-if="company.company_info.logo !== null"
                      :src="company.company_info.logo"
                      :lazy-src="company.company_info.logo"
                      width="100"
                      height="100"
                      contain
                      class="mx-auto mx-sm-0 rounded img-border"
                    >
                    </v-img>
                    <v-img
                      v-else
                      src="/placeholder-profile.svg"
                      lazy-src="/placeholder-profile.svg"
                      width="100"
                      height="100"
                      class="mx-auto mx-sm-0 rounded img-border"
                    >
                    </v-img>
                  </v-col>
                  <v-col class="text-center text-sm-left">
                    <h2 class="headline font-weight-bold mb-2">
                      {{ company.company_name }}
                    </h2>
                    <p class="subtitle-1 ma-0">
                      {{
                        `${company.google_location.address_components.city}, ${company.google_location.address_components.region}, ${company.google_location.address_components.country}`
                      }}
                    </p>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="auto"
                    align-self="center"
                    class="text-center text-sm-left"
                  >
                    <v-btn
                      color="primary"
                      outlined
                      :href="`${company.company_info.url}`"
                      target="blank"
                    >
                      <v-icon left> mdi-web </v-icon>
                      Kunjungi Website
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card elevation="1" rounded="lg">
              <v-card-text class="pa-4 pa-md-10">
                <h3 class="font-weight-bold headline">Tentang Kami</h3>
                <hr class="grey lighten-5 my-4" />
                <v-row no-gutters class="mb-4">
                  <v-col cols="12">
                    <h6 class="subtitle-2 mb-2 font-weight-bold">Deskripsi</h6>
                    <div class="body-2" v-html="company.description"></div>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mb-4">
                  <v-col cols="12">
                    <h6 class="subtitle-2 mb-2 font-weight-bold">Lokasi</h6>
                    <p class="body-2">
                      {{
                        `${company.google_location.address_components.city}, ${company.google_location.address_components.region}, ${company.google_location.address_components.country}`
                      }}
                    </p>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mb-4">
                  <v-col cols="12">
                    <h6 class="subtitle-2 mb-2 font-weight-bold">Alamat</h6>
                    <p class="body-2">
                      {{ company.google_location.raw_string }}
                    </p>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mb-4">
                  <v-col cols="12">
                    <h6 class="subtitle-2 mb-2 font-weight-bold">Website</h6>
                    <a
                      class="body-2"
                      :href="`${company.company_info.url}`"
                      target="blank"
                    >
                      {{ company.company_info.url }}
                    </a>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <!-- opened jobs -->
      <v-row no-gutters>
        <v-col cols="12" class="py-10 blue-custom-bg">
          <v-container>
            <v-row align="center" no-gutters class="mb-5">
              <v-col>
                <h2>Pekerjaan Tersedia</h2>
              </v-col>
            </v-row>
            <v-slide-group
              multiple
              show-arrows="desktop"
              next-icon="mdi-chevron-right-circle-outline"
              prev-icon="mdi-chevron-left-circle-outline"
            >
              <v-slide-item
                v-for="job in jobList"
                :key="job.id"
                v-slot="{ active, toggle }"
              >
                <v-card
                  elevation="1"
                  rounded="lg"
                  class="pa-4 mr-4"
                  height="100%"
                  width="300px"
                  :input-value="active"
                  @click="toggle"
                >
                  <v-row no-gutters class="mb-4">
                    <v-col cols="10">
                      <h4 class="font-weight-bold title line-clamp">
                        {{ job.name }}
                      </h4>
                    </v-col>
                    <v-col cols="2" class="text-right">
                      <v-tooltip top color="primary" close-delay="250">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                            @click="savedToLocalStorage(job)"
                          >
                            <v-icon>mdi-bookmark-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>Simpan Pekerjaan</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                  <v-img
                    v-if="job.company_info.logo !== null"
                    :src="job.company_info.logo"
                    :lazy-src="job.company_info.logo"
                    width="75"
                    height="75"
                    contain
                  >
                  </v-img>
                  <v-img
                    v-else
                    src="/placeholder-profile.svg"
                    lazy-src="/placeholder-profile.svg"
                    width="75"
                    height="75"
                  >
                  </v-img>
                  <v-card-text class="px-0" style="height: 180px">
                    <p class="font-weight-regular text--primary subtitle-1">
                      {{ job.company_name }}
                    </p>
                    <p class="mb-2 font-weight-bold">
                      {{ job.google_location.address_components.city }},
                      {{ job.google_location.address_components.region }}
                    </p>
                    <p class="mb-2 font-weight-bold">
                      {{ job.tenure }}
                    </p>
                  </v-card-text>
                  <hr class="grey lighten-5" />
                  <v-card-actions class="px-0 pb-0 pt-4">
                    <v-row no-gutters align="center">
                      <v-col>
                        <span v-if="job.activation_date !== null">{{
                          $moment(job.activation_date).fromNow()
                        }}</span>
                        <span v-else></span>
                      </v-col>
                      <v-col class="text-right">
                        <nuxt-link
                          :to="`/jobs/${job.id}`"
                          class="text-decoration-none font-weight-bold"
                          >Lihat Detail</nuxt-link
                        >
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-container>
        </v-col>
      </v-row>
      <!-- end opened jobs -->
    </section>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  async fetch() {
    await this.getCompanyDetail(this.code)
  },
  data: () => ({
    savedItem: [],
  }),
  computed: {
    code() {
      return this.$route.params.code
    },
    company() {
      return this.$store.state.jobs.companyDetails.jobs[0]
    },
    jobList() {
      return this.$store.state.jobs.companyDetails.jobs
    },
  },
  methods: {
    ...mapActions({
      getCompanyDetail: 'jobs/getCompanyDetail',
    }),
    savedToLocalStorage(job) {
      if (!this.savedItem.includes(job)) {
        this.savedItem.push(job)
        return localStorage.setItem('savedJobs', JSON.stringify(this.savedItem))
      } else {
        return undefined
      }
    },
  },
}
</script>

<style scoped>
.blue-custom-bg {
  background-color: #f2f6fd;
}
</style>
