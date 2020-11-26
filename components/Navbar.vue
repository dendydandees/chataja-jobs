<template>
  <section>
    <!-- navigation bar -->
    <v-app-bar app hide-on-scroll height="80" color="white">
      <v-container>
        <div class="d-flex justify-between align-center">
          <v-toolbar-title>
            <img src="/cajobs-logo.png" alt="ChatAja Jobs" height="100%" />
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-app-bar-nav-icon
            v-if="$vuetify.breakpoint.smAndDown"
            class="float-right"
            @click.stop="drawer = !drawer"
          >
            <img
              src="/navigation-icon.svg"
              alt="Navigation Icon"
              height="100%"
            />
          </v-app-bar-nav-icon>
          <div v-if="$vuetify.breakpoint.mdAndUp">
            <v-btn
              text
              color="primary"
              class="mx-2"
              large
              @click.stop="signUpClick()"
              >Daftar</v-btn
            >
            <v-btn
              text
              color="primary"
              class="mx-2"
              large
              @click.stop="signInClick()"
              >Masuk</v-btn
            >
            <v-btn color="error" class="mx-2" large>
              <v-icon left> mdi-office-building-outline </v-icon>
              Perusahaan
            </v-btn>
          </div>
        </div>
      </v-container>
    </v-app-bar>
    <!-- end navigation bar -->

    <!-- side bar -->
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      app
      right
      clipped
    >
      <v-list nav>
        <v-list-item-group v-model="group">
          <v-btn
            block
            text
            color="primary"
            class="my-3"
            large
            @click.stop="signUpClick()"
            >Daftar</v-btn
          >
          <v-btn
            block
            text
            color="primary"
            class="my-3"
            large
            @click.stop="signInClick()"
            >Masuk</v-btn
          >
          <v-btn block color="error" class="my-3" large>
            <v-icon left> mdi-office-building-outline </v-icon>
            Perusahaan
          </v-btn>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- end side bar -->

    <!-- sign modal -->
    <v-dialog v-model="dialog" max-width="700">
      <v-card class="pa-6 pa-md-10">
        <v-tabs v-model="tab">
          <v-tab target="sign-in" href="#sign-in">Masuk</v-tab>
          <v-tab target="sign-up" href="#sign-up">Daftar</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <!-- sign in modal content -->
          <v-tab-item id="sign-in" value="sign-in">
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
                    <label for="password" class="font-weight-bold"
                      >Password</label
                    >
                    <v-text-field
                      id="password"
                      single-line
                      outlined
                      class="mt-2"
                      type="password"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-btn block x-large color="primary" class="my-4">Masuk</v-btn>
                <v-btn block x-large color="primary" text>Lupa Password</v-btn>
              </v-form>
            </v-card>
          </v-tab-item>
          <!-- end sign in modal content -->
          <!-- sign up modal content -->
          <v-tab-item id="sign-up" value="sign-up">
            <v-card flat>
              <h2 class="text-h3 font-weight-bold my-8">Daftar</h2>
              <v-form>
                <v-row no-gutters>
                  <v-col cols="12">
                    <label for="fullname" class="font-weight-bold"
                      >Nama Lengkap</label
                    >
                    <v-text-field
                      id="fullname"
                      single-line
                      outlined
                      class="mt-2"
                      type="text"
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
                      single-line
                      outlined
                      class="mt-2"
                      type="tel"
                    ></v-text-field>
                  </v-col>
                </v-row>
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
                    <label for="password" class="font-weight-bold"
                      >Password</label
                    >
                    <v-text-field
                      id="password"
                      single-line
                      outlined
                      class="mt-2"
                      type="password"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-btn block x-large color="primary" class="mt-4 mb-6"
                  >Register</v-btn
                >
                <p class="text-center body-1">
                  Dengan mendaftar, saya setuju dengan
                  <a to="" target="_blank" class="text-decoration-none"
                    >Syarat & Ketentuan</a
                  >
                  dan
                  <a to="" target="_blank" class="text-decoration-none"
                    >Kebijakan Privasi</a
                  >
                  ChatAja.
                </p>
              </v-form>
            </v-card>
          </v-tab-item>
          <!-- end sign up modal content -->
        </v-tabs-items>
      </v-card>
    </v-dialog>
    <!-- end sign modal -->
  </section>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    dialog: false,
    tab: '',
  }),
  watch: {
    group() {
      this.drawer = false
    },
    dialog() {
      this.drawer = false
    },
  },
  methods: {
    signUpClick() {
      this.dialog = !this.dialog
      this.tab = 'sign-up'
    },
    signInClick() {
      this.dialog = !this.dialog
      this.tab = 'sign-in'
    },
  },
}
</script>

<style>
.v-toolbar__content {
  padding: 0px !important;
}
</style>
