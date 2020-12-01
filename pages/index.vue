<template>
  <section>
    <!-- carousel -->
    <Carousel />
    <!-- end carousel -->

    <!-- search form -->
    <v-container>
      <form ref="form" action="" method="GET">
        <v-row no-gutters class="white px-4 py-2 rounded-lg elevation-1">
          <v-col cols="12">
            <v-text-field
              id="search"
              v-model="search.text"
              single-line
              label="Cari lowongan berdasarkan nama, perusahaan atau lokasi"
              title="Cari lowongan berdasarkan nama, perusahaan atau lokasi"
              required
              type="text"
              background-color="white"
              hide-details="true"
            >
              <template v-slot:prepend-inner>
                <v-icon style="bottom: -4px">mdi-magnify</v-icon>
              </template>
              <template v-slot:append>
                <v-btn
                  class="px-6"
                  color="primary rounded-lg"
                  type="input"
                  style="top: -12px"
                  >Cari</v-btn
                >
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" class="mt-2">
            <v-row no-gutters>
              <v-col>
                <v-select
                  v-model="search.location"
                  :items="regions"
                  label="Lokasi"
                  hide-details="true"
                  prepend-icon="mdi-map"
                  single-line
                  solo
                  flat
                ></v-select>
              </v-col>
              <v-col class="mx-2">
                <v-select
                  v-model="search.jobTypes"
                  :items="jobTypes"
                  label="Tipe Pekerjaan"
                  hide-details="true"
                  prepend-icon="mdi-map"
                  single-line
                  solo
                  flat
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  v-model="search.educationTypes"
                  :items="educationTypes"
                  label="Tingkat Pendidikan"
                  hide-details="true"
                  prepend-icon="mdi-map"
                  single-line
                  solo
                  flat
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </form>
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
            class="font-weight-bold mr-4 elevation-1"
            :ripple="{ class: 'blue--text' }"
            >{{ job }}</v-chip
          >
        </v-col>
      </v-row>
    </v-container>
    <!-- popular jobs -->

    <!-- latest jobs -->
    <CardJobs :latest-jobs="latestJobs" />
    <!-- end latest jobs -->
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import regions from '@/assets/data/regions.json'
import jobTypes from '@/assets/data/job-types.json'
import educationTypes from '@/assets/data/education-types.json'
import Carousel from '@/components/base/Carousel'
import CardJobs from '@/components/base/CardJobs'

export default {
  components: {
    Carousel,
    CardJobs,
  },
  data: () => ({
    search: {
      text: '',
      location: '',
      jobTypes: '',
      educationTypes: '',
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
      return educationTypes.map((item) => item.text)
    },
  },
  created() {
    this.getLatestJobs()
    this.getFunctionJobs()
  },
  methods: {
    ...mapActions({
      getLatestJobs: 'jobs/getLatestJobs',
      getFunctionJobs: 'jobs/getFunctionJobs',
    }),
  },
}
</script>
