<template>
  <section>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-sheet color="white" elevation="1" rounded class="pa-6 pa-md-10">
          <div class="text-center">
            <v-img
              src="/error.png"
              lazy-src="/error.png"
              width="100"
              height="100"
              class="mx-auto my-10"
            >
            </v-img>
            <h1 class="headline font-weight-bold mb-6">
              Terjadi Kesalahan Pada Jaringan Anda
            </h1>
            <v-btn large color="primary" @click="$emit('refresh')"
              >Refresh</v-btn
            >
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {}
</script>

<style></style>
