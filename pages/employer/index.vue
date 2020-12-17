<template>
  <section class="white">
    <section class="bg-gradient">
      <v-container>
        <v-row justify="center" align="center" class="py-8 py-md-15">
          <v-col cols="12" sm="6">
            <h2 class="display-1 font-weight-bold mb-6">
              Cari Kandidat dengan Akurat dan Nyaman, Kini dengan ChatAja Jobs!
            </h2>
            <p class="title text--secondary">
              Segera terhubung dengan kandidat sesuai dengan kebutuhan
              perusahaan. Buat akun perusahaan di ChatAja Jobs bagi Anda yang
              ingin membuka lowongan pekerjaan. Serta dapatkan informasi berkala
              dari status lowongan pekerjaanmu
            </p>
            <v-btn color="primary" elevation="8" rounded x-large class="mt-10"
              >Daftar Sekarang</v-btn
            >
          </v-col>
          <v-col v-if="$vuetify.breakpoint.smAndUp" cols="12" sm="6">
            <v-img
              contain
              src="/employer-lp-1.png"
              lazy-src="/employer-lp-1.png"
              max-width="85%"
              class="ml-auto"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(180deg, #f2f6fd 50%, rgba(242, 246, 253, 0) 100%);
}
</style>
