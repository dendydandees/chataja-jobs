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
              lazy-src="/email-verif-icon.png"
              src="/email-verif-icon.png"
              max-height="160"
              contain
            ></v-img>
            <h2 class="text-h3 font-weight-bold my-10">
              Cek Kotak Masuk Email Anda
            </h2>
            <p class="body-1 mb-5">
              Kami telah mengirimkan instruksi pemulihan kata sandi ke email
              Anda
            </p>
            <p class="title font-weight-bold orange--text text--darken-2 mb-0">
              {{ formattedTimeLeft }}
            </p>
            <v-btn
              x-large
              color="primary"
              class="mt-10 mb-5"
              :disabled="activeButton"
            >
              Kirim Kembali
            </v-btn>
            <p class="mb-0">
              Belum menerima email? Periksa folder spam Anda atau
              <nuxt-link
                :to="{
                  name: 'index',
                  params: { signInModals: true, tab: 'sign-up' },
                }"
                >coba alamat email lain</nuxt-link
              >
            </p>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </section>
</template>

<script>
const TIME_LIMIT = 60

export default {
  data() {
    return {
      timePassed: 0,
      timerInterval: null,
      activeButton: true,
    }
  },
  computed: {
    formattedTimeLeft() {
      const timeLeft = this.timeLeft
      const minutes = Math.floor(timeLeft / 60)
      let seconds = timeLeft % 60

      if (seconds < 10) {
        seconds = `0${seconds}`
      }

      return `${minutes}:${seconds}`
    },
    timeLeft() {
      return TIME_LIMIT - this.timePassed
    },
  },
  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp()
      }
    },
  },
  mounted() {
    this.startTimer()
  },
  methods: {
    onTimesUp() {
      clearInterval(this.timerInterval)
      this.activeButton = false
    },

    startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000)
    },
  },
}
</script>

<style></style>
