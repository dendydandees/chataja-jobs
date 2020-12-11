<template>
  <nav>
    <!-- navigation bar -->
    <v-app-bar app hide-on-scroll height="80" color="white">
      <v-container>
        <div class="d-flex justify-between align-center">
          <nuxt-link to="/">
            <v-toolbar-title>
              <img src="/cajobs-logo.png" alt="ChatAja Jobs" height="100%" />
            </v-toolbar-title>
          </nuxt-link>
          <v-spacer></v-spacer>
          <v-menu
            v-model="menu"
            offset-y
            transition="slide-y-transition"
            rounded="lg"
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
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :to="item.link"
                active-class="primary white--text"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-container>
    </v-app-bar>
    <!-- end navigation bar -->
  </nav>
</template>

<script>
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
    items: [
      { title: 'Profil', link: '/profile/edit' },
      { title: 'Pengaturan', link: '/profile/settings' },
      { title: 'Keluar', link: '/' },
    ],
  }),
}
</script>

<style></style>
