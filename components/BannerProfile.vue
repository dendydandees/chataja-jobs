<template>
  <v-sheet color="#E0EBFF" elevation="0" width="100%">
    <v-container>
      <v-row no-gutters align="center">
        <v-col class="text-center">
          <span class="body-2">
            Profil Anda belum lengkap. Lengkapi segera untuk dapat melamar
            pekerjaan langsung di ChatAja Jobs
            <nuxt-link
              to="/profile/create"
              class="primary--text font-weight-bold"
              >Lengkapi Profile</nuxt-link
            >
          </span>
        </v-col>
        <v-col cols="auto" class="text-right">
          <v-btn icon @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {}
</script>

<style></style>
