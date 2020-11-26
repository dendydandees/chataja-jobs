<template>
  <section>
    <v-app-bar app hide-on-scroll height="80">
      <v-container>
        <div class="d-flex justify-between align-center">
          <v-toolbar-title>
            <img src="/cajobs-logo.svg" alt="ChatAja Jobs" height="100%" />
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-app-bar-nav-icon
            v-if="$vuetify.breakpoint.smAndDown"
            class="float-right"
            @click.stop="drawer = !drawer"
          >
          </v-app-bar-nav-icon>
          <div v-if="$vuetify.breakpoint.mdAndUp">
            <v-btn text color="primary" class="mx-2" large>Daftar</v-btn>
            <v-btn text color="primary" class="mx-2" large>Masuk</v-btn>
            <v-btn color="error" class="mx-2" large>
              <v-icon left> mdi-office-building-outline </v-icon>
              Perusahaan
            </v-btn>
          </div>
        </div>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      app
      right
      clipped
    >
      <v-list nav>
        <v-list-item-group v-model="group">
          <v-btn block text color="primary" class="my-3" large>Daftar</v-btn>
          <v-btn block text color="primary" class="my-3" large>Masuk</v-btn>
          <v-btn block color="error" class="my-3" large>
            <v-icon left> mdi-office-building-outline </v-icon>
            Perusahaan
          </v-btn>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </section>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>

<style>
.v-toolbar__content {
  padding: 0px !important;
}
</style>
