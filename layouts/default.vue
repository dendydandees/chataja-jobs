<template>
  <v-app>
    <!-- navigation bar -->
    <Navbar />
    <!-- end navigation bar -->

    <v-main>
      <!-- content -->
      <nuxt />
      <!-- end content -->
    </v-main>

    <!-- footer -->
    <Footer />
    <!-- end footer -->
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>

<style>
main {
  background: #e5e5e5 !important;
}
</style>
