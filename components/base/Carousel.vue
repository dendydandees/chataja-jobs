<template>
  <v-container>
    <v-carousel
      cycle
      interval="3000"
      hide-delimiter-background
      :height="carouselHeight"
      show-arrows-on-hover
      class="elevation-1 rounded-lg"
    >
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
      </v-carousel-item>
    </v-carousel>
  </v-container>
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

<style></style>
