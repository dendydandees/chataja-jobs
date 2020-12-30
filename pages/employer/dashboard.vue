<template>
  <v-container>
    <v-row no-gutters align="center" class="my-7">
      <v-col>
        <v-tabs
          v-model="tab"
          background-color="#f5f5f5"
          show-arrows
          :slider-size="4"
          class="px-1"
        >
          <v-tab href="#published_jobs"> Published Jobs </v-tab>
          <v-tab href="#closed_jobs"> Closed Jobs </v-tab>
          <v-tab href="#draft_jobs"> Draft Jobs </v-tab>
          <v-tab href="#archived_jobs"> Archived Jobs </v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12" sm="auto" class="my-4 my-sm-0">
        <v-btn color="primary">Buat Pekerjaan</v-btn>
      </v-col>
    </v-row>

    <v-tabs-items v-model="tab">
      <!-- tab published jobs -->
      <v-scroll-x-transition mode="in-out" hide-on-leave>
        <v-tab-item v-if="tab === 'published_jobs'" id="published_jobs">
          <PublishedJobs />
        </v-tab-item>
      </v-scroll-x-transition>
      <!-- end tab published jobs -->

      <!-- tab closed jobs -->
      <v-scroll-x-transition mode="in-out" hide-on-leave>
        <v-tab-item v-if="tab === 'closed_jobs'" id="closed_jobs">
          <span>closed</span>
        </v-tab-item>
      </v-scroll-x-transition>
      <!-- end tab closed jobs -->

      <!-- tab draft jobs -->
      <v-scroll-x-transition mode="in-out" hide-on-leave>
        <v-tab-item v-if="tab === 'draft_jobs'" id="draft_jobs">
          <span>draft</span>
        </v-tab-item>
      </v-scroll-x-transition>
      <!-- end tab draft jobs -->

      <!-- tab archived jobs -->
      <v-scroll-x-transition mode="in-out" hide-on-leave>
        <v-tab-item v-if="tab === 'archived_jobs'" id="archived_jobs">
          <span>archived</span>
        </v-tab-item>
      </v-scroll-x-transition>
      <!-- end tab archived jobs -->
    </v-tabs-items>
  </v-container>
</template>

<script>
import PublishedJobs from '@/components/employer/PublishedJobs'

export default {
  components: {
    PublishedJobs,
  },
  data() {
    return {
      tab: '',
    }
  },
}
</script>

<style scoped>
.theme--light.v-tabs-items {
  background-color: #f5f5f5 !important;
}
</style>
