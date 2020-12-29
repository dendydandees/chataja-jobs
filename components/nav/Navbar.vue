<template>
  <nav>
    <MenuProfile v-if="hasAccount || $route.name.includes('profile')" />
    <MenuEmployer v-else-if="hasAccount || $route.name.includes('dashboard')" />
    <MenuSign v-else />
  </nav>
</template>

<script>
import MenuSign from '@/components/nav/MenuSign'
import MenuProfile from '@/components/nav/MenuProfile'
import MenuEmployer from '@/components/nav/MenuEmployer'

export default {
  components: {
    MenuSign,
    MenuProfile,
    MenuEmployer,
  },
  data: () => ({
    hasAccount: false,
  }),
}
</script>

<style></style>
