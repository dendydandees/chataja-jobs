<template>
  <section>
    <section v-if="savedJobs.length > 0">
      <v-sheet
        v-for="(job, index) in savedJobs"
        :key="index"
        color="white"
        elevation="1"
        rounded
        class="pa-4 my-6"
      >
        <v-row no-gutters>
          <v-col cols="12" sm="auto" class="mr-sm-4">
            <nuxt-link
              :to="`/jobs/company/${job.company.code}`"
              class="d-inline-block"
            >
              <v-img
                :src="job.company_info.logo"
                :lazy-src="job.company_info.logo"
                width="75"
                height="75"
                contain
                class="rounded img-border"
              ></v-img>
            </nuxt-link>
          </v-col>
          <v-col cols="12" sm="5" class="mr-sm-4 my-4 my-sm-0">
            <nuxt-link
              :to="`/jobs/company/${job.company.code}`"
              class="font-weight-regular text--primary subtitle-1 d-inline-block text-truncate"
              style="max-width: 100%"
            >
              {{ job.company_name }}
            </nuxt-link>
            <nuxt-link
              class="text--primary font-weight-bold headline"
              :to="`/jobs/${job.id}`"
            >
              <h4>
                {{ job.name }}
              </h4>
            </nuxt-link>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="4" class="text-sm-right">
            <span
              v-if="job.activation_date !== null"
              class="subtitle-1 d-block mb-2"
            >
              <v-icon class="mr-1" small>mdi-clock-time-three-outline</v-icon>
              {{ $moment(job.activation_date).format('D MMM YYYY') }}
            </span>
            <span v-else class="error--text d-block mb-2">
              Lowongan sudah tidak tersedia
            </span>
            <span>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="mr-1"
              >
                <path
                  d="M8 1.33333C11.676 1.33333 14.6667 4.324 14.6667 8C14.6667 11.676 11.676 14.6667 8 14.6667C4.324 14.6667 1.33333 11.676 1.33333 8C1.33333 4.324 4.324 1.33333 8 1.33333ZM8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0ZM10.6667 9.38867C10.6667 7.95867 9.17867 7.56067 8.038 7.02467C7.34533 6.66467 7.43267 5.80533 8.42533 5.74733C8.976 5.714 9.542 5.87733 10.054 6.05733L10.2953 4.95933C9.69067 4.77533 9.14933 4.69133 8.66667 4.67867V4H8V4.71133C6.70333 4.88933 6.01067 5.70267 6.01067 6.61133C6.01067 8.23667 7.90867 8.48467 8.52933 8.77333C9.376 9.152 9.21933 9.94 8.45333 10.114C7.78867 10.2647 6.94067 10.002 6.30333 9.754L6 10.85C6.596 11.158 7.31 11.322 8 11.3347V12H8.66667V11.298C9.77133 11.1433 10.668 10.534 10.6667 9.38867Z"
                  fill="#27AE60"
                />
              </svg>
              {{
                `${job.salary_currency !== null ? job.salary_currency : ''} ${
                  job.base_salary !== null ? job.base_salary : ''
                } - ${job.maximum_salary !== null ? job.base_salary : ''}`
              }}
            </span>
          </v-col>
        </v-row>
        <hr class="grey lighten-5 my-4" />
        <v-row no-gutters align="center">
          <v-col cols="12" sm="6">
            <span
              >{{
                `${job.google_location.address_components.city}, ${job.google_location.address_components.country}`
              }}
              &bull; {{ job.tenure }}</span
            >
          </v-col>
          <v-col cols="12" sm="6" class="text-sm-right mt-6 mt-sm-0">
            <v-btn
              outlined
              color="primary"
              class="mr-4"
              @click="removeSavedJobs(job)"
              >Hapus</v-btn
            >
            <v-btn
              color="primary"
              :href="`https://www.kalibrr.id/c/${job.company_info.code}/jobs/${job.id}/${job.slug}`"
              target="blank"
              >Lamar</v-btn
            >
          </v-col>
        </v-row>
      </v-sheet>
    </section>
    <section v-else>
      <v-sheet
        color="white"
        elevation="1"
        rounded
        class="pa-4 my-6 text-center"
      >
        <h5 class="font-weight-bold headline mb-8">
          Belum ada data yang disimpan
        </h5>
        <v-btn to="/" color="primary" large>Cari Pekerjaan</v-btn>
      </v-sheet>
    </section>
  </section>
</template>

<script>
export default {
  data: () => ({
    savedJobs: [],
  }),
  created() {
    const data = localStorage.getItem('savedJobs')
    this.savedJobs = JSON.parse(data)
  },
  methods: {
    removeSavedJobs(job) {
      this.savedJobs = this.savedJobs.filter((item) => {
        return item.id !== job.id
      })
      localStorage.setItem('savedJobs', JSON.stringify(this.savedJobs))
    },
  },
}
</script>

<style></style>
