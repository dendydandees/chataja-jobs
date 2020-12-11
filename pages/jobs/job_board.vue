<template>
  <section>
    <!-- search form -->
    <v-row no-gutters>
      <v-col cols="12" class="white">
        <SearchForm elevation="elevation-0" />
      </v-col>
    </v-row>
    <!-- end search form -->

    <LoadingBar v-if="$fetchState.pending" />
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <section v-else>
      <!-- count -->
      <v-container class="py-0 mt-10">
        <span>
          <strong>{{ count }}</strong>
          <span>Hasil pencarian</span>
          <span v-if="search.text !== '' || search.location !== ''">
            untuk
            <strong class="text-capitalize">{{
              search.text !== '' ? search.text : search.location
            }}</strong>
          </span>
        </span>
      </v-container>
      <!-- end count -->

      <!-- card jobs -->
      <CardJobs :latest-jobs="jobs" />
      <!-- end card jobs -->

      <!-- pagination -->
      <v-container v-if="showPagination()">
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
                  v-for="(item, index) in items"
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
              :length="totalPage"
              :total-visible="6"
              @input="offsetPage()"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-container>
      <!-- end pagination -->
    </section>
  </section>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import CardJobs from '@/components/base/CardJobs'
import SearchForm from '@/components/base/SearchForm'

export default {
  components: {
    CardJobs,
    SearchForm,
  },
  async fetch() {
    await this.searchJobsAction(this.$store.state.jobs.search)
  },
  data: () => ({
    page: 1,
    offsetData: 0,
    items: [12, 16, 24],
  }),
  computed: {
    limit: {
      get() {
        return this.$store.state.jobs.search.limit
      },
      set(value) {
        this.setLimit(value)
      },
    },
    offset: {
      get() {
        return this.$store.state.jobs.search.offset
      },
      set(value) {
        this.setOffset(value)
      },
    },
    ...mapGetters({
      count: 'jobs/listJobsCount',
      jobs: 'jobs/listSearchJobs',
      search: 'jobs/searchData',
      totalPage: 'jobs/totalPage',
    }),
  },
  methods: {
    ...mapMutations({
      setLimit: 'jobs/SET_SEARCH_LIMIT',
      setOffset: 'jobs/SET_SEARCH_OFFSET',
    }),
    ...mapActions({
      searchJobsAction: 'jobs/searchJobsAction',
    }),
    async updateItemsPerPage(number) {
      this.page = 1
      this.setOffset(0)
      this.setLimit(number)
      await this.searchJobsAction(this.$store.state.jobs.search)
    },
    showPagination() {
      if (this.count < 12 || this.count === 0 || !this.jobs) {
        return false
      } else {
        return true
      }
    },
    async offsetPage() {
      if (this.page === 1) {
        this.offsetData = 0
      } else {
        this.offsetData = this.page * this.limit - this.limit
      }
      this.setOffset(this.offsetData)
      await this.searchJobsAction(this.$store.state.jobs.search)
    },
  },
}
</script>

<style></style>
