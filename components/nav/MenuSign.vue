<template>
  <div>
    <!-- navigation bar -->
    <v-app-bar app hide-on-scroll height="80" color="white">
      <v-container>
        <div class="d-flex justify-between align-center">
          <!-- logo chat aja jobs -->
          <nuxt-link to="/">
            <v-toolbar-title>
              <img src="/cajobs-logo.png" alt="ChatAja Jobs" height="100%" />
            </v-toolbar-title>
          </nuxt-link>
          <!-- end logo chat aja jobs -->

          <v-spacer></v-spacer>

          <v-app-bar-nav-icon
            v-if="
              $vuetify.breakpoint.smAndDown &&
              $route.name !== 'email-verification'
            "
            class="float-right"
            @click.stop="drawer = !drawer"
          >
            <img
              src="/navigation-icon.svg"
              alt="Navigation Icon"
              height="100%"
            />
          </v-app-bar-nav-icon>

          <!-- nav menu -->
          <div
            v-if="
              $vuetify.breakpoint.mdAndUp &&
              $route.name !== 'email-verification'
            "
          >
            <nav
              v-if="
                $route.name !== 'jobs-id' && $route.name !== 'jobs-company-code'
              "
            >
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
              <v-btn
                :color="inJobSeekerTrue ? 'error' : 'primary'"
                :outlined="!inJobSeekerTrue"
                class="ml-2"
                large
                :to="inJobSeekerTrue ? '/employer' : '/'"
              >
                <v-icon left>
                  {{
                    inJobSeekerTrue
                      ? 'mdi-office-building-outline'
                      : 'mdi-account'
                  }}
                </v-icon>
                {{ inJobSeekerTrue ? 'Perusahaan' : 'Job Seeker' }}
              </v-btn>
            </nav>

            <nav v-else>
              <v-btn color="error" large @click.stop="signInClick()">
                Masuk
              </v-btn>
            </nav>
          </div>
          <!-- end nav menu -->
        </div>
      </v-container>
    </v-app-bar>
    <!-- end navigation bar -->

    <!-- side bar -->
    <v-navigation-drawer
      v-if="
        $vuetify.breakpoint.smAndDown && $route.name !== 'email-verification'
      "
      v-model="drawer"
      app
      right
      clipped
      width="100%"
      temporary
    >
      <v-list nav>
        <v-list-item-group v-model="group">
          <nav
            v-if="
              $route.name !== 'jobs-id' && $route.name !== 'jobs-company-code'
            "
          >
            <v-row no-gutters align="center">
              <v-col cols="6">
                <!-- logo chat aja jobs -->
                <nuxt-link to="/">
                  <v-toolbar-title>
                    <img
                      src="/cajobs-logo.png"
                      alt="ChatAja Jobs"
                      height="100%"
                    />
                  </v-toolbar-title>
                </nuxt-link>
                <!-- end logo chat aja jobs -->
              </v-col>
              <v-col cols="6" class="text-right">
                <v-btn icon large @click="drawer = !drawer">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>

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
            <v-btn
              block
              :color="inJobSeekerTrue ? 'error' : 'primary'"
              :outlined="!inJobSeekerTrue"
              class="my-3"
              large
              :to="inJobSeekerTrue ? '/employer' : '/'"
            >
              <v-icon left>
                {{
                  inJobSeekerTrue
                    ? 'mdi-office-building-outline'
                    : 'mdi-account'
                }}
              </v-icon>
              {{ inJobSeekerTrue ? 'Perusahaan' : 'Job Seeker' }}
            </v-btn>
          </nav>

          <nav v-else>
            <v-btn block color="error" large @click.stop="signInClick()">
              Masuk
            </v-btn>
          </nav>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- end side bar -->

    <!-- sign modal -->
    <v-dialog
      v-if="$route.name !== 'email-verification'"
      v-model="signDialog"
      :max-width="$vuetify.breakpoint.smAndUp ? '700' : 'none'"
      :fullscreen="!$vuetify.breakpoint.smAndUp"
    >
      <v-card class="pa-sm-10">
        <v-row v-if="!$vuetify.breakpoint.smAndUp" no-gutters>
          <v-col class="px-4 py-2 text-right">
            <v-btn icon @click="signDialog = !signDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col class="pa-4 pt-0 pa-sm-0">
            <v-tabs v-model="tab" :slider-size="4">
              <v-tab href="#sign-in">Masuk</v-tab>
              <v-tab href="#sign-up">Daftar</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <!-- sign in modal content -->
              <v-scroll-x-transition mode="in-out" hide-on-leave>
                <v-tab-item v-if="tab === 'sign-in'" id="sign-in">
                  <SigninForm @forgotPasswordClick="forgotPasswordClick()" />
                </v-tab-item>
              </v-scroll-x-transition>
              <!-- end sign in modal content -->

              <!-- sign up modal content -->
              <v-scroll-x-transition mode="in-out" hide-on-leave>
                <v-tab-item v-if="tab === 'sign-up'" id="sign-up">
                  <SignupForm />
                </v-tab-item>
              </v-scroll-x-transition>
              <!-- end sign up modal content -->
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <!-- end sign modal -->

    <!-- forgot password modal -->
    <v-dialog
      v-if="$route.name !== 'email-verification'"
      v-model="forgotPasswordDialog"
      :max-width="$vuetify.breakpoint.smAndUp ? '700' : 'none'"
      :fullscreen="!$vuetify.breakpoint.smAndUp"
    >
      <ForgotPassword
        @closeDialog="forgotPasswordDialog = !forgotPasswordDialog"
        @backToSignUp="backToSignUp()"
        @backToSignIn="backToSignIn()"
      />
    </v-dialog>
    <!-- end forgot password modal -->
  </div>
