<template>
  <section>
    <!-- fieldset basic info -->
    <v-sheet color="white" elevation="1" rounded class="pa-4 pa-md-10 my-6">
      <v-fade-transition mode="in-out" hide-on-leave>
        <section v-if="!editBasicInfo">
          <v-row no-gutters>
            <v-col cols="12" sm="auto" class="mr-sm-10">
              <v-img
                :src="!imageUploaded ? imageUrl : imageUploaded"
                :lazy-src="!imageUploaded ? imageUrl : imageUploaded"
                width="100"
                height="100"
                contain
                class="mx-auto mx-sm-0 rounded-circle img-border"
              >
              </v-img>
            </v-col>
            <v-col order="last" class="mt-4 mt-sm-0">
              <h3 class="font-weight-bold headline text-center text-sm-left">
                {{ accountProfile.fullname }}
              </h3>
              <span
                class="text--secondary d-block font-weight-bold my-2 text-center text-sm-left"
              >
                {{ $moment(accountProfile.birthday).format('D MMM YYYY') }}
              </span>
              <span
                class="text--secondary d-block font-weight-bold text-center text-sm-left"
              >
                {{
                  accountProfile.gender === 'laki_laki'
                    ? 'Laki-Laki'
                    : 'Perempuan'
                }}
              </span>
            </v-col>
            <v-col
              cols="12"
              sm="auto"
              order="first"
              order-sm="last"
              class="text-right"
            >
              <v-tooltip top color="primary" close-delay="250">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on" @click="changeEditBasic">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </section>
      </v-fade-transition>

      <v-fade-transition mode="in-out" hide-on-leave>
        <section v-if="editBasicInfo">
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
                    v-model="accountProfile.file"
                    :rules="file"
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
                v-model="accountProfile.fullname"
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
                    v-model="accountProfile.birthday"
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
                  v-model="accountProfile.birthday"
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
                v-model="accountProfile.gender"
                row
              >
                <v-radio label="Laki-Laki" value="laki_laki"></v-radio>
                <v-radio label="Perempuan" value="perempuan"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <!-- end field gender -->

          <v-row v-if="editBasicInfo" no-gutters class="mt-6">
            <v-col class="text-center">
              <v-btn class="mr-4" @click="changeEditBasic">Batal</v-btn>
              <v-btn color="primary" class="ml-4">Simpan</v-btn>
            </v-col>
          </v-row>
        </section>
      </v-fade-transition>
    </v-sheet>
    <!-- end fieldset basic info -->

    <!-- fieldset contact -->
    <v-sheet color="white" elevation="1" rounded class="pa-4 pa-md-10 my-6">
      <v-row no-gutters align="center">
        <v-col>
          <h2 class="headline font-weight-bold">Kontak</h2>
        </v-col>
        <v-col v-if="!editContact" class="text-right">
          <v-tooltip top color="primary" close-delay="250">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="changeEditContact">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <hr class="grey lighten-5 my-4" />

      <v-fade-transition mode="in-out" hide-on-leave>
        <section v-if="!editContact">
          <v-row no-gutters>
            <v-col cols="12" class="mb-4">
              <p class="font-weight-bold subtitle-1 mb-2">Nomor Telepon</p>
              <span>
                {{ accountProfile.telpNumber }}
              </span>
            </v-col>
            <v-col cols="12" class="mb-4">
              <p class="font-weight-bold subtitle-1 mb-2">Email</p>
              <span>
                {{ accountProfile.email }}
              </span>
            </v-col>
            <v-col cols="12" class="mb-4">
              <p class="font-weight-bold subtitle-1 mb-2">Lokasi</p>
              <span>
                {{ accountProfile.location }}
              </span>
            </v-col>
            <v-col cols="12">
              <p class="font-weight-bold subtitle-1 mb-2">Alamat</p>
              <span>
                {{ accountProfile.address }}
              </span>
            </v-col>
          </v-row>
        </section>
      </v-fade-transition>

      <v-fade-transition mode="in-out" hide-on-leave>
        <section v-if="editContact">
          <!-- field telp number -->
          <v-row no-gutters>
            <v-col>
              <label for="telp_number" class="font-weight-bold"
                >Nomor Telepon ChatAja</label
              >
              <v-text-field
                id="telp_number"
                v-model="accountProfile.telpNumber"
                single-line
                :outlined="editContact"
                :solo="!editContact"
                :flat="!editContact"
                :readonly="!editContact"
                type="number"
                class="mt-2"
                prefix="+"
                :hide-details="!editContact"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <!-- end field telp number -->

          <!-- field email -->
          <v-row no-gutters>
            <v-col>
              <label for="email" class="font-weight-bold">Email</label>
              <v-text-field
                id="email"
                v-model="accountProfile.email"
                single-line
                :outlined="editContact"
                :solo="!editContact"
                :flat="!editContact"
                :readonly="!editContact"
                type="email"
                class="mt-2"
                :hide-details="!editContact"
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
                v-model="accountProfile.location"
                single-line
                :outlined="editContact"
                :solo="!editContact"
                :flat="!editContact"
                :readonly="!editContact"
                type="text"
                class="mt-2"
                :hide-details="!editContact"
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
                v-model="accountProfile.address"
                :outlined="editContact"
                :solo="!editContact"
                :flat="!editContact"
                :readonly="!editContact"
                :clearable="editContact"
                clear-icon="mdi-close-circle"
                auto-grow
                value=""
                class="mt-2"
                :hide-details="!editContact"
              ></v-textarea>
            </v-col>
          </v-row>
          <!-- end field address -->

          <v-row no-gutters class="mt-6">
            <v-col class="text-center">
              <v-btn class="mr-4" @click="changeEditContact">Batal</v-btn>
              <v-btn color="primary" class="ml-4">Simpan</v-btn>
            </v-col>
          </v-row>
        </section>
      </v-fade-transition>
    </v-sheet>
    <!-- end fieldset contact -->

    <!-- fieldset education -->
    <v-sheet color="white" elevation="1" rounded class="pa-4 pa-md-10 my-6">
      <v-row no-gutters align="center">
        <v-col>
          <h2 class="headline font-weight-bold">Tingkat Pendidikan</h2>
        </v-col>
        <v-col v-if="!editEducation" class="text-right">
          <v-tooltip top color="primary" close-delay="250">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="changeEditEducation">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <hr class="grey lighten-5 my-4" />

      <v-fade-transition mode="in-out" hide-on-leave>
        <section v-if="!editEducation">
          <v-row
            no-gutters
            style="border-bottom: 1px solid rgba(0, 0, 0, 0.25)"
          >
            <v-col cols="12" class="mb-4">
              <p class="font-weight-bold subtitle-1 mb-2">Nama Instansi</p>
              <span>
                {{ accountProfile.educationName }}
              </span>
            </v-col>
            <v-col cols="12" sm="6" class="mb-4">
              <p class="font-weight-bold subtitle-1 mb-2">
                Tingkatan Pendidikan
              </p>
              <span>
                {{ accountProfile.educationDegree }}
              </span>
            </v-col>
            <v-col cols="12" sm="6" class="mb-4">
              <p class="font-weight-bold subtitle-1 mb-2">Bidang Studi</p>
              <span>
                {{ accountProfile.educationStudy }}
              </span>
            </v-col>
            <v-col cols="12" sm="6" class="mb-4">
              <p class="font-weight-bold subtitle-1 mb-2">Tahun Mulai</p>
              <span>
                {{ accountProfile.educationStart }}
              </span>
            </v-col>
            <v-col cols="12" sm="6" class="mb-4">
              <p class="font-weight-bold subtitle-1 mb-2">
                Tahun Berakhir (atau perkiraan)
              </p>
              <span>
                {{ accountProfile.educationEnd }}
              </span>
            </v-col>
          </v-row>
        </section>
      </v-fade-transition>

      <v-fade-transition mode="in-out" hide-on-leave>
        <section v-if="editEducation">
          <v-btn
            v-if="editEducation"
            text
            color="primary"
            @click="toggleEducation = !toggleEducation"
          >
            <v-icon left>mdi-plus-thick</v-icon>
            Tambahkan Pendidikan
          </v-btn>

          <v-row class="mx-0 mt-4 img-border rounded">
            <v-col class="pa-4">
              <!-- field education name -->
              <v-row no-gutters>
                <v-col>
                  <label for="educationName" class="font-weight-bold"
                    >Nama Instansi</label
                  >
                  <v-text-field
                    id="educationName"
                    v-model="accountProfile.educationName"
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
                    v-model="accountProfile.educationDegree"
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
                    v-model="accountProfile.educationStudy"
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
                    :return-value.sync="accountProfile.educationStart"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        id="educationStart"
                        v-model="accountProfile.educationStart"
                        single-line
                        outlined
                        class="mt-2"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-if="editEducation"
                      v-model="accountProfile.educationStart"
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
                            accountProfile.educationStart
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
                  <label for="educationEnd" class="font-weight-bold"
                    >Tahun Berakhir (atau perkiraan)</label
                  >
                  <v-menu
                    ref="menuEducationEnd"
                    v-model="menuEducationEnd"
                    :close-on-content-click="false"
                    :return-value.sync="accountProfile.educationEnd"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        id="educationEnd"
                        v-model="accountProfile.educationEnd"
                        single-line
                        outlined
                        class="mt-2"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-if="editEducation"
                      v-model="accountProfile.educationEnd"
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
                            accountProfile.educationEnd
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

              <v-row no-gutters class="mt-6">
                <v-col class="text-center">
                  <v-btn class="mr-4" @click="changeEditEducation">Batal</v-btn>
                  <v-btn color="primary" class="ml-4">Simpan</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </section>
      </v-fade-transition>
    </v-sheet>
    <!-- end fieldset education -->

    <!-- fieldset work exp -->
    <v-sheet color="white" elevation="1" rounded class="pa-4 pa-md-10 my-6">
      <v-row no-gutters align="center">
        <v-col>
          <h2 class="headline font-weight-bold">Pengalaman Kerja</h2>
        </v-col>
        <v-col v-if="!editWork" class="text-right">
          <v-tooltip top color="primary" close-delay="250">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="changeEditWork">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <hr class="grey lighten-5 my-4" />

      <v-fade-transition mode="in-out" hide-on-leave>
        <section v-if="!editWork">
          <v-row
            no-gutters
            style="border-bottom: 1px solid rgba(0, 0, 0, 0.25)"
          >
            <v-col cols="12" class="mb-4">
              <p class="font-weight-bold subtitle-1 mb-2">Nama Pekerjaan</p>
              <span>
                {{ accountProfile.workName }}
              </span>
            </v-col>
            <v-col cols="12" class="mb-4">
              <p class="font-weight-bold subtitle-1 mb-2">Nama Perusahaan</p>
              <span>
                {{ accountProfile.workCompany }}
              </span>
            </v-col>
            <v-col cols="12" class="mb-4">
              <p class="font-weight-bold subtitle-1 mb-2">Lokasi</p>
              <span>
                {{ accountProfile.workLocation }}
              </span>
            </v-col>
            <v-col cols="12" sm="6" class="mb-4">
              <p class="font-weight-bold subtitle-1 mb-2">Tahun Mulai</p>
              <span>
                {{ accountProfile.workStart }}
              </span>
            </v-col>
            <v-col cols="12" sm="6" class="mb-4">
              <p class="font-weight-bold subtitle-1 mb-2">Tahun Berakhir</p>
              <span>
                {{ accountProfile.workEnd }}
              </span>
            </v-col>
            <v-col cols="12" class="mb-4">
              <p class="font-weight-bold subtitle-1 mb-2">Deskripsi</p>
              <span>
                {{ accountProfile.workDesc }}
              </span>
            </v-col>
          </v-row>
        </section>
      </v-fade-transition>

      <v-fade-transition mode="in-out" hide-on-leave>
        <section v-if="editWork">
          <v-btn text color="primary" @click="toggleWork = !toggleWork">
            <v-icon left>mdi-plus-thick</v-icon>
            Tambahkan Pengalaman Kerja
          </v-btn>

          <v-row class="mx-0 mt-4 img-border rounded">
            <v-col class="pa-4">
              <!-- field work name -->
              <v-row no-gutters :class="[editWork ? '' : 'my-4']">
                <v-col>
                  <label for="workName" class="font-weight-bold"
                    >Nama Pekerjaan</label
                  >
                  <v-text-field
                    id="workName"
                    v-model="accountProfile.workName"
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
              <v-row no-gutters :class="[editWork ? '' : 'my-4']">
                <v-col>
                  <label for="workCompany" class="font-weight-bold"
                    >Nama Perusahaan</label
                  >
                  <v-text-field
                    id="workCompany"
                    v-model="accountProfile.workCompany"
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
              <v-row no-gutters :class="[editWork ? '' : 'my-4']">
                <v-col>
                  <label for="workLocation" class="font-weight-bold"
                    >Lokasi</label
                  >
                  <v-text-field
                    id="workLocation"
                    v-model="accountProfile.workLocation"
                    single-line
                    outlined
                    type="text"
                    class="mt-2"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <!-- end field work location -->

              <v-row no-gutters :class="[editWork ? '' : 'my-4']">
                <!-- field work start -->
                <v-col class="pr-2">
                  <label for="workStart" class="font-weight-bold"
                    >Tahun Mulai</label
                  >
                  <v-menu
                    ref="menuWorkStart"
                    v-model="menuWorkStart"
                    :close-on-content-click="false"
                    :return-value.sync="accountProfile.workStart"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        id="workStart"
                        v-model="accountProfile.workStart"
                        single-line
                        outlined
                        class="mt-2"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="accountProfile.workStart"
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
                          $refs.menuWorkStart.save(accountProfile.workStart)
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
                    :return-value.sync="accountProfile.workEnd"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        id="workEnd"
                        v-model="accountProfile.workEnd"
                        single-line
                        outlined
                        class="mt-2"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="accountProfile.workEnd"
                      type="month"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menuWorkEnd = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menuWorkEnd.save(accountProfile.workEnd)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <!-- end field work end -->
              </v-row>

              <!-- field work desc -->
              <v-row no-gutters :class="[editWork ? '' : 'my-4']">
                <v-col>
                  <label for="workDesc" class="font-weight-bold"
                    >Deskripsi</label
                  >
                  <v-textarea
                    id="workDesc"
                    v-model="accountProfile.workDesc"
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

              <v-row no-gutters class="mt-6">
                <v-col class="text-center">
                  <v-btn class="mr-4" @click="changeEditWork">Batal</v-btn>
                  <v-btn color="primary" class="ml-4">Simpan</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </section>
      </v-fade-transition>
    </v-sheet>
    <!-- end fieldset work exp -->
  </section>
