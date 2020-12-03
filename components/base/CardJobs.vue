<template>
  <v-container class="mb-15">
    <v-row v-if="wording" align="center">
      <v-col>
        <h2>Pekerjaan Terbaru</h2>
      </v-col>
      <v-col class="text-right" cols="auto">
        <nuxt-link to="" class="text-decoration-none font-weight-bold"
          >Lihat lebih</nuxt-link
        >
      </v-col>
    </v-row>
    <v-row dense>
      <v-col v-for="job in latestJobs" :key="job.id" cols="12" sm="6" md="3">
        <v-card elevation="1" rounded="lg" class="pa-4" height="100%">
          <v-row no-gutters class="mb-4">
            <v-col cols="10">
              <h4 class="font-weight-bold title line-clamp">
                {{ job.name }}
              </h4>
            </v-col>
            <v-col cols="2" class="text-right">
              <v-btn icon>
                <v-icon>mdi-bookmark-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-img
            v-if="job.company_info.logo !== null"
            :src="job.company_info.logo"
            :lazy-src="job.company_info.logo"
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
          <v-card-text class="px-0" style="height: 180px">
            <p class="font-weight-regular text--primary subtitle-1">
              {{ job.company_name }}
            </p>
            <p class="mb-2 font-weight-bold">
              {{ job.google_location.address_components.city }},
              {{ job.google_location.address_components.region }}
            </p>
            <p class="mb-2 font-weight-bold">
              {{ job.tenure }}
            </p>
          </v-card-text>
          <hr class="grey lighten-5" />
          <v-card-actions class="px-0 pb-0 pt-4">
            <v-row no-gutters align="center">
              <v-col>
                <span v-if="job.activation_date !== null">{{
                  $moment(job.activation_date).fromNow()
                }}</span>
                <span v-else></span>
              </v-col>
              <v-col class="text-right">
                <nuxt-link
                  :to="`/jobs/${job.id}`"
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
    wording: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
}
</script>

<style></style>
