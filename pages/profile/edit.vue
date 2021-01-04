<template>
  <section>
    <!-- headline -->
    <v-row class="headline-background" no-gutters>
      <v-col class="py-3">
        <v-container>
          <h2 class="font-weight-bold headline">Profil</h2>
        </v-container>
      </v-col>
    </v-row>
    <!-- end headline -->

    <v-container>
      <v-row justify="center" class="my-6" no-gutters>
        <v-col cols="12" sm="10">
          <v-tabs
            v-model="tab"
            background-color="#f5f5f5"
            show-arrows
            :slider-size="4"
            class="px-1"
          >
            <v-tab href="#personal_info"> Informasi Pribadi </v-tab>
            <v-tab href="#my_cv"> CV Saya </v-tab>
            <v-tab href="#saved_jobs"> Pekerjaan Disimpan </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <!-- tab personal info -->
            <v-scroll-x-transition mode="in-out" hide-on-leave>
              <v-tab-item v-if="tab === 'personal_info'" id="personal_info">
                <EditProfileForm />
              </v-tab-item>
            </v-scroll-x-transition>
            <!-- end tab personal info -->

            <!-- tab my cv -->
            <v-scroll-x-transition mode="in-out" hide-on-leave>
              <v-tab-item v-if="tab === 'my_cv'" id="my_cv">
                <EditCV />
              </v-tab-item>
            </v-scroll-x-transition>
            <!-- end tab my cv -->

            <!-- tab saved jobs -->
            <v-scroll-x-transition mode="in-out" hide-on-leave>
              <v-tab-item v-if="tab === 'saved_jobs'" id="saved_jobs">
                <SavedJobs />
              </v-tab-item>
            </v-scroll-x-transition>
            <!-- end tab saved jobs -->
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import SavedJobs from '@/components/base/SavedJobs'
import EditCV from '@/components/base/EditCV'
import EditProfileForm from '@/components/base/EditProfileForm'

export default {
  middleware: 'auth',
  components: {
    SavedJobs,
    EditCV,
    EditProfileForm,
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
