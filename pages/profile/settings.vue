<template>
  <section>
    <!-- headline -->
    <v-row no-gutters class="headline-background">
      <v-col class="py-3">
        <v-container>
          <h2 class="font-weight-bold headline">Pengaturan</h2>
        </v-container>
      </v-col>
    </v-row>
    <!-- end headline -->

    <v-container>
      <v-row no-gutters class="my-6" justify="center">
        <v-col cols="12" sm="10">
          <v-sheet color="white" elevation="1" rounded class="pa-4 pa-md-10">
            <v-row no-gutters align="center">
              <v-col>
                <h2 class="title font-weight-bold">Akun</h2>
              </v-col>
              <v-col v-if="!editField" class="text-right">
                <v-tooltip top color="primary" close-delay="250">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="changeEdit">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>Edit</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <hr class="grey lighten-5 my-4" />

            <v-fade-transition mode="in-out" hide-on-leave>
              <section v-if="!editField">
                <v-row no-gutters>
                  <v-col cols="12">
                    <p class="font-weight-bold subtitle-1 mb-2">
                      Nomor Telepon Chat Aja
                    </p>
                    <span>
                      {{ account.number }}
                    </span>
                  </v-col>
                  <v-col cols="12" class="my-4">
                    <p class="font-weight-bold subtitle-1 mb-2">Email</p>
                    <span>
                      {{ account.email }}
                    </span>
                  </v-col>
                  <v-col cols="12">
                    <p class="font-weight-bold subtitle-1 mb-2">Password</p>
                    <span style="-webkit-text-security: disc">
                      <svg
                        v-for="(item, index) in account.password.length"
                        :key="index"
                        class="mr-1"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="6" cy="6" r="6" fill="#4F4F4F" />
                      </svg>
                    </span>
                  </v-col>
                </v-row>
              </section>
            </v-fade-transition>

            <v-fade-transition mode="in-out" hide-on-leave>
              <section v-if="editField">
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
                      outlined
                      type="number"
                      class="mt-2"
                      prefix="+"
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
                      outlined
                      type="email"
                      class="mt-2"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <!-- end field email -->

                <!-- field password -->
                <v-row no-gutters :class="[editField ? '' : 'my-4']">
                  <v-col>
                    <label for="password" class="font-weight-bold"
                      >Password</label
                    >
                    <v-text-field
                      id="password"
                      v-model="account.password"
                      single-line
                      outlined
                      :type="fieldPasswordType"
                      class="mt-2"
                      :append-icon="iconPassword"
                      @click:append="togglePassword = !togglePassword"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <!-- end field password -->

                <v-row no-gutters class="mt-6">
                  <v-col class="text-center">
                    <v-btn class="mr-4" @click="changeEdit">Batal</v-btn>
                    <v-btn color="primary" class="ml-4">Simpan</v-btn>
                  </v-col>
                </v-row>
              </section>
            </v-fade-transition>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
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
