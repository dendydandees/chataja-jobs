<template>
  <section>
    <v-stepper v-model="stepper" alt-labels>
      <!-- step title -->
      <v-sheet color="white" elevation="1">
        <v-container>
          <v-row align="center">
            <v-col cols="12" sm="4">
              <h1 class="headline font-weight-bold">Atur Profile Anda</h1>
            </v-col>
            <v-col cols="12" sm="4" class="text-sm-center">
              <span>Step {{ stepper }} : {{ stepperText }}</span>
            </v-col>
            <v-col cols="12" sm="4" class="text-sm-right">
              <v-btn v-if="stepper !== 3" text to="/" elevation="2"
                >Lewati</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
      <!-- end step title -->

      <!-- step form 1 -->
      <v-stepper-content step="1">
        <section v-if="stepper === 1" class="my-10">
          <!-- form 1 -->
          <v-row no-gutters class="my-6" justify="center">
            <v-col cols="12" sm="10" md="8">
              <v-sheet
                color="white"
                elevation="1"
                rounded
                class="pa-6 pa-md-10"
              >
                <h2 class="title font-weight-bold mb-2">Informasi Dasar</h2>
                <!-- field photo profile -->
                <v-row>
                  <v-col cols="12" sm="auto">
                    <v-img
                      :src="!imageUploaded ? imageUrl : imageUploaded"
                      :lazy-src="!imageUploaded ? imageUrl : imageUploaded"
                      width="100"
                      height="100"
                      contain
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
              <v-sheet
                color="white"
                elevation="1"
                rounded
                class="pa-6 pa-md-10"
              >
                <h2 class="title font-weight-bold mb-2">Kontak</h2>
                <!-- field telphone number -->
                <v-row no-gutters class="mt-4">
                  <v-col>
                    <label for="telpNumber" class="font-weight-bold"
                      >Nomor telepon</label
                    >
                    <v-text-field
                      id="telpNumber"
                      v-model="createProfile.telpNumber"
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
                    <label for="location" class="font-weight-bold"
                      >Lokasi</label
                    >
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
              <v-sheet
                color="white"
                elevation="1"
                rounded
                class="pa-6 pa-md-10"
              >
                <v-row align="center">
                  <v-col>
                    <h2 class="title font-weight-bold mb-2">
                      Tingkat Pendidikan
                    </h2>
                  </v-col>
                  <v-col class="text-right">
                    <v-btn
                      text
                      color="primary"
                      @click="toggleEducation = !toggleEducation"
                    >
                      <v-icon left>mdi-plus-thick</v-icon>
                      Tambahkan Pendidikan
                    </v-btn>
                  </v-col>
                </v-row>
                <v-expand-transition>
                  <v-row v-if="toggleEducation" class="mt-4 img-border">
                    <v-col class="pa-4">
                      <!-- field education name -->
                      <v-row no-gutters>
                        <v-col>
                          <label for="educationName" class="font-weight-bold"
                            >Nama Instansi</label
                          >
                          <v-text-field
                            id="educationName"
                            v-model="createProfile.educationName"
                            single-line
                            outlined
                            type="text"
                            class="mt-2"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <!-- end field education name -->

                      <v-row no-gutters>
                        <!-- field degree -->
                        <v-col class="pr-2">
                          <label for="educationDegree" class="font-weight-bold"
                            >Tingkatan Pendidikan</label
                          >
                          <v-text-field
                            id="educationDegree"
                            v-model="createProfile.educationDegree"
                            single-line
                            outlined
                            type="text"
                            class="mt-2"
                          >
                          </v-text-field>
                        </v-col>
                        <!-- end field degree -->

                        <!-- field of study -->
                        <v-col class="pl-2">
                          <label for="educationStudy" class="font-weight-bold"
                            >Bidang Studi</label
                          >
                          <v-text-field
                            id="educationStudy"
                            v-model="createProfile.educationStudy"
                            single-line
                            outlined
                            type="text"
                            class="mt-2"
                          >
                          </v-text-field>
                        </v-col>
                        <!-- end field of study -->
                      </v-row>

                      <v-row no-gutters>
                        <!-- field education start -->
                        <v-col class="pr-2">
                          <label for="educationStart" class="font-weight-bold"
                            >Tahun Mulai</label
                          >
                          <v-menu
                            ref="menuEducationStart"
                            v-model="menuEducationStart"
                            :close-on-content-click="false"
                            :return-value.sync="createProfile.educationStart"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                id="educationStart"
                                v-model="createProfile.educationStart"
                                single-line
                                outlined
                                readonly
                                class="mt-2"
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="createProfile.educationStart"
                              type="month"
                              no-title
                              scrollable
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="menuEducationStart = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="
                                  $refs.menuEducationStart.save(
                                    createProfile.educationStart
                                  )
                                "
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                        <!-- end field education start -->

                        <!-- field education end -->
                        <v-col class="pl-2">
                          <label for="work_end" class="font-weight-bold"
                            >Tahun Berakhir (atau perkiraan)</label
                          >
                          <v-menu
                            ref="menuEducationEnd"
                            v-model="menuEducationEnd"
                            :close-on-content-click="false"
                            :return-value.sync="createProfile.educationEnd"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                id="educationEnd"
                                v-model="createProfile.educationEnd"
                                single-line
                                outlined
                                readonly
                                class="mt-2"
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="createProfile.educationEnd"
                              type="month"
                              no-title
                              scrollable
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="menuEducationEnd = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="
                                  $refs.menuEducationEnd.save(
                                    createProfile.educationEnd
                                  )
                                "
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                        <!-- end field education end -->
                      </v-row>
                    </v-col>
                  </v-row>
                </v-expand-transition>
              </v-sheet>
            </v-col>
          </v-row>
          <!-- end form 3 -->

          <!-- form 4 -->
          <v-row no-gutters class="my-6" justify="center">
            <v-col cols="12" sm="10" md="8">
              <v-sheet
                color="white"
                elevation="1"
                rounded
                class="pa-6 pa-md-10"
              >
                <h2 class="title font-weight-bold mb-2">Pengalaman Kerja</h2>
                <!-- toggle work exp -->
                <v-row no-gutters>
                  <v-col>
                    <v-radio-group id="workExp" v-model="toggleWorkExp" column>
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
                          <label for="workName" class="font-weight-bold"
                            >Nama Pekerjaan</label
                          >
                          <v-text-field
                            id="workName"
                            v-model="createProfile.workName"
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
                          <label for="workCompany" class="font-weight-bold"
                            >Nama Perusahaan</label
                          >
                          <v-text-field
                            id="workCompany"
                            v-model="createProfile.workCompany"
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
                          <label for="workLocation" class="font-weight-bold"
                            >Lokasi</label
                          >
                          <v-text-field
                            id="workLocation"
                            v-model="createProfile.workLocation"
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
                          <label for="workStart" class="font-weight-bold"
                            >Tahun Mulai</label
                          >
                          <v-menu
                            ref="menuWorkStart"
                            v-model="menuWorkStart"
                            :close-on-content-click="false"
                            :return-value.sync="createProfile.workStart"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                id="workStart"
                                v-model="createProfile.workStart"
                                single-line
                                outlined
                                readonly
                                class="mt-2"
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="createProfile.workStart"
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
                                  $refs.menuWorkStart.save(
                                    createProfile.workStart
                                  )
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
                          <label for="workEnd" class="font-weight-bold"
                            >Tahun Berakhir</label
                          >
                          <v-menu
                            ref="menuWorkEnd"
                            v-model="menuWorkEnd"
                            :close-on-content-click="false"
                            :return-value.sync="createProfile.workEnd"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                id="workEnd"
                                v-model="createProfile.workEnd"
                                single-line
                                outlined
                                readonly
                                class="mt-2"
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="createProfile.workEnd"
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
                                  $refs.menuWorkEnd.save(createProfile.workEnd)
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
                          <label for="workDesc" class="font-weight-bold"
                            >Deskripsi</label
                          >
                          <v-textarea
                            id="workDesc"
                            v-model="createProfile.workDesc"
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
      </v-stepper-content>
      <!-- end step form 1 -->

      <!-- step form 2 -->
      <v-stepper-content step="2">
        <section v-if="stepper === 2" class="my-10">
          <v-row no-gutters class="my-6" justify="center">
            <v-col cols="12" sm="10" md="8">
              <v-sheet
                color="white"
                elevation="1"
                rounded
                class="pa-6 pa-md-10"
              >
                <h2 class="title font-weight-bold text-center mb-10">
                  Unggah CV
                </h2>
                <v-row no-gutters justify="center">
                  <v-col cols="12" sm="10" md="8">
                    <dropzone
                      id="dropzone"
                      ref="myDropzone"
                      :use-custom-slot="true"
                      :options="dropzoneOptions"
                      @vdropzone-file-added="onFileAdded"
                      @vdropzone-error="onError"
                      @vdropzone-success="onSuccess"
                      @vdropzone-complete="onComplete"
                      @vdropzone-drag-over="onDragOver"
                      @vdropzone-drag-leave="onDragLeave"
                      @vdropzone-canceled="onCancel"
                      @vdropzone-removed-file="onRemove"
                    >
                      <div>
                        <v-icon size="100px" class="mb-10">
                          mdi-file-document-multiple
                        </v-icon>
                        <h5 class="font-weight-bold title mb-3">
                          Tarik dan letakan CV Anda disini
                        </h5>
                        <p class="subtitle-1 mb-5">
                          atau <span class="blue--text">telusuri</span> untuk
                          memilih file
                        </p>
                        <span class="subtitle-2">
                          Anda hanya bisa mengupload file pdf, png, jpeg dengan
                          Maks 10mb
                        </span>
                      </div>
                    </dropzone>
                  </v-col>
                </v-row>
                <v-row no-gutters class="mt-10 text-center">
                  <v-col>
                    <v-btn
                      color="primary"
                      :loading="loading"
                      :disabled="disabled"
                    >
                      Kirim
                    </v-btn>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-col>
          </v-row>
        </section>
      </v-stepper-content>
      <!-- end step form 2 -->

      <!-- step form 3 -->
      <v-stepper-content step="3">
        <section v-if="stepper === 3" class="my-10">
          <v-row no-gutters class="my-6" justify="center">
            <v-col cols="12" sm="10" md="8">
              <v-sheet
                color="white"
                elevation="1"
                rounded
                class="pa-6 pa-md-10 text-center"
              >
                <h2 class="title font-weight-bold">Selesai!</h2>
                <v-img
                  src="/done-create-profile.png"
                  lazy-src="/done-create-profile.png"
                  width="100"
                  height="100"
                  class="mx-auto rounded-circle my-10"
                >
                </v-img>
                <h5 class="font-weight-bold subtitle-1 mb-5">
                  Anda sudah selesai melengkapi profil Anda
                </h5>
                <p class="mb-10">
                  Sekarang Anda dapat mencari lowongan pekerjaan di ChatAja Jobs
                </p>
                <v-btn color="primary" to="/"> Cari Pekerjaan </v-btn>
              </v-sheet>
            </v-col>
          </v-row>
        </section>
      </v-stepper-content>
      <!-- end step form 3 -->

      <!-- step form -->
      <v-sheet color="white" elevation="1">
        <v-container>
          <v-row align="center">
            <v-col cols="12" sm="3">
              <v-btn text color="primary" @click="backStepper">
                <v-icon left> mdi-arrow-left </v-icon>
                Kembali
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" class="text-center py-0">
              <v-stepper-header>
                <v-stepper-step step="1" :complete="stepper > 1">
                  <span class="text-center"> Informasi Pribadi </span>
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="2" :complete="stepper > 2">
                  <span class="text-center"> Unggah CV </span>
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">
                  <span class="text-center"> Selesai </span>
                </v-stepper-step>
              </v-stepper-header>
            </v-col>
            <v-col cols="12" sm="3" class="text-sm-right">
              <v-btn color="primary" @click="nextStepper">Selanjutnya</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
      <!-- end step form -->
    </v-stepper>
  </section>
