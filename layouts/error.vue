<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="10" md="8">
      <v-sheet color="white" elevation="1" rounded class="pa-6 pa-md-10">
        <nuxt-link to="/" class="text-decoration-none">
          <v-icon left color="primary"> mdi-arrow-left </v-icon>
          Kembali ke Halaman Utama
        </nuxt-link>
        <div class="text-center">
          <v-img
            src="/error.png"
            lazy-src="/error.png"
            width="100"
            height="100"
            class="mx-auto my-10"
          >
          </v-img>
          <h1 v-if="error.statusCode === 404">
            {{ pageNotFound }}
          </h1>
          <h1 v-else>
            {{ otherError }}
          </h1>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'Laman Tidak Ditemukan',
      otherError: 'Terjadi Kesalahan Pada Jaringan Anda',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
main {
  background: #e5e5e5 !important;
}
</style>
