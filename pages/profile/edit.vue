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

    <v-row justify="center" class="my-6" no-gutters>
      <v-col cols="12" sm="10" md="8">
        <v-tabs v-model="tab" background-color="#e5e5e5" show-arrows>
          <v-tab href="#personal_info"> Informasi Pribadi </v-tab>
          <v-tab href="#my_cv"> CV Saya </v-tab>
          <v-tab href="#saved_jobs"> Pekerjaan Disimpan </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <!-- tab personal info -->
          <v-scroll-x-transition mode="in-out" hide-on-leave>
            <v-tab-item v-if="tab === 'personal_info'" id="personal_info">
              <v-sheet color="white" elevation="1" rounded class="pa-4 my-6">
                <span>tes</span>
              </v-sheet>
            </v-tab-item>
          </v-scroll-x-transition>
          <!-- end tab personal info -->

          <!-- tab my cv -->
          <v-scroll-x-transition mode="in-out" hide-on-leave>
            <v-tab-item v-if="tab === 'my_cv'" id="my_cv">
              <v-sheet color="white" elevation="1" rounded class="pa-4 my-6">
                <v-row no-gutters>
                  <v-col cols="6" sm="auto" class="mr-sm-4">
                    <div class="rounded pa-4 grey lighten-4 d-inline-block">
                      <v-img
                        src="/pdf-icon.png"
                        lazy-src="/pdf-icon.png"
                        width="60"
                        height="60"
                        contain
                      ></v-img>
                    </div>
                  </v-col>
                  <v-col order="last" class="mt-4 mt-sm-0">
                    <h4 class="headline font-weight-bold">CV.PDF</h4>
                    <p class="text--secondary font-weight-bold">17 MB</p>
                    <a
                      href="/cv-example.jpg"
                      download
                      class="font-weight-bold mr-4"
                    >
                      Unduh
                    </a>
                    <a
                      href="/cv-example.jpg"
                      target="blank"
                      class="font-weight-bold"
                      >Lihat</a
                    >
                  </v-col>
                  <v-col
                    cols="6"
                    sm="auto"
                    order-sm="last"
                    class="text-right text-sm-left"
                  >
                    <v-tooltip top color="error" close-delay="250">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </template>
                      <span>Hapus</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-sheet>
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
  </section>
</template>

<script>
import SavedJobs from '@/components/base/SavedJobs'
export default {
  components: {
    SavedJobs,
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
  background-color: #e5e5e5 !important;
}
</style>
