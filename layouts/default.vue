<template>
  <v-app>
    <!-- navigation bar -->
    <Navbar />
    <!-- end navigation bar -->

    <v-main>
      <!-- content -->
      <nuxt keep-alive />
      <!-- end content -->
    </v-main>

    <!-- footer -->
    <Footer />
    <!-- end footer -->
  </v-app>
</template>

<script>
import Navbar from '@/components/nav/Navbar'
import Footer from '@/components/Footer'
import '@/assets/style.css'

export default {
  components: {
    Navbar,
    Footer,
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
}
</script>

<style>
main {
  background: #f5f5f5 !important;
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
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
