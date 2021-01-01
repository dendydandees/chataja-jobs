<template>
  <v-card flat>
    <h2 class="text-h3 font-weight-bold my-8">Daftar</h2>
    <v-form ref="form" @submit.prevent="signUpHandler">
      <v-row no-gutters>
        <v-col cols="12">
          <label for="fullname" class="font-weight-bold">Nama Lengkap</label>
          <v-text-field
            id="fullname"
            v-model="createAccount.fullname"
            :rules="fullnameRules"
            single-line
            outlined
            class="mt-2"
            type="text"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <label for="telp_number" class="font-weight-bold"
            >Nomor ChatAja</label
          >
          <v-text-field
            id="telp_number"
            v-model="createAccount.telpNumber"
            :rules="telpNumberRules"
            single-line
            outlined
            class="mt-2"
            type="tel"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <label for="email" class="font-weight-bold">Email</label>
          <v-text-field
            id="email"
            v-model="createAccount.email"
            :rules="emailRules"
            single-line
            outlined
            class="mt-2"
            type="email"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <label for="password" class="font-weight-bold">Password</label>
          <v-text-field
            id="password"
            v-model="createAccount.password"
            :rules="passwordRules"
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
            v-model="createAccount.confPass"
            :rules="confPassRules"
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
      <v-btn
        block
        x-large
        color="primary"
        :class="[isProcessing ? 'is-loading' : '', 'mt-4 mb-6']"
        type="submit"
        :loading="isProcessing"
        :disabled="isProcessing"
        >Daftar</v-btn
      >
      <p class="text-center body-1">
        Dengan mendaftar, saya setuju dengan
        <a href="https://chataja.co.id/syarat" target="_blank"
          >Syarat & Ketentuan</a
        >
        dan
        <a href="https://chataja.co.id/kebijakan-privasi" target="_blank"
          >Kebijakan Privasi</a
        >
        ChatAja.
      </p>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      // loading
      isProcessing: false,
      // state for sign up
      createAccount: {
        fullname: '',
        telpNumber: '',
        email: '',
        password: '',
        confPass: '',
      },
      // toggle password
      togglePassword: false,
      toggleConfPass: false,
      // signup rules
      fullnameRules: [
        (v) => !!v || 'Mohon masukan Nama Lengkap Anda',
        (value) =>
          (value || '').length >= 4 ||
          'Nama Lengkap terdiri dari minimum 4 karakter',
        (value) =>
          (value || '').length <= 50 ||
          'Nama Lengkap terdiri dari maksimum 50 karakter',
        (value) => {
          const regex = /^[^\s]+(\s+[^\s]+)*$/
          return (
            regex.test(value) ||
            'Nama Lengkap tidak boleh diawali/diakhiri dengan spasi'
          )
        },
      ],
      emailRules: [
        (v) => !!v || 'Mohon masukkan email Anda',
        (v) => /.+@.+\..+/.test(v) || 'Mohon masukkan email Anda dengan benar',
      ],
      telpNumberRules: [
        (v) =>
          /^\d+$/.test(v) || 'Mohon masukkan Nomor Telepon Anda dengan benar',
        (value) =>
          (value || '').length <= 15 ||
          'Nomor Telepon terdiri dari maksimum 15 digit',
        (value) =>
          (value || '').length >= 6 ||
          'Nomor Telepon terdiri dari minimum 6 digit',
      ],
      passwordRules: [
        (v) => !!v || 'Mohon masukkan Password Anda',
        (v) =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,200}$/.test(v) ||
          'Masukkan Password dengan minimal 8 huruf menggunakan kombinasi huruf kapital dan angka',
      ],
      confPassRules: [
        (v) => !!v || 'Mohon masukkan ulang Password anda',
        (v) => {
          return (
            this.createAccount.confPass === this.createAccount.password ||
            'Mohon masukkan ulang Password yang diatas dengan benar'
          )
        },
      ],
    }
  },
  methods: {
    async signUpHandler() {
      try {
        this.isProcessing = true
        await this.$router.push('/email-verification')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      } finally {
        this.isProcessing = false
      }
    },
  },
}
</script>

<style></style>
