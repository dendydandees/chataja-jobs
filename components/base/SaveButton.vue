<template>
  <v-tooltip top color="primary" close-delay="250">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :color="saved ? 'primary' : ''"
        icon
        v-bind="attrs"
        v-on="on"
        @click="savedToLocalStorage(job)"
      >
        <v-icon>
          {{ saved ? 'mdi-bookmark' : 'mdi-bookmark-outline' }}
        </v-icon>
      </v-btn>
    </template>
    <span>Simpan Pekerjaan</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    job: {
      type: Object,
      required: true,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    saved() {
      return (
        Array.isArray(this.localStorageJobs) &&
        this.localStorageJobs.some((item) => item.id === this.job.id)
      )
    },
    localStorageJobs() {
      if (localStorage.length > 0) {
        const data = localStorage.getItem('savedJobs')
        return JSON.parse(data)
      } else {
        return []
      }
    },
  },
  methods: {
    savedToLocalStorage(job) {
      if ('savedJobs' in localStorage) {
        if (!this.localStorageJobs.includes(job)) {
          this.localStorageJobs.push(job)
          return localStorage.setItem(
            'savedJobs',
            JSON.stringify(this.localStorageJobs)
          )
        } else {
          return undefined
        }
      } else {
        this.localStorageJobs.push(job)
        return localStorage.setItem(
          'savedJobs',
          JSON.stringify(this.localStorageJobs)
        )
      }
    },
  },
}
</script>

<style></style>
