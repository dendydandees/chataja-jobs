<template>
  <section>
    <v-row no-gutters>
      <v-col cols="12" class="white">
        <SearchForm elevation="elevation-0" />
      </v-col>
    </v-row>
    <CardJobs :latest-jobs="jobs" />
  </section>
</template>

<script>
import CardJobs from '@/components/base/CardJobs'
import SearchForm from '@/components/base/SearchForm'

export default {
  components: {
    CardJobs,
    SearchForm,
  },
  computed: {
    jobs() {
      return this.$store.state.jobs.searchJobs.jobs
    },
  },
}
</script>

<style></style>
