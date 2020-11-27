<template>
  <section class="my-10">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-sheet
          color="white"
          elevation="1"
          height="100%"
          width="100%"
          class="rounded-lg pa-6 pa-md-10"
        >
          <v-btn text color="primary" class="px-0">
            <v-icon left> mdi-arrow-left </v-icon>
            Kembali ke Masuk
          </v-btn>
          <div class="text-center mt-13">
            <v-img
              lazy-src="/email-verif-icon.png"
              src="/email-verif-icon.png"
              max-height="160"
              contain
            ></v-img>
            <h2 class="text-h3 font-weight-bold my-10">Verifikasi Email</h2>
            <p class="body-1">
              Selamat datang di ChatAja Jobs, Silakan buka tautan verifikasi di
              kotak masuk email Anda untuk mengaktifkan akun Anda.
            </p>
            <v-btn x-large color="primary" class="mt-10">Kirim Kembali</v-btn>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {}
</script>
