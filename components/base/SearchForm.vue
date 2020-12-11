<template>
  <!-- search form -->
  <v-container>
    <v-form ref="form" lazy-validation @submit.prevent="searchJobs()">
      <v-row no-gutters :class="`white px-4 py-2 rounded-lg ${elevation}`">
        <v-col cols="12">
          <v-text-field
            id="search"
            v-model="text"
            single-line
            label="Cari lowongan berdasarkan nama, perusahaan atau lokasi pekerjaan"
            title="Cari lowongan berdasarkan nama, perusahaan atau lokasi pekerjaan"
            type="text"
            background-color="white"
            hide-details="true"
          >
            <template v-slot:prepend-inner>
              <v-icon :style="$vuetify.breakpoint.smAndUp ? 'bottom: -4px' : ''"
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
                v-model="location"
                :items="regions"
                item-text="text"
                item-value="value"
                label="Lokasi"
                hide-details="true"
                prepend-icon="mdi-map-marker"
                single-line
                solo
                flat
                class="rounded-0 pr-sm-3"
                @change="searchJobs()"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                v-model="job"
                :items="jobTypes"
                item-text="text"
                item-value="value"
                label="Tipe Pekerjaan"
                hide-details="true"
                prepend-icon="mdi-briefcase-variant"
                single-line
                solo
                flat
                class="px-sm-3 rounded-0"
                :style="
                  $vuetify.breakpoint.smAndUp
                    ? `border-left: 1px solid rgba(0, 0, 0, 0.42) !important;
                  border-right: 1px solid rgba(0, 0, 0, 0.42) !important;`
                    : ''
                "
                @change="searchJobs()"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                v-model="education"
                :items="educationTypes"
                item-text="text"
                item-value="value"
                label="Tingkat Pendidikan"
                hide-details="true"
                prepend-icon="mdi-school"
                single-line
                solo
                flat
                class="rounded-0 pl-sm-3"
                @change="searchJobs()"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-btn
          v-if="$vuetify.breakpoint.xs"
          block
          class="mt-6"
          color="primary rounded-lg"
          type="input"
          >Cari</v-btn
        >
      </v-row>
    </v-form>
  </v-container>
  <!-- end search form -->
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import regions from '@/assets/data/regions.json'
import jobTypes from '@/assets/data/job-types.json'
import educationTypes from '@/assets/data/education-types.json'

export default {
  props: {
    elevation: {
      type: String,
      default: () => {
        return 'elevation-1'
      },
    },
  },
  computed: {
    regions() {
      return regions
    },
    jobTypes() {
      return jobTypes
    },
    educationTypes() {
      return educationTypes
    },
    text: {
      get() {
        return this.$store.state.jobs.search.text
      },
      set(value) {
        this.setText(value)
      },
    },
    location: {
      get() {
        return this.$store.state.jobs.search.location
      },
      set(value) {
        this.setLocation(value)
      },
    },
    job: {
      get() {
        return this.$store.state.jobs.search.jobTypes
      },
      set(value) {
        this.setJob(value)
      },
    },
    education: {
      get() {
        return this.$store.state.jobs.search.educationTypes
      },
      set(value) {
        this.setEducation(value)
      },
    },
  },
  methods: {
    ...mapMutations({
      setText: 'jobs/SET_SEARCH_TEXT',
      setLocation: 'jobs/SET_SEARCH_LOCATION',
      setJob: 'jobs/SET_SEARCH_JOB_TYPES',
      setEducation: 'jobs/SET_SEARCH_EDUCATION_TYPES',
      setLimit: 'jobs/SET_SEARCH_LIMIT',
      setOffset: 'jobs/SET_SEARCH_OFFSET',
    }),
    ...mapActions({
      searchJobsAction: 'jobs/searchJobsAction',
    }),
    async searchJobs() {
      try {
        this.setLimit(12)
        this.setOffset(0)
        await this.searchJobsAction(this.$store.state.jobs.search)
        await this.$router.push('/jobs/job_board')
      } catch (error) {
        error({ statusCode: 404, message: 'Jobs not found' })
      }
    },
  },
}
</script>

<style scoped></style>
