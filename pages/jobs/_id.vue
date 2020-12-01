<template>
  <section>
    <v-container>
      <v-row>
        <!-- details job -->
        <v-col cols="9">
          <v-card elevation="1" rounded="lg">
            <v-card-text class="py-10">
              <p>hallo</p>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- end details job -->

        <!-- detail company -->
        <v-col cols="3">
          <v-card elevation="1" rounded="lg">
            <v-card-text class="text-center py-10">
              <v-img
                v-if="details.company_info.logo"
                :src="details.company_info.logo"
                :lazy-src="details.company_info.logo"
                width="75"
                height="75"
                contain
                class="mx-auto"
              >
              </v-img>
              <v-img
                v-else
                src="/placeholder-profile.svg"
                lazy-src="/placeholder-profile.svg"
                width="75"
                height="75"
                class="mx-auto"
              >
              </v-img>
              <h2 class="mt-5 mb-4">{{ details.company_name }}</h2>
              <span class="line-clamp-5">
                {{ details.company_info.description }}
              </span>
              <v-btn color="primary" to="#" class="mt-5"
                >Lihat Perusahaan</v-btn
              >
            </v-card-text>
          </v-card>
        </v-col>
        <!-- end detail company -->
      </v-row>
    </v-container>

    <!-- latest jobs -->
    <CardJobs :latest-jobs="latestJobs" />
    <!-- end latest jobs -->
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import CardJobs from '@/components/base/CardJobs'

export default {
  components: {
    CardJobs,
  },
  computed: {
    details() {
      return this.$store.state.jobs.detailJob
    },
    latestJobs() {
      return this.$store.state.jobs.latestJobs
    },
  },
  created() {
    this.getDetailJob(this.$route.params.id)
    this.getLatestJobs()
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