</template>

<script>
import SignupForm from '@/components/nav/SignupForm'
import SigninForm from '@/components/nav/SigninForm'
import ForgotPassword from '@/components/nav/ForgotPassword'

export default {
  components: {
    SignupForm,
    SigninForm,
    ForgotPassword,
  },
  data: () => ({
    drawer: false,
    group: null,
    signDialog: false,
    forgotPasswordDialog: false,
    tab: '',
  }),
  computed: {
    inJobSeekerTrue() {
      return (
        this.$route.name.includes('jobs') || this.$route.name.includes('index')
      )
    },
  },
  watch: {
    group() {
      this.drawer = false
    },
    signDialog() {
      this.drawer = false
    },
  },
  mounted() {
    if (this.$route.params.signInModals && this.$route.params.tab) {
      this.signDialog = this.$route.params.signInModals
      this.tab = this.$route.params.tab
    }
  },
  methods: {
    // open sign up modal
    signUpClick() {
      this.tab = 'sign-up'
      setTimeout(() => {
        this.signDialog = !this.signDialog
      }, 250)
    },
    // open sign in modal
    signInClick() {
      this.tab = 'sign-in'
      setTimeout(() => {
        this.signDialog = !this.signDialog
      }, 250)
    },
    // open forgot password modal
    forgotPasswordClick() {
      this.tab = ''
      this.signDialog = !this.signDialog
      this.forgotPasswordDialog = !this.forgotPasswordDialog
    },
    // back to sign up modal
    backToSignUp() {
      this.tab = 'sign-up'
      setTimeout(() => {
        this.forgotPasswordDialog = !this.forgotPasswordDialog
        this.signDialog = !this.signDialog
      }, 250)
    },
    // back to sign in modal
    backToSignIn() {
      this.tab = 'sign-in'
      setTimeout(() => {
        this.forgotPasswordDialog = !this.forgotPasswordDialog
        this.signDialog = !this.signDialog
      }, 250)
    },
  },
}
</script>

<style></style>
