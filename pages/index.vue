<template>
  <section>
    <LoadingBar v-if="$fetchState.pending" />
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <section v-else>
      <!-- carousel -->
      <Carousel />
      <!-- end carousel -->

      <!-- search form -->
      <v-container>
        <v-form ref="form" lazy-validation @submit.prevent="searchJobs()">
          <v-row no-gutters class="white px-4 py-2 rounded-lg elevation-1">
            <v-col cols="12">
              <v-text-field
                id="search"
                v-model="search.text"
                single-line
                label="Cari lowongan berdasarkan nama, perusahaan atau lokasi"
                title="Cari lowongan berdasarkan nama, perusahaan atau lokasi"
                type="text"
                background-color="white"
                hide-details="true"
              >
                <template v-slot:prepend-inner>
                  <v-icon
                    :style="$vuetify.breakpoint.smAndUp ? 'bottom: -4px' : ''"
                    >mdi-magnify</v-icon
                  >
                </template>
                <template v-if="$vuetify.breakpoint.smAndUp" v-slot:append>
                  <v-btn
                    class="px-6 rounded-lg"
                    color="primary"
                    type="input"
                    style="top: -12px"
                    >Cari</v-btn
                  >
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" class="mt-3">
              <v-row no-gutters>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="search.location"
                    :items="regions"
                    item-text="text"
                    item-value="value"
                    label="Lokasi"
                    hide-details="true"
                    prepend-icon="mdi-map-marker"
                    single-line
                    solo
                    flat
                    @change="searchJobs()"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="search.jobTypes"
                    :items="jobTypes"
                    item-text="text"
                    item-value="value"
                    label="Tipe Pekerjaan"
                    hide-details="true"
                    prepend-icon="mdi-briefcase-variant"
                    single-line
                    solo
                    flat
                    @change="searchJobs()"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="search.educationTypes"
                    :items="educationTypes"
                    item-text="text"
                    item-value="value"
                    label="Tingkat Pendidikan"
                    hide-details="true"
                    prepend-icon="mdi-school"
                    single-line
                    solo
                    flat
                    @change="searchJobs()"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-btn
              v-if="$vuetify.breakpoint.xs"
              block
              class="mt-8"
              color="primary rounded-lg"
              type="input"
              style="top: -12px"
              >Cari</v-btn
            >
          </v-row>
        </v-form>
      </v-container>
      <!-- end search form -->

      <!-- popular jobs -->
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2>Pekerjaan Populer</h2>
          </v-col>
          <v-col cols="12">
            <v-chip
              v-for="(job, index) in functionJobs"
              :key="index"
              link
              color="white"
              class="font-weight-bold mr-2 mb-4 elevation-1"
              :ripple="{ class: 'blue--text' }"
              >{{ job }}</v-chip
            >
          </v-col>
        </v-row>
      </v-container>
      <!-- popular jobs -->

      <!-- latest jobs -->
      <CardJobs :latest-jobs="latestJobs" :wording="true" />
      <!-- end latest jobs -->

      <!-- banner post jobs -->
      <section class="white py-8">
        <v-container>
          <v-row align="center" no-gutters>
            <v-col cols="12" sm="8">
              <h2 class="font-weight-bold text-h4 mb-5">
                Ingin Posting Pekerjaan ?
              </h2>
              <p class="body-1">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque,
                aperiam. Molestiae error nulla nostrum necessitatibus iure, quos
                veniam provident in ipsa eaque commodi.
              </p>
            </v-col>
            <v-col cols="12" sm="4" class="text-sm-right">
              <v-btn color="error" large>Posting Pekerjaan</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <!-- end banner post jobs -->
    </section>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import regions from '@/assets/data/regions.json'
import jobTypes from '@/assets/data/job-types.json'
import educationTypes from '@/assets/data/education-types.json'
import Carousel from '@/components/base/Carousel'
import CardJobs from '@/components/base/CardJobs'
import LoadingBar from '@/components/base/LoadingBar'

export default {
  components: {
    Carousel,
    CardJobs,
    LoadingBar,
  },
  async fetch() {
    await this.getLatestJobs()
    await this.getFunctionJobs()
  },
  data: () => ({
    search: {
      text: '',
      location: '',
      jobTypes: '',
      educationTypes: '',
      limit: 12,
      offset: 0,
    },
  }),
  computed: {
    latestJobs() {
      return this.$store.state.jobs.latestJobs
    },
    functionJobs() {
      return this.$store.state.jobs.functionJobs
    },
    regions() {
      return regions
    },
    jobTypes() {
      return jobTypes
    },
    educationTypes() {
      return educationTypes
    },
  },
  methods: {
    ...mapActions({
      getLatestJobs: 'jobs/getLatestJobs',
      getFunctionJobs: 'jobs/getFunctionJobs',
      searchJobsAction: 'jobs/searchJobsAction',
    }),
    async searchJobs() {
      try {
        await this.searchJobsAction(this.search)
        await this.$router.push({
          path: '/jobs/list',
          query: { search: this.search },
        })
      } catch (error) {
        error({ statusCode: 404, message: 'Jobs not found' })
      }
    },
  },
}
</script>
