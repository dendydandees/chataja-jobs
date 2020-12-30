<template>
  <section>
    <v-row align="center">
      <v-col cols="12" sm="6">
        <h1 class="display-1">Published Jobs</h1>
      </v-col>
      <v-col cols="12" sm="6">
        <v-row no-gutters class="mb-2">
          <v-col cols="12" sm="6">
            <!-- sort field -->
            <v-text-field
              label="Urutkan"
              solo
              hide-details
              :dense="$vuetify.breakpoint.smAndUp"
              class="pr-sm-2 mb-2 mb-sm-0"
            ></v-text-field>
            <!-- end sort field -->
          </v-col>
          <v-col cols="12" sm="6">
            <!-- search field -->
            <v-text-field
              label="Pencarian"
              solo
              hide-details
              :dense="$vuetify.breakpoint.smAndUp"
            ></v-text-field>
            <!-- end search field -->
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row no-gutters align="center">
      <v-col
        v-for="(publish, index) in publishedJobs"
        :key="index"
        cols="12"
        class="my-5"
      >
        <!-- title content -->
        <v-sheet color="white" rounded elevation="1" class="pa-4 mb-1">
          <v-row no-gutters>
            <v-col>
              <h5 class="title">
                <span class="font-weight-bold">
                  {{ publish.jobName }}
                </span>
                <span>&bull;</span>
                <span class="text--secondary"
                  >{{ publish.location.city }},
                  {{ publish.location.country }}</span
                >
              </h5>
            </v-col>

            <!-- edit, delete, archive menu -->
            <v-col cols="auto">
              <v-menu
                offset-y
                transition="slide-y-transition"
                rounded="lg"
                left
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    v-for="(item, i) in itemsMenu"
                    :key="i"
                    :to="item.link"
                    active-class="primary white--text"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
            <!-- end edit, delete, archive menu -->
          </v-row>
        </v-sheet>
        <!-- end title content -->

        <!-- details content -->
        <v-sheet color="white" rounded elevation="1" class="pa-7 mb-1">
          <v-row class="text-center">
            <v-col>
              <p class="display-2 font-weight-bold">
                {{ publish.applicants.leads }}
              </p>
              <span class="text--secondary">Leads</span>
            </v-col>
            <v-col>
              <p class="display-2 font-weight-bold">
                {{ publish.applicants.applications }}
              </p>
              <span class="text--secondary">Applications</span>
            </v-col>
            <v-col>
              <p class="display-2 font-weight-bold">
                {{ publish.applicants.shortlist }}
              </p>
              <span class="text--secondary">Shortlist</span>
            </v-col>
            <v-col>
              <p class="display-2 font-weight-bold">
                {{ publish.applicants.interview }}
              </p>
              <span class="text--secondary">For Interview</span>
            </v-col>
            <v-col>
              <p class="display-2 font-weight-bold">
                {{ publish.applicants.offered }}
              </p>
              <span class="text--secondary">Offered</span>
            </v-col>
            <v-col>
              <p class="display-2 font-weight-bold">
                {{ publish.applicants.hired }}
              </p>
              <span class="text--secondary">Hired</span>
            </v-col>
            <v-col>
              <p class="display-2 font-weight-bold">
                {{ publish.applicants.archived }}
              </p>
              <span class="text--secondary">Archived</span>
            </v-col>
          </v-row>
        </v-sheet>
        <!-- end details content -->

        <!-- to details -->
        <v-sheet color="white" rounded elevation="1" class="pa-4 mb-1">
          <v-row no-gutters align="center">
            <v-col>
              <p class="mr-4 text--secondary mb-sm-0 d-sm-inline-block">
                <v-icon left> mdi-bookmark </v-icon>
                {{ publish.favorite }} Favorite
              </p>
              <p class="text--secondary mb-0 d-sm-inline-block">
                <v-icon left> mdi-eye </v-icon>
                {{ publish.views }} Views
              </p>
            </v-col>
            <v-col cols="auto">
              <nuxt-link to="/" class="font-weight-bold"
                >Lihat Detail</nuxt-link
              >
            </v-col>
          </v-row>
        </v-sheet>
        <!-- end to details -->
      </v-col>
    </v-row>

    <!-- pagination -->
    <v-row align="center" class="mb-10">
      <v-col cols="12" sm="6">
        <span class="mr-2 font-weight-bold">Lihat per halaman</span>
        <v-menu offset-y transition="slide-y-transition" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              :ripple="{ class: `error--text` }"
              v-on="on"
              >{{ limit }}</v-btn
            >
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in itemsLimit"
              :key="index"
              v-model="limit"
              :ripple="{ class: `error--text` }"
              @click="updateItemsPerPage(item)"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col class="text-center text-sm-right" cols="12" sm="6">
        <v-pagination
          v-model="page"
          class="d-inline-flex"
          :length="~~publishedJobs.length / limit"
          :total-visible="6"
        ></v-pagination>
      </v-col>
    </v-row>
    <!-- end pagination -->
  </section>
</template>

<script>
export default {
  data: () => ({
    itemsMenu: [
      { title: 'Edit', link: '/' },
      { title: 'Hapus', link: '/' },
      { title: 'Archive', link: '/' },
    ],
    publishedJobs: [
      {
        jobName: 'Marketing Manager',
        location: { city: 'Jakarta', country: 'Indonesia' },
        applicants: {
          leads: 1048,
          applications: 242,
          shortlist: 98,
          interview: 3,
          offered: 2,
          hired: 12,
          archived: 120,
        },
        favorite: 100,
        views: 878,
      },
      {
        jobName: 'Android Developer',
        location: { city: 'Bandung', country: 'Indonesia' },
        applicants: {
          leads: 2019,
          applications: 187,
          shortlist: 27,
          interview: 5,
          offered: 4,
          hired: 29,
          archived: 166,
        },
        favorite: 210,
        views: 1078,
      },
    ],
    page: 1,
    limit: 2,
    itemsLimit: [1, 2],
  }),
  methods: {
    updateItemsPerPage(number) {
      this.page = 1
      this.limit = number
    },
  },
}
</script>

<style></style>
