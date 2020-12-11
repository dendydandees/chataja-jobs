<template>
  <section>
    <!-- headline -->
    <v-row class="headline-background">
      <v-col>
        <v-container>
          <h2 class="font-weight-bold headline">Profil</h2>
        </v-container>
      </v-col>
    </v-row>
    <!-- end headline -->

    <v-row justify="center" class="my-6" no-gutters>
      <v-col cols="12" sm="10" md="8">
        <v-tabs v-model="tab" background-color="#e5e5e5">
          <v-tab href="#personal_info"> Informasi Pribadi </v-tab>
          <v-tab href="#my_cv"> CV Saya </v-tab>
          <v-tab href="#saved_jobs"> Pekerjaan Disimpan </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <!-- tab personal info -->
          <v-scroll-x-transition>
            <v-tab-item id="personal_info">
              <v-card elevation="1" rounded="lg" class="pa-4 my-6">
                <v-card-text>Informasi Pribadi</v-card-text>
              </v-card>
            </v-tab-item>
          </v-scroll-x-transition>
          <!-- end tab personal info -->

          <!-- tab my cv -->
          <v-scroll-x-transition>
            <v-tab-item id="my_cv">
              <v-card elevation="1" rounded="lg" class="pa-4 my-6">
                <v-card-text>CV Saya</v-card-text>
              </v-card>
            </v-tab-item>
          </v-scroll-x-transition>
          <!-- end tab my cv -->

          <!-- tab saved jobs -->
          <v-scroll-x-transition>
            <v-tab-item id="saved_jobs">
              <v-card elevation="1" rounded="lg" class="pa-4 my-6">
                <v-card-text>Pekerjaan Disimpan</v-card-text>
              </v-card>
            </v-tab-item>
          </v-scroll-x-transition>
          <!-- end tab saved jobs -->
        </v-tabs-items>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      savedJobs: [],
    }
  },
  created() {
    const data = localStorage.getItem('savedJobs')
    this.savedJobs = JSON.parse(data)
  },
}
</script>

<style scoped>
.theme--light.v-tabs-items {
  background-color: #e5e5e5 !important;
}
</style>
