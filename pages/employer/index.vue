<template>
  <section class="white">
    <!-- section 1 -->
    <section class="bg-gradient py-8 py-md-15">
      <v-container>
        <v-row justify="center" align="center">
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
              alt="ChatAja Jobs connection image"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!-- end section 1 -->

    <!-- section 2 -->
    <section class="py-8 py-md-15">
      <v-container class="text-sm-center">
        <v-img
          class="mx-sm-auto"
          src="/line-lp-employer.svg"
          lazy-src="/line-lp-employer.svg"
          width="100px"
        ></v-img>
        <h2 class="display-2 my-5">Apa itu ChatAja Jobs?</h2>
        <p class="title text--secondary">
          ChatAja Jobs adalah layanan dari ChatAja bagi perusahaan untuk membuka
          lowongan pekerjaan dan mendapatkan kandidat pekerja
        </p>
        <v-row class="mt-10 text-center">
          <v-col
            v-for="(illustration, index) in illustrations"
            :key="index"
            cols="12"
            sm="6"
            md="3"
            class="mb-4"
          >
            <v-sheet
              elevation="6"
              color="white"
              class="pa-6 d-flex align-center justify-center"
              max-height="260px"
              rounded="lg"
            >
              <v-img
                contain
                :src="illustration.source"
                :lazy-src="illustration.source"
                aspect-ratio="1.7"
                :alt="illustration.subtitle"
              ></v-img>
            </v-sheet>
            <p class="headline font-weight-bold mt-5">
              {{ illustration.headline }}
            </p>
            <span class="subtitle-1 text--secondary">
              {{ illustration.subtitle }}
            </span>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!-- end section 2 -->

    <!-- section 3 -->
    <section class="bg-gradient-features py-8 py-md-15">
      <v-container class="text-sm-center">
        <v-img
          class="mx-sm-auto"
          src="/line-lp-employer.svg"
          lazy-src="/line-lp-employer.svg"
          width="100px"
        ></v-img>
        <h2 class="display-2 my-5">Fitur</h2>
        <v-row
          v-for="(feature, index) in features"
          :key="index"
          class="my-15"
          align="center"
        >
          <v-col cols="12" sm="6" :order-sm="index === 1 ? 'last' : 'first'">
            <v-img
              :src="feature.source"
              :lazy-src="feature.source"
              :alt="feature.headline"
            ></v-img>
          </v-col>
          <v-col cols="12" sm="6">
            <h4 class="display-1 font-weight-bold mb-5">
              {{ feature.headline }}
            </h4>
            <span class="title text--secondary">{{ feature.subtitle }}</span>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!-- end section 3 -->

    <!-- section 4 -->
    <section class="bg-gradient-carousel py-8 py-md-15">
      <v-container class="text-sm-center">
        <v-img
          class="mx-sm-auto"
          src="/line-lp-employer.svg"
          lazy-src="/line-lp-employer.svg"
          width="100px"
        ></v-img>
        <h2 class="display-2 my-5">Cara Mencari Kandidat di ChatAja Jobs</h2>
        <h4 class="headline font-weight-bold text-center mb-6 mt-15">
          Langkah {{ model + 1 }}
        </h4>
        <v-carousel
          v-model="model"
          cycle
          delimiter-icon="mdi-minus"
          show-arrows-on-hover
          :hide-delimiter-background="$vuetify.breakpoint.smAndDown"
          class="elevation-1 rounded-lg"
          height="330px"
        >
          <v-carousel-item v-for="(content, index) in contents" :key="index">
            <v-sheet color="white" height="100%" tile class="black--text">
              <v-row
                align="center"
                justify="center"
                class="fill-height text-center pa-6"
                no-gutters
              >
                <v-col cols="12" sm="6">
                  <h6 class="headline font-weight-bold mb-5">
                    {{ content.title }}
                  </h6>
                  <p>{{ content.title }}</p>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-img
                    :src="content.source"
                    :lazy-src="content.source"
                    :alt="content.title"
                    contain
                    aspect-ratio="1.7"
                  ></v-img>
                </v-col>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-container>
    </section>
    <!-- end section 4 -->
  </section>
</template>

<script>
export default {
  data: () => ({
    illustrations: [
      {
        headline: 'Pengguna',
        subtitle: 'Diakses oleh lebih dari 500.000 pengguna ChatAja!',
        source: '/illustration-pengguna.png',
      },
      {
        headline: 'Dashboard',
        subtitle: 'Dashboard berisi data statistik lowongan pekerjaan',
        source: '/illustration-dashboard.png',
      },
      {
        headline: 'Pelamar',
        subtitle: 'Terima informasi lengkap dari pelamar',
        source: '/illustration-pelamar.png',
      },
      {
        headline: 'Channel',
        subtitle: 'Tampilkan lowongan di berbagai channel ChatAja!',
        source: '/illustration-channel.png',
      },
    ],
    features: [
      {
        headline: 'Buat dan Edit Lowongan Pekerjaan',
        subtitle:
          'Tampilkan dan sesuaikan setiap kebutuhan lowongan pekerjaan dari perusahaan dengan mudah. Berikan informasi rinci pada profil perusahaan dan lowongan pekerjaan agar mudah ditemukan dan dipahami oleh kandidat',
        source: '/illustration-feature1.png',
      },
      {
        headline: 'Tinjau Pelamar',
        subtitle:
          'Dapatkan informasi rinci tentang notifikasi lamaran untuk tiap lowongan pekerjaan dan data rinci kandidat yang melamar mulai dari profil, pengalaman pekerjaan, kemampuan, jenjang pendidikan, dan cv pelamar',
        source: '/illustration-feature2.png',
      },
    ],
    model: 0,
    contents: [
      { title: 'Daftar Akun Employer', source: '/illustration-howto1.png' },
      { title: 'Buat Lowongan Pekerjaan', source: '/illustration-howto2.png' },
      {
        title: 'Terima Notifikasi Pelamar',
        source: '/illustration-howto3.png',
      },
      {
        title: 'Tinjau Kualifikasi Pelamar',
        source: '/illustration-howto4.png',
      },
      {
        title: 'Kirim Berita Terima/Tolak Pelamar',
        source: '/illustration-howto5.png',
      },
    ],
  }),
}
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(180deg, #f2f6fd 50%, rgba(242, 246, 253, 0) 100%);
}
.bg-gradient-features {
  background: linear-gradient(180deg, rgba(242, 246, 253, 0) 0%, #f2f6fd 100%);
}
.bg-gradient-carousel {
  background: linear-gradient(180deg, #f2f6fd 0%, rgba(242, 246, 253, 0) 100%);
}
</style>
