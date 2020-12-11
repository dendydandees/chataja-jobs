<template>
  <nav>
    <MenuProfile v-if="hasAccount" />
    <MenuSign v-else />
  </nav>
</template>

<script>
import MenuSign from '@/components/nav/MenuSign'
import MenuProfile from '@/components/nav/MenuProfile'

export default {
  components: {
    MenuSign,
    MenuProfile,
  },
  data: () => ({
    hasAccount: false,
  }),
}
</script>

<style></style>
