<template>
  <section>
    <!-- headline -->
    <v-row class="headline-background">
      <v-col>
        <v-container>
          <h2 class="font-weight-bold headline">Pengaturan</h2>
        </v-container>
      </v-col>
    </v-row>
    <!-- end headline -->

    <v-row no-gutters class="my-6" justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-sheet color="white" elevation="1" rounded class="pa-6 pa-md-10">
          <v-row no-gutters align="center">
            <v-col>
              <h2 class="title font-weight-bold">Akun</h2>
            </v-col>
            <v-col v-if="!editField" class="text-right">
              <v-btn icon @click="changeEdit">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <hr class="grey lighten-5 my-4" />
          <!-- field chataja number -->
          <v-row no-gutters :class="[editField ? '' : 'my-4']">
            <v-col>
              <label for="caNumber" class="font-weight-bold"
                >Nomor Telepon ChatAja</label
              >
              <v-text-field
                id="caNumber"
                v-model="account.number"
                single-line
                :outlined="editField"
                :solo="!editField"
                :flat="!editField"
                type="number"
                class="mt-2"
                prefix="+"
                :hide-details="!editField"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <!-- end field chataja number -->

          <!-- field email -->
          <v-row no-gutters :class="[editField ? '' : 'my-4']">
            <v-col>
              <label for="email" class="font-weight-bold">Email</label>
              <v-text-field
                id="email"
                v-model="account.email"
                single-line
                :outlined="editField"
                :solo="!editField"
                :flat="!editField"
                type="email"
                class="mt-2"
                :hide-details="!editField"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <!-- end field email -->

          <!-- field password -->
          <v-row no-gutters :class="[editField ? '' : 'my-4']">
            <v-col>
              <label for="password" class="font-weight-bold">Password</label>
              <v-text-field
                id="password"
                v-model="account.password"
                single-line
                :outlined="editField"
                :solo="!editField"
                :flat="!editField"
                :type="fieldPasswordType"
                class="mt-2"
                :append-icon="iconPassword"
                :hide-details="!editField"
                @click:append="togglePassword = !togglePassword"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <!-- end field password -->

          <v-row v-if="editField" no-gutters my-6>
            <v-col class="text-center">
              <v-btn class="mr-4" @click="changeEdit">Batal</v-btn>
              <v-btn color="primary" class="ml-4">Simpan</v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  data: () => ({
    account: {
      number: '62881976251147',
      email: 'email@domain.com',
      password: 'iniPass123',
    },
    editField: false,
    togglePassword: false,
  }),
  computed: {
    iconPassword() {
      return this.editField
        ? this.togglePassword
          ? 'mdi-eye-off'
          : 'mdi-eye'
        : ''
    },
    fieldPasswordType() {
      return this.editField
        ? this.togglePassword
          ? 'text'
          : 'password'
        : 'password'
    },
  },
  methods: {
    changeEdit() {
      this.editField = !this.editField
    },
  },
}
</script>

<style></style>
