<template>
  <v-card class="pa-sm-10">
    <v-row v-if="!$vuetify.breakpoint.smAndUp" no-gutters>
      <v-col class="px-4 py-2 text-right">
        <v-btn icon @click="$emit('closeDialog')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row no-gutters align="center" class="pa-4 pt-0 pa-sm-0">
      <v-col cols="12" sm="6" class="text-left mb-3 mb-sm-0">
        <a
          href="#"
          class="text-decoration-none"
          @click.stop="$emit('backToSignIn')"
        >
          <v-icon left color="primary"> mdi-arrow-left </v-icon>
          Kembali ke Masuk
        </a>
      </v-col>
      <v-col cols="12" sm="6" class="text-sm-right">
        <p class="ma-0">
          Baru di ChatAja Jobs ?
          <a href="#" @click.stop="$emit('backToSignUp')">Register</a>
        </p>
      </v-col>
      <v-col cols="12">
        <h2 class="text-h3 font-weight-bold mt-8 mb-5">Reset Password</h2>
        <p class="mb-8 body-1">
          Masukkan alamat email yang Anda gunakan saat bergabung dan kami akan
          mengirimkan instruksi untuk mengatur ulang kata sandi Anda.
        </p>
        <v-form>
          <v-row no-gutters>
            <v-col cols="12">
              <label for="email_verification" class="font-weight-bold"
                >Email</label
              >
              <v-text-field
                id="email_verification"
                single-line
                outlined
                class="mt-2"
                type="email"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn block x-large color="primary" class="mt-4 mb-6" type="input"
            >Kirim Instruksi</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {}
</script>

<style></style>
