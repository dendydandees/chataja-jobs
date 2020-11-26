<template>
  <section>
    <!-- carousel -->
    <v-carousel
      cycle
      :height="carouselHeight"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
      </v-carousel-item>
    </v-carousel>
    <!-- end carousel -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: '/carousel-ca-jobs.png',
        },
        {
          src: '/carousel-ca-jobs.png',
        },
      ],
    }
  },
  computed: {
    carouselHeight() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return '270'
      } else if (this.$vuetify.breakpoint.xs) {
        return '100'
      } else {
        return '180'
      }
    },
  },
}
</script>
