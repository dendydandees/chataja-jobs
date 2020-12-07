<template>
  <section>
    <!-- step title -->
    <v-sheet color="white" elevation="1">
      <v-container>
        <v-row align="center">
          <v-col>
            <h1 class="headline font-weight-bold">Atur Profile Anda</h1>
          </v-col>
          <v-col class="text-center">
            <span>Step 1 : Informasi Pribadi</span>
          </v-col>
          <v-col class="text-right">
            <v-btn text to="/">Lewati</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <!-- end step title -->

    <!-- form 1 -->
    <v-row no-gutters class="my-6" justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-sheet color="white" elevation="1" rounded class="pa-10">
          <h2 class="title font-weight-bold mb-2">Informasi Dasar</h2>
          <v-row>
            <v-col cols="12" sm="auto">
              <v-img
                src="/placeholder-profile.svg"
                lazy-src="/placeholder-profile.svg"
                width="100"
                height="100"
                class="mx-auto mx-sm-0"
              >
              </v-img>
            </v-col>
            <v-col>
              <v-file-input
                label="Unggah Foto"
                outlined
                dense
                color="#2f80ed"
                prepend-icon=""
                single-line
                show-size
                hide-details="true"
                background-color="#E0EBFF"
                :style="
                  $vuetify.breakpoint.smAndUp ? `width: 40%` : `width: 100%`
                "
                class="mb-2"
              >
              </v-file-input>
              <span class="subtitle-2">
                Anda hanya dapat mengupload format jpg, jpeg, png dengan
                maksimal 10mb
              </span>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-4">
            <v-col>
              <label for="fullname" class="font-weight-bold"
                >Nama Lengkap</label
              >
              <v-text-field
                id="fullname"
                single-line
                outlined
                type="text"
                color="black"
                background-color="white"
                class="mt-2"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <label for="birthday" class="font-weight-bold"
                >Tanggal Lahir</label
              >
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    id="birthday"
                    v-model="date"
                    color="black"
                    single-line
                    outlined
                    background-color="white"
                    class="mt-2"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="date"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <label for="jenis_kelamin" class="font-weight-bold"
                >Jenis Kelamin</label
              >
              <v-radio-group
                id="jenis_kelamin"
                v-model="row"
                row
                background-color="white"
              >
                <v-radio label="Laki-Laki" value="laki_laki"></v-radio>
                <v-radio label="Perempuan" value="perempuan"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <!-- end form 1 -->

    <!-- form 2 -->
    <v-row no-gutters class="my-6" justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-sheet color="white" elevation="1" rounded class="pa-10">
          <h2 class="title font-weight-bold mb-2">Kontak</h2>
        </v-sheet>
      </v-col>
    </v-row>
    <!-- end form 2 -->
  </section>
</template>

<script>
export default {
  data: () => ({
    date: null,
    menu: false,
    row: null,
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },
  },
}
</script>

<style>
.v-input__slot {
  border: 1px solid #2f80ed !important;
  color: #2f80ed !important;
}
</style>
