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
          <div class="mt-13">
            <h2 class="text-h3 font-weight-bold mb-5">Buat Password Baru</h2>
            <p class="mb-10">
              Password minimal harus terdiri dari 8 karakter, huruf besar, huruf
              kecil, dan angka agar akun Anda tidak mudah di hack.
            </p>
            <v-form ref="form">
              <v-row no-gutters>
                <v-col cols="12">
                  <label for="password" class="font-weight-bold"
                    >Password Baru</label
                  >
                  <v-text-field
                    id="password"
                    single-line
                    outlined
                    class="mt-2"
                    :type="togglePassword ? 'text' : 'password'"
                    :append-icon="togglePassword ? 'mdi-eye-off' : 'mdi-eye'"
                    required
                    @click:append="togglePassword = !togglePassword"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                  <label for="conf_pass" class="font-weight-bold"
                    >Konfirmasi Password</label
                  >
                  <v-text-field
                    id="conf_pass"
                    single-line
                    outlined
                    class="mt-2"
                    :type="toggleConfPass ? 'text' : 'password'"
                    :append-icon="toggleConfPass ? 'mdi-eye-off' : 'mdi-eye'"
                    required
                    @click:append="toggleConfPass = !toggleConfPass"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="text-center">
                  <v-btn
                    x-large
                    color="primary"
                    class="my-4 mb-6"
                    type="submit"
                    :loading="isProcessing"
                    :disabled="isProcessing"
                  >
                    Reset Password
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // loading
      isProcessing: false,
      // toggle password
      togglePassword: false,
      toggleConfPass: false,
    }
  },
}
</script>

<style></style>
