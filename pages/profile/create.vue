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
            <v-btn text to="/" elevation="2">Lewati</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <!-- end step title -->

    <!-- form 1 -->
    <v-row no-gutters class="my-6" justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-sheet color="white" elevation="1" rounded class="pa-6 pa-md-10">
          <h2 class="title font-weight-bold mb-2">Informasi Dasar</h2>
          <!-- field photo profile -->
          <v-row>
            <v-col cols="12" sm="auto">
              <v-img
                :src="!imageUploaded ? imageUrl : imageUploaded"
                :lazy-src="!imageUploaded ? imageUrl : imageUploaded"
                width="100"
                height="100"
                class="mx-auto mx-sm-0 rounded-circle img-border"
                style="cursor: pointer"
                @click="chooseFile()"
              >
              </v-img>
            </v-col>
            <v-col>
              <v-row no-gutters align="center">
                <v-col cols="auto">
                  <v-btn outlined color="primary" @click="chooseFile">
                    Unggah Foto
                  </v-btn>
                </v-col>
                <v-col>
                  <v-file-input
                    id="profile_photos"
                    single-line
                    solo
                    flat
                    dense
                    prepend-icon=""
                    show-size
                    hide-details="true"
                    accept="image/png, image/jpeg, image/jpg, image/bmp"
                    class="mb-2"
                    :clearable="false"
                    @change="onFilePicked($event)"
                  >
                  </v-file-input>
                </v-col>
              </v-row>
              <span class="subtitle-2">
                Anda hanya dapat mengupload format jpg, jpeg, png dengan
                maksimal 10mb
              </span>
            </v-col>
          </v-row>
          <!-- end field photo profile -->

          <!-- field fullname -->
          <v-row no-gutters class="mt-4">
            <v-col>
              <label for="fullname" class="font-weight-bold"
                >Nama Lengkap</label
              >
              <v-text-field
                id="fullname"
                v-model="createProfile.fullname"
                single-line
                outlined
                type="text"
                class="mt-2"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <!-- end field fullname -->

          <!-- field birthday -->
          <v-row no-gutters>
            <v-col>
              <label for="birthday" class="font-weight-bold"
                >Tanggal Lahir</label
              >
              <v-menu
                ref="menuBirthday"
                v-model="menuBirthday"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    id="birthday"
                    v-model="createProfile.birthday"
                    single-line
                    outlined
                    class="mt-2"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="createProfile.birthday"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="saveBirthday"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <!-- field birthday -->

          <!-- field gender -->
          <v-row no-gutters>
            <v-col>
              <label for="jenis_kelamin" class="font-weight-bold"
                >Jenis Kelamin</label
              >
              <v-radio-group
                id="jenis_kelamin"
                v-model="createProfile.gender"
                row
              >
                <v-radio label="Laki-Laki" value="laki_laki"></v-radio>
                <v-radio label="Perempuan" value="perempuan"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <!-- end field gender -->
        </v-sheet>
      </v-col>
    </v-row>
    <!-- end form 1 -->

    <!-- form 2 -->
    <v-row no-gutters class="my-6" justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-sheet color="white" elevation="1" rounded class="pa-6 pa-md-10">
          <h2 class="title font-weight-bold mb-2">Kontak</h2>
          <!-- field telphone number -->
          <v-row no-gutters class="mt-4">
            <v-col>
              <label for="telp_number" class="font-weight-bold"
                >Nomor telepon</label
              >
              <v-text-field
                id="telp_number"
                v-model="createProfile.telp_number"
                single-line
                outlined
                type="number"
                class="mt-2"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <!-- field telphone number -->

          <!-- field email -->
          <v-row no-gutters>
            <v-col>
              <label for="email" class="font-weight-bold">Email</label>
              <v-text-field
                id="email"
                v-model="createProfile.email"
                single-line
                outlined
                type="email"
                class="mt-2"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <!-- end field email -->

          <!-- field location -->
          <v-row no-gutters>
            <v-col>
              <label for="location" class="font-weight-bold">Lokasi</label>
              <v-text-field
                id="location"
                v-model="createProfile.location"
                single-line
                outlined
                type="text"
                class="mt-2"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <!-- end field location -->

          <!-- field address -->
          <v-row no-gutters>
            <v-col>
              <label for="address" class="font-weight-bold">Alamat</label>
              <v-textarea
                id="address"
                v-model="createProfile.address"
                outlined
                clearable
                clear-icon="mdi-close-circle"
                auto-grow
                value=""
                class="mt-2"
              ></v-textarea>
            </v-col>
          </v-row>
          <!-- end field address -->
        </v-sheet>
      </v-col>
    </v-row>
    <!-- end form 2 -->

    <!-- form 3 -->
    <v-row no-gutters class="my-6" justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-sheet color="white" elevation="1" rounded class="pa-6 pa-md-10">
          <v-row align="center">
            <v-col>
              <h2 class="title font-weight-bold mb-2">Tingkat Pendidikan</h2>
            </v-col>
            <v-col class="text-right">
              <v-btn text color="primary">
                <v-icon left>mdi-plus-thick</v-icon>
                Tambahkan Pendidikan
              </v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <!-- end form 3 -->

    <!-- form 4 -->
    <v-row no-gutters class="my-6" justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-sheet color="white" elevation="1" rounded class="pa-6 pa-md-10">
          <h2 class="title font-weight-bold mb-2">Pengalaman Kerja</h2>
          <!-- toggle work exp -->
          <v-row no-gutters>
            <v-col>
              <v-radio-group id="work_exp" v-model="toggleWorkExp" column>
                <v-radio
                  label="Saya mempunyai pengalaman kerja"
                  :value="true"
                ></v-radio>
                <v-radio
                  label="Saya belum mempunyai pengalaman kerja"
                  :value="false"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <!-- end toggle work exp -->
          <v-expand-transition>
            <v-row v-if="toggleWorkExp" class="mt-4 img-border">
              <v-col class="pa-4">
                <!-- field work name -->
                <v-row no-gutters>
                  <v-col>
                    <label for="work_name" class="font-weight-bold"
                      >Nama Pekerjaan</label
                    >
                    <v-text-field
                      id="work_name"
                      v-model="createProfile.work_name"
                      single-line
                      outlined
                      type="text"
                      class="mt-2"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <!-- end field work name -->

                <!-- field work company -->
                <v-row no-gutters>
                  <v-col>
                    <label for="work_company" class="font-weight-bold"
                      >Nama Perusahaan</label
                    >
                    <v-text-field
                      id="work_company"
                      v-model="createProfile.work_company"
                      single-line
                      outlined
                      type="text"
                      class="mt-2"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <!-- end field work company -->

                <!-- field work location -->
                <v-row no-gutters>
                  <v-col>
                    <label for="work_location" class="font-weight-bold"
                      >Lokasi</label
                    >
                    <v-text-field
                      id="work_location"
                      v-model="createProfile.work_location"
                      single-line
                      outlined
                      type="text"
                      class="mt-2"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <!-- end field work location -->
                <v-row no-gutters>
                  <!-- field work start -->
                  <v-col class="pr-2">
                    <label for="work_start" class="font-weight-bold"
                      >Tahun Mulai</label
                    >
                    <v-menu
                      ref="menuWorkStart"
                      v-model="menuWorkStart"
                      :close-on-content-click="false"
                      :return-value.sync="createProfile.work_start"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          id="work_start"
                          v-model="createProfile.work_start"
                          single-line
                          outlined
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="createProfile.work_start"
                        type="month"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="menuWorkStart = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="
                            $refs.menuWorkStart.save(createProfile.work_start)
                          "
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <!-- end field work start -->

                  <!-- field work end -->
                  <v-col class="pl-2">
                    <label for="work_end" class="font-weight-bold"
                      >Tahun Berakhir</label
                    >
                    <v-menu
                      ref="menuWorkEnd"
                      v-model="menuWorkEnd"
                      :close-on-content-click="false"
                      :return-value.sync="createProfile.work_end"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          id="work_end"
                          v-model="createProfile.work_end"
                          single-line
                          outlined
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="createProfile.work_end"
                        type="month"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="menuWorkEnd = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="
                            $refs.menuWorkEnd.save(createProfile.work_end)
                          "
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <!-- end field work end -->
                </v-row>

                <!-- field work desc -->
                <v-row no-gutters>
                  <v-col>
                    <label for="work_desc" class="font-weight-bold"
                      >Deskripsi</label
                    >
                    <v-textarea
                      id="work_desc"
                      v-model="createProfile.desc"
                      outlined
                      clearable
                      clear-icon="mdi-close-circle"
                      auto-grow
                      value=""
                      class="mt-2"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <!-- end field work desc -->
              </v-col>
            </v-row>
          </v-expand-transition>
        </v-sheet>
      </v-col>
    </v-row>
    <!-- end form 4 -->
  </section>
</template>

<script>
export default {
  data: () => ({
    imageUrl: '/placeholder-profile.svg',
    imageUploaded: '',
    menuBirthday: false,
    menuWorkStart: false,
    menuWorkEnd: false,
    toggleWorkExp: '',
    createProfile: {
      file: '',
      fullname: '',
      birthday: null,
      telp_number: '',
      gender: '',
      email: '',
      location: '',
      address: '',
      work_name: '',
      work_company: '',
      work_location: '',
      work_start: '',
      work_end: '',
      desc: '',
    },
  }),
  watch: {
    menuBirthday(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  methods: {
    saveBirthday(birthday) {
      this.$refs.menuBirthday.save(birthday)
    },
    chooseFile() {
      const input = this.$el.querySelector('#profile_photos')
      input.click()
    },
    onFilePicked(file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        this.imageUploaded = reader.result
      }
      this.createProfile.file = file
      reader.readAsDataURL(file)
    },
  },
}
</script>

<style scoped></style>
