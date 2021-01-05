<template>
  <section class="my-10">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-sheet
          color="white"
          elevation="1"
          height="100%"
          width="100%"
          class="rounded-lg pa-3 pa-md-10"
        >
          <nuxt-link
            :to="{
              name: 'index',
              params: { signInModals: true, tab: 'sign-in' },
            }"
            class="text-decoration-none"
          >
            <v-icon left color="primary"> mdi-arrow-left </v-icon>
            Kembali ke Masuk
          </nuxt-link>
          <div class="text-center mt-13">
            <v-img
              lazy-src="/error.png"
              src="/error.png"
              max-height="160"
              contain
            ></v-img>
            <h2 class="text-h3 font-weight-bold my-10">
              Tautan Telah Kadaluwarsa
            </h2>
            <p>
              Tautan yang Anda ikuti telah kedaluwarsa. Harap setel ulang kata
              sandi Anda lagi.
            </p>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {}
</script>

<style></style>
