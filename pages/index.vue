<template>
  <section>
    <!-- carousel -->
    <Carousel />
    <!-- end carousel -->

    <!-- popular jobs -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>Pekerjaan Populer</h2>
        </v-col>
        <v-col cols="12">
          <v-chip
            link
            color="white"
            class="font-weight-bold"
            :ripple="{ class: 'blue--text' }"
            >Function Jobs</v-chip
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
import Carousel from '@/components/base/Carousel'
import CardJobs from '@/components/base/CardJobs'

export default {
  components: {
    Carousel,
    CardJobs,
  },
  computed: {
    latestJobs() {
      return this.$store.state.jobs.latestJobs
    },
  },
  created() {
    this.getLatestJobs()
  },
  methods: {
    ...mapActions({
      getLatestJobs: 'jobs/getLatestJobs',
    }),
  },
}
</script>
