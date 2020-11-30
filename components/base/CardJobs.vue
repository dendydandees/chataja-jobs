<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <h2>Pekerjaan Terbaru</h2>
      </v-col>
      <v-col class="text-right" cols="auto">
        <nuxt-link to="" class="text-decoration-none font-weight-bold"
          >Lihat lebih</nuxt-link
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="jobs in latestJobs"
        :key="jobs.id"
        cols="12"
        sm="6"
        md="3"
        class="pa-2"
      >
        <v-card elevation="1" rounded="lg" class="pa-4" height="100%">
          <v-row no-gutters class="mb-4">
            <v-col>
              <v-card-title
                class="pa-0 pr-4 font-weight-bold subtitle-1 line-clamp"
              >
                {{ jobs.name }}
              </v-card-title>
            </v-col>
            <v-col cols="auto">
              <v-btn icon>
                <v-icon>mdi-bookmark-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-img
            v-if="jobs.company_info.logo"
            :src="jobs.company_info.logo"
            :lazy-src="jobs.company_info.logo"
            width="75"
            height="75"
            contain
          >
          </v-img>
          <v-img
            v-else
            src="/placeholder-profile.svg"
            lazy-src="/placeholder-profile.svg"
            width="75"
            height="75"
          >
          </v-img>
          <v-card-text class="px-0">
            <p class="font-weight-regular text--primary">
              {{ jobs.company_name }}
            </p>
            <p class="mb-2 font-weight-bold">
              {{ jobs.google_location.address_components.city }},
              {{ jobs.google_location.address_components.region }}
            </p>
            <p class="mb-2 font-weight-bold">
              {{ jobs.tenure }}
            </p>
          </v-card-text>
          <hr class="grey lighten-5" />
          <v-card-actions class="px-0 pb-0 pt-4">
            <v-row no-gutters align="center">
              <v-col>
                <span>{{ $moment(jobs.activation_date).fromNow() }}</span>
              </v-col>
              <v-col class="text-right">
                <nuxt-link
                  :to="`/jobs/${jobs.id}`"
                  class="text-decoration-none font-weight-bold"
                  >Lihat Detail</nuxt-link
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    latestJobs: {
      type: Array,
      required: true,
      default: () => {
        return []
      },
    },
  },
}
</script>

<style scoped>
.line-clamp {
  display: -webkit-box;
  height: 3.6em;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
