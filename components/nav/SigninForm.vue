<template>
  <v-card flat>
    <h2 class="text-h3 font-weight-bold my-8">Masuk</h2>
    <v-form ref="form" @submit.prevent="signInHandler">
      <v-row no-gutters>
        <v-col cols="12">
          <label for="email" class="font-weight-bold">Email</label>
          <v-text-field
            id="email"
            v-model="signInData.email"
            :rules="emailRules"
            single-line
            outlined
            class="mt-2"
            type="email"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <label for="password" class="font-weight-bold">Password</label>
          <v-text-field
            id="password"
            v-model="signInData.password"
            :rules="passwordRules"
            single-line
            outlined
            class="mt-2"
            :type="togglePassword ? 'text' : 'password'"
            :append-icon="togglePassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="togglePassword = !togglePassword"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
        block
        x-large
        color="primary"
        class="my-4 mb-6"
        type="submit"
        :loading="isProcessing"
        :disabled="isProcessing"
        >Masuk</v-btn
      >
      <v-btn
        block
        x-large
        color="primary"
        text
        @click.stop="$emit('forgotPasswordClick')"
        >Lupa Password</v-btn
      >
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // loading
      isProcessing: false,
      // toggle password
      togglePassword: false,
      // state for sign in
      signInData: {
        email: '',
        password: '',
      },
      emailRules: [
        (v) => !!v || 'Mohon masukkan email Anda',
        (v) => /.+@.+\..+/.test(v) || 'Mohon masukkan email Anda dengan benar',
      ],
      passwordRules: [
        (v) => !!v || 'Mohon masukkan Password Anda',
        // (v) =>
        //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,200}$/.test(v) ||
        //   'Masukkan Password dengan minimal 8 huruf menggunakan kombinasi huruf kapital dan angka',
      ],
    }
  },
  methods: {
    ...mapActions({ getProfile: 'accountSeeker/getProfile' }),
    // reset state sign in data
    resetData() {
      this.signInData.email = ''
      this.signInData.password = ''
    },
    // set sign in form using nuxt auth local strategy
    async signInHandler() {
      try {
        this.isProcessing = true
        const validate = this.$refs.form.validate()

        if (validate) {
          const response = await this.$auth.loginWith('local', {
            data: this.signInData,
          })

          if (response) {
            const data = Object.assign(response.data, { role: 'job-seeker' })
            this.$auth.$storage.setUniversal('user', data)
            this.$auth.setUser(data)
            await this.getProfile(this.$auth.strategy.token.get())

            if (this.$store.state.accountSeeker.hasProfile === true) {
              await this.$router.push('/profile/create')
            }
            await this.$nuxt.refresh()
          }
        }
      } catch (error) {
        this.error.isError = true
        this.error.text = error.message
      } finally {
        this.resetData()
        this.isProcessing = false
      }
    },
  },
}
</script>

<style></style>
