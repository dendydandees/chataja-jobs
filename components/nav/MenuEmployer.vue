<template>
  <nav>
    <!-- navigation bar -->
    <v-app-bar app hide-on-scroll height="80" color="#2c4d63">
      <v-container>
        <div class="d-flex justify-between align-center">
          <!-- logo chat aja jobs -->
          <nuxt-link to="/">
            <v-toolbar-title>
              <img src="/cajobs-logo.png" alt="ChatAja Jobs" height="100%" />
            </v-toolbar-title>
          </nuxt-link>
          <!-- end logo chat aja jobs -->

          <v-spacer v-if="$vuetify.breakpoint.smAndDown"></v-spacer>

          <v-app-bar-nav-icon
            v-if="$vuetify.breakpoint.smAndDown"
            class="float-right"
            @click.stop="drawer = !drawer"
          >
            <img
              src="/navigation-icon-white.svg"
              alt="Navigation Icon"
              height="100%"
            />
          </v-app-bar-nav-icon>

          <!-- nav menu -->
          <div v-if="$vuetify.breakpoint.mdAndUp" style="width: 100%">
            <nav>
              <v-row dense align="center" justify="space-between" class="ml-2">
                <v-col cols="3">
                  <!-- search field -->
                  <v-text-field
                    label="Pencarian"
                    solo
                    hide-details
                  ></v-text-field>
                  <!-- end search field -->
                </v-col>
                <v-col cols="5" class="text-center">
                  <v-btn
                    v-for="(button, index) in btnOnCenter"
                    :key="index"
                    :to="button.routes"
                    nuxt
                    text
                    color="white"
                    large
                    exact
                    class="text-decoration-none"
                  >
                    {{ button.text }}
                  </v-btn>
                </v-col>

                <!-- username, notifications, settings -->
                <v-col cols="4">
                  <v-row no-gutters align="center" justify="space-between">
                    <v-col class="white--text line-clamp">
                      <span class="subtitle-1"> Selamat Datang, </span>
                      <span class="font-weight-bold"> Perusahaan</span>
                    </v-col>
                    <v-col cols="auto">
                      <v-btn
                        v-for="(button, index) in btnOnRight"
                        :key="index"
                        icon
                        color="white"
                        :to="button.routes"
                        nuxt
                        exact
                        class="text-decoration-none ml-2"
                      >
                        <v-icon>{{ button.icon }}</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <!-- end username, notifications, settings -->
              </v-row>
            </nav>
          </div>
          <!-- end nav menu -->
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
      width="100%"
      temporary
      color="#2c4d63"
    >
      <v-list nav>
        <v-list-item-group v-model="group">
          <nav>
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
                <v-btn icon color="white" large @click="drawer = !drawer">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <!-- username, notifications, settings -->
            <v-row class="my-4">
              <v-col class="white--text">
                <span class="subtitle-1">
                  Selamat Datang
                  <span class="font-weight-bold"
                    >Perusahaan tokopediasd cabang jember</span
                  >
                </span>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  v-for="(button, index) in btnOnRight"
                  :key="index"
                  icon
                  color="white"
                  :to="button.routes"
                  nuxt
                  exact
                  class="text-decoration-none ml-2"
                >
                  <v-icon>{{ button.icon }}</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <!-- end username, notifications, settings -->

            <!-- search field -->
            <v-text-field
              label="Pencarian"
              solo
              hide-details
              class="my-4"
            ></v-text-field>
            <!-- end search field -->

            <v-btn
              v-for="(button, index) in btnOnCenter"
              :key="index"
              :to="button.routes"
              text
              color="white"
              block
              large
              exact
              nuxt
              class="my-2 text-decoration-none"
            >
              {{ button.text }}
            </v-btn>
          </nav>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- end side bar -->
  </nav>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    isProcessing: false,
    btnOnCenter: [
      { routes: '/employer/dashboard', text: 'Job Vacancy' },
      { routes: '/employer/applicants', text: 'Applicants' },
    ],
    btnOnRight: [
      { routes: '/employer/notifications', icon: 'mdi-bell' },
      { routes: '/employer/settings', icon: 'mdi-cog' },
    ],
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>

<style></style>
