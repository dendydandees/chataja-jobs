<template>
  <section>
    <MenuEmployer
      v-if="$route.name.includes('employer') && $route.path !== '/employer'"
    />
    <MenuSign v-else />
  </section>
</template>

<script>
import MenuSign from '@/components/nav/MenuSign'
import MenuEmployer from '@/components/nav/MenuEmployer'

export default {
  components: {
    MenuSign,
    MenuEmployer,
  },
}
</script>

<style></style>
