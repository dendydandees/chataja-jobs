<template>
  <v-container>
    <v-carousel
      cycle
      interval="3000"
      delimiter-icon="mdi-minus"
      :height="carouselHeight"
      show-arrows-on-hover
      :hide-delimiter-background="$vuetify.breakpoint.smAndDown"
      class="elevation-1 rounded-lg"
    >
      <v-carousel-item v-for="(item, i) in items" :key="i">
        <v-img
          :src="item.src"
          :lazy-src="item.src"
          contain
          width="100%"
        ></v-img>
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
        return '130'
      } else {
        return '180'
      }
    },
  },
}
</script>

<style></style>
