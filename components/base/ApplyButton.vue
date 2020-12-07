<template>
  <v-menu transition="slide-y-transition" bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" large v-bind="attrs" v-on="on">
        <v-icon left> mdi-send </v-icon>
        Lamar
      </v-btn>
    </template>
    <v-list>
      <v-list-item :to="`/jobs/${details.id}/apply`">
        <v-list-item-title> Lamar via ChatAja Jobs </v-list-item-title>
      </v-list-item>
      <v-list-item
        :href="`https://www.kalibrr.id/c/${details.company_info.code}/jobs/${details.id}/${details.slug}`"
        target="__blank"
      >
        <v-list-item-title> Lamar via Kalibrr </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {}
</script>

<style></style>
