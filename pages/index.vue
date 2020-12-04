<template>
  <section>
    <LoadingBar v-if="$fetchState.pending" />
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <section v-else>
      <!-- carousel -->
      <Carousel />
      <!-- end carousel -->

      <!-- search form -->
      <SearchForm />
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
import Carousel from '@/components/base/Carousel'
import CardJobs from '@/components/base/CardJobs'
import LoadingBar from '@/components/base/LoadingBar'
import SearchForm from '@/components/base/SearchForm'

export default {
  components: {
    Carousel,
    CardJobs,
    LoadingBar,
    SearchForm,
  },
  async fetch() {
    await this.getLatestJobs()
    await this.getFunctionJobs()
  },
  computed: {
    latestJobs() {
      return this.$store.state.jobs.latestJobs
    },
    functionJobs() {
      return this.$store.state.jobs.functionJobs
    },
  },
  methods: {
    ...mapActions({
      getLatestJobs: 'jobs/getLatestJobs',
      getFunctionJobs: 'jobs/getFunctionJobs',
    }),
  },
}
</script>
