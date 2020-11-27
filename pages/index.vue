<template>
  <section>
    <!-- carousel -->
    <Carousel />
    <!-- end carousel -->
  </section>
</template>

<script>
import { mapActions } from 'vuex'
// import axios from 'axios'
import Carousel from '@/components/baseComponents/Carousel'

export default {
  components: {
    Carousel,
  },
  data: () => ({
    jobs: '',
  }),
  created() {
    this.getJobs()
  },
  methods: {
    ...mapActions({
      getJobs: 'jobs/getJobs',
    }),
  },
}
</script>
