<template>
  <section>
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

    <CardJobs :latest-jobs="jobs" />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import CardJobs from '@/components/base/CardJobs'
import regions from '@/assets/data/regions.json'
import jobTypes from '@/assets/data/job-types.json'
import educationTypes from '@/assets/data/education-types.json'

export default {
  components: {
    CardJobs,
  },
  computed: {
    jobs() {
      return this.$store.state.jobs.searchJobs.jobs
    },
    search() {
      return this.$route.query.search
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

<style></style>
