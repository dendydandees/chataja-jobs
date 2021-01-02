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
export default {
  data() {
    return {
      // loading
      isProcessing: false,
      // toggle password
      togglePassword: false,
      // state for sign in
      signInData: {
        email: 'dendy1@yopmail.com',
        password: 'satu234',
      },
      error: '',
    }
  },
  methods: {
    async signInHandler() {
      try {
        this.isProcessing = true
        const response = await this.$auth.loginWith('local', {
          data: this.signInData,
        })
        if (response) {
          this.$auth.$storage.setUniversal('user', response.data)
          this.$auth.setUser(response.data)
        }
        this.isProcessing = false
      } catch (error) {
        this.error = error
        this.isProcessing = false
      }
    },
  },
}
</script>

<style></style>
