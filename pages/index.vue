<template>
  <LoadingBar v-if="$fetchState.pending" />
  <Error v-else-if="$fetchState.error" @refresh="$fetch" />
  <section v-else>
    <!-- check profile job seeker  -->
    <BannerProfile v-if="hasProfile" @close="hasProfile = !hasProfile" />
    <!-- end check profile job seeker  -->

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
            class="font-weight-bold mr-2 mb-4 elevation-1 subtitle-1"
            :ripple="{ class: 'blue--text' }"
            @click="toJobBoard(job)"
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
    <section v-if="!this.$store.state.auth.loggedIn" class="white py-8">
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
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import Carousel from '@/components/base/Carousel'
import CardJobs from '@/components/base/CardJobs'
import LoadingBar from '@/components/base/LoadingBar'
import SearchForm from '@/components/base/SearchForm'
import BannerProfile from '@/components/BannerProfile'

export default {
  components: {
    Carousel,
    CardJobs,
    LoadingBar,
    SearchForm,
    BannerProfile,
  },
  async fetch() {
    await this.getLatestJobs()
    await this.getFunctionJobs()
    if (this.$store.state.auth.loggedIn) {
      await this.getProfile(this.$auth.strategy.token.get())
    }
  },
  // call fetch only on client-side
  fetchOnServer: false,
  computed: {
    // get latest jobs from job store
    latestJobs() {
      return this.$store.state.jobs.latestJobs
    },
    // get function jobs name from job store
    functionJobs() {
      return this.$store.state.jobs.functionJobs
    },
    // get profile check state from account seeker store
    hasProfile: {
      get() {
        return this.$store.state.accountSeeker.hasProfile
      },
      set(value) {
        this.checkProfile(value)
      },
    },
  },
  created() {
    // reset search form
    this.setDefaultSearch()
  },
  methods: {
    // get mutations from job and account seeker store
    ...mapMutations({
      setDefaultSearch: 'jobs/SET_DEFAULT_SEARCH',
      setSearchText: 'jobs/SET_SEARCH_TEXT',
      checkProfile: 'accountSeeker/SET_CHECK_PROFILE',
    }),
    // get actions from job and account seeker store
    ...mapActions({
      getLatestJobs: 'jobs/getLatestJobs',
      getFunctionJobs: 'jobs/getFunctionJobs',
      getProfile: 'accountSeeker/getProfile',
    }),
    // set search jobs
    toJobBoard(jobFunction) {
      this.setSearchText(jobFunction)
      this.$router.push('/jobs/job_board')
    },
  },
}
</script>
