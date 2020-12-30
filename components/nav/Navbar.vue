<template>
  <nav>
    <MenuProfile v-if="$route.name.includes('profile')" />
    <MenuEmployer
      v-else-if="
        $route.name.includes('employer') && $route.path !== '/employer'
      "
    />
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
}
</script>

<style></style>
