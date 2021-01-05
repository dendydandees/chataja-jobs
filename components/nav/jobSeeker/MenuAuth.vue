<template>
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

        <v-menu
          v-model="menu"
          offset-y
          transition="slide-y-transition"
          rounded="lg"
          left
        >
          <template v-slot:activator="{ on, attrs }">
            <img
              src="/placeholder-profile.svg"
              lazy-src="/placeholder-profile.svg"
              alt="John"
              width="50"
              height="50"
              class="rounded"
              v-bind="attrs"
              v-on="on"
            />
          </template>

          <v-list>
            <v-list-item to="/profile/edit" active-class="primary white--text">
              <v-list-item-title>Profil</v-list-item-title>
            </v-list-item>
            <v-list-item
              to="/profile/settings"
              active-class="primary white--text"
            >
              <v-list-item-title>Pengaturan</v-list-item-title>
            </v-list-item>
            <v-list-item active-class="primary white--text" @click="logout">
              <v-list-item-title>Keluar</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-container>
  </v-app-bar>
  <!-- end navigation bar -->
</template>

<script>
export default {
  data: () => ({
    menu: false,
  }),
  methods: {
    // logout user
    async logout() {
      this.$auth.$storage.removeUniversal('user')
      await this.$auth.logout()
      this.$nuxt.refresh()
    },
  },
}
</script>

<style></style>
