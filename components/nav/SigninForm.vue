<template>
  <v-card flat>
    <h2 class="text-h3 font-weight-bold my-8">Masuk</h2>
    <v-form>
      <v-row no-gutters>
        <v-col cols="12">
          <label for="email" class="font-weight-bold">Email</label>
          <v-text-field
            id="email"
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
            single-line
            outlined
            class="mt-2"
            :type="togglePassword ? 'text' : 'password'"
            :append-icon="togglePassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="togglePassword = !togglePassword"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn block x-large color="primary" class="my-4" type="submit"
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
  data: () => ({
    // toggle password
    togglePassword: false,
  }),
}
</script>

<style></style>