</template>

<script>
export default {
  data: () => ({
    stepper: 1,
    imageUrl: '/placeholder-profile.svg',
    imageUploaded: '',
    menuBirthday: false,
    menuEducationStart: false,
    menuEducationEnd: false,
    menuWorkStart: false,
    menuWorkEnd: false,
    toggleEducation: false,
    toggleWorkExp: '',
    createProfile: {
      file: '',
      fullname: '',
      birthday: null,
      telpNumber: '',
      gender: '',
      email: '',
      location: '',
      address: '',
      educationName: '',
      educationDegree: '',
      educationStudy: '',
      educationStart: '',
      educationEnd: '',
      workName: '',
      workCompany: '',
      workLocation: '',
      workStart: '',
      workEnd: '',
      workDesc: '',
    },
    dropzoneOptions: {
      url: 'https://httpbin.org/post',
      maxFilesize: 10,
      maxFiles: 1,
      acceptedFiles: '.jpg, .jpeg, .png, .pdf',
      thumbnailWidth: 200,
      thumbnailHeight: 200,
      addRemoveLinks: true,
    },
    disabled: true,
    loading: false,
  }),
  computed: {
    stepperText() {
      if (this.stepper === 1) {
        return 'Informasi Pribadi'
      } else if (this.stepper === 2) {
        return 'Unggah CV'
      } else {
        return 'Selesai!'
      }
    },
  },
  watch: {
    menuBirthday(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },
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
      this.accountProfile.file = file
      if (file) {
        reader.readAsDataURL(file)
      } else {
        this.imageUploaded = ''
      }
    },
    nextStepper() {
      if (this.stepper === 1) {
        this.scrollToTop()
        this.stepper = 2
      } else if (this.stepper === 2) {
        this.$refs.myDropzone.removeAllFiles()
        this.scrollToTop()
        this.stepper = 3
      } else {
        this.$refs.myDropzone.removeAllFiles()
        this.$router.push('/')
        this.stepper = 1
      }
    },
    backStepper() {
      if (this.stepper === 1) {
        this.$refs.myDropzone.removeAllFiles()
        this.$router.push('/')
      } else if (this.stepper === 2) {
        this.$refs.myDropzone.removeAllFiles()
        this.scrollToTop()
        this.stepper = 1
      } else {
        this.scrollToTop()
        this.stepper = 2
      }
    },
    onDragOver() {
      this.$el.querySelector('#dropzone').style.backgroundColor = '#e0ebff'
      this.$el.querySelector('#dropzone').style.borderColor = '#2f80ed'
    },
    onDragLeave() {
      this.$el.querySelector('#dropzone').style.backgroundColor = 'white'
      this.$el.querySelector('#dropzone').style.borderColor = '#979797'
    },
    onFileAdded() {
      this.$el.querySelector('#dropzone').style.backgroundColor = '#e5e5e5'
      this.$el.querySelector('#dropzone').style.borderColor = '#2f80ed'
      this.loading = true
      this.disabled = true
    },
    onError() {
      this.$el.querySelector('#dropzone').style.borderColor = '#ff5252'
      this.loading = false
      this.disabled = true
    },
    onCancel() {
      this.$el.querySelector('#dropzone').style.backgroundColor = 'white'
      this.$el.querySelector('#dropzone').style.borderColor = '#979797'
      this.loading = false
      this.disabled = true
    },
    onRemove() {
      this.$el.querySelector('#dropzone').style.backgroundColor = 'white'
      this.$el.querySelector('#dropzone').style.borderColor = '#979797'
      this.loading = false
      this.disabled = true
    },
    onSuccess() {
      this.$el.querySelector('#dropzone').style.backgroundColor = '#e5e5e5'
      this.$el.querySelector('#dropzone').style.borderColor = '#2f80ed'
      this.loading = false
      this.disabled = false
    },
    onComplete() {
      this.$el.querySelector('#dropzone').style.backgroundColor = '#e0ebff'
    },
  },
}
</script>

<style scoped>
.theme--light.v-stepper {
  background: #e5e5e5 !important;
}
.vue-dropzone {
  text-align: center;
  border: 2px dashed #979797;
}
.vue-dropzone:hover {
  border-color: #2f80ed;
  background-color: #e0ebff;
}
.dropzone-custom-content {
  text-align: center;
}
</style>
