<template>
  <v-tooltip top color="primary" close-delay="250">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :color="
          Array.isArray(localStorageJobs) &&
          localStorageJobs.some((item) => item.id === job.id)
            ? 'primary'
            : ''
        "
        icon
        v-bind="attrs"
        v-on="on"
        @click="savedToLocalStorage(job)"
      >
        <v-icon>
          {{
            Array.isArray(localStorageJobs) &&
            localStorageJobs.some((item) => item.id === job.id)
              ? 'mdi-bookmark'
              : 'mdi-bookmark-outline'
          }}
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
    localStorageJobs() {
      if ('savedJobs' in localStorage) {
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
        if (!this.localStorageJobs.some((item) => item.id === job.id)) {
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
