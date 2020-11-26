<template>
  <v-app>
    <!-- navigation bar -->
    <Navbar />
    <!-- end navigation bar -->
    <v-main>
      <v-container>
        <!-- content -->
        <nuxt />
        <!-- end content -->
      </v-container>
    </v-main>
    <!-- footer -->
    <v-footer padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer>
    <!-- end footer -->
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar,
  },
}
</script>

<style>
main {
  background: #e5e5e5;
}
</style>
