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
        <v-row>
          <v-col cols="12">
            <v-card elevation="1" rounded="lg">
              <v-card-text class="pa-4 pa-md-8">
                <v-row>
                  <v-col cols="12" sm="auto">
                    <v-img
                      v-if="company.logo !== null"
                      :src="company.logo"
                      :lazy-src="company.logo"
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
                      {{ company.name }}
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
                      class="text-decoration-none"
                      outlined
                      :href="`${company.url}`"
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
                    <div
                      v-sanitize.basic="company.description"
                      class="body-2"
                    ></div>
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
                    <a class="body-2" :href="`${company.url}`" target="blank">
                      {{ company.url }}
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
              <v-col cols="auto" class="text-right">
                <v-btn icon @click="prev">
                  <v-icon>mdi-chevron-left-circle-outline</v-icon>
                </v-btn>
                <v-btn icon @click="next">
                  <v-icon>mdi-chevron-right-circle-outline</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-slide-group v-model="model" center-active mandatory>
              <v-slide-item
                v-for="job in jobList"
                :key="job.id"
                v-slot="{ active, toggle }"
              >
                <v-card
                  :color="active ? 'grey lighten-4' : ''"
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
                            :color="
                              localStorageJobs.some(
                                (item) => item.id === job.id
                              )
                                ? 'primary'
                                : ''
                            "
                            icon
                            v-bind="attrs"
                            v-on="on"
                            @click="savedToLocalStorage(job)"
                          >
                            <v-icon>{{
                              localStorageJobs.some(
                                (item) => item.id === job.id
                              )
                                ? 'mdi-bookmark'
                                : 'mdi-bookmark-outline'
                            }}</v-icon>
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
                    class="rounded img-border"
                  >
                  </v-img>
                  <v-img
                    v-else
                    src="/placeholder-profile.svg"
                    lazy-src="/placeholder-profile.svg"
                    width="75"
                    height="75"
                    class="rounded img-border"
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
    // get company from job store
    this.company = this.$store.state.jobs.companyDetails
  },
  // call fetch only on client-side
  fetchOnServer: false,
  data: () => ({
    model: 0,
    company: [],
  }),
  computed: {
    // get code from params
    code() {
      return this.$route.params.code
    },
    // get job list company from job store
    jobList() {
      return this.$store.state.jobs.companyDetails.jobs_info.jobs
    },
    // get saved jobs from local storage
    localStorageJobs() {
      if (localStorage.length > 0) {
        const data = localStorage.getItem('savedJobs')
        return JSON.parse(data)
      } else {
        return []
      }
    },
  },
  methods: {
    // get actions from job store
    ...mapActions({
      getCompanyDetail: 'jobs/getCompanyDetail',
    }),
    // set saved jobs and save data to local storage
    savedToLocalStorage(job) {
      if (!this.localStorageJobs.includes(job)) {
        this.localStorageJobs.push(job)
        return localStorage.setItem(
          'savedJobs',
          JSON.stringify(this.localStorageJobs)
        )
      } else {
        return undefined
      }
    },
    // prev function for list jobs
    prev() {
      this.model === 0
        ? (this.model = this.jobList.length - 1)
        : (this.model -= 1)
    },
    // next function for list jobs
    next() {
      this.model === this.jobList.length - 1
        ? (this.model = 0)
        : (this.model += 1)
    },
  },
  // set title of page
  head() {
    return {
      title: `${this.company?.name} | ChatAja Jobs`,
    }
  },
}
</script>

<style scoped>
.blue-custom-bg {
  background-color: #f2f6fd;
}
li {
  margin-bottom: 8px !important;
}
</style>
