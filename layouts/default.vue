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
.line-clamp {
  display: -webkit-box;
  height: 3.6em;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-5 {
  display: -webkit-box;
  height: 6em;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