</template>

<script>
export default {
  data: () => ({
    // edit form state
    editBasicInfo: false,
    editContact: false,
    editEducation: false,
    editWork: false,
    toggleEducation: false,
    toggleWork: false,
    imageUrl: '/placeholder-profile.svg',
    imageUploaded: '',
    file: [
      (value) =>
        !value ||
        value.size < 10000000 ||
        'Gambar yang di unggah melebihi 10 MB',
    ],
    menuBirthday: false,
    menuEducationStart: false,
    menuEducationEnd: false,
    menuWorkStart: false,
    menuWorkEnd: false,
    accountProfile: {
      file: undefined,
      fullname: 'Bang Rojak',
      birthday: '1999-05-05',
      telpNumber: '62881976251147',
      gender: 'laki_laki',
      email: 'email@domain.com',
      location: 'Bandung',
      address:
        'Cursus nec, egestas diam ipsum ipsum aliquam. Vel, ut lacus, dictum lorem cursus amet. Mauris, vel placerat aenean at in. Blandit laoreet tortor tortor, sed. Lectus quis nisi ornare vel in. Risus magna et ac habitant. ',
      educationName: 'Politeknik Negeri Bandung',
      educationDegree: 'Sarjana',
      educationStudy: 'Teknik Informatika',
      educationStart: '2020-07',
      educationEnd: '2020-07',
      workName: 'UI/UX Designer',
      workCompany: 'ChatAja Messenger',
      workLocation: 'Bandung',
      workStart: '2020-07',
      workEnd: '2020-07',
      workDesc:
        'Cursus nec, egestas diam ipsum ipsum aliquam. Vel, ut lacus, dictum lorem cursus amet. Mauris, vel placerat aenean at in. Blandit laoreet tortor tortor, sed. Lectus quis nisi ornare vel in. Risus magna et ac habitant. ',
    },
    // end edit form state
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
      this.accountProfile.file = file
      if (file) {
        reader.readAsDataURL(file)
      } else {
        this.imageUploaded = ''
      }
    },
    // basic info edit methods
    changeEditBasic() {
      this.editBasicInfo = !this.editBasicInfo
    },
    // basic info edit methods

    // contact edit methods
    changeEditContact() {
      this.editContact = !this.editContact
    },
    // contact edit methods

    // education edit methods
    changeEditEducation() {
      this.editEducation = !this.editEducation
    },
    // education edit methods

    // work exp edit methods
    changeEditWork() {
      this.editWork = !this.editWork
    },
    // work exp edit methods
  },
}
</script>

<style></style>
