<template>
  <section>
    <!-- headline -->
    <v-row class="headline-background" no-gutters>
      <v-col class="py-3">
        <v-container>
          <h2 class="font-weight-bold headline">Profil</h2>
        </v-container>
      </v-col>
    </v-row>
    <!-- end headline -->

    <v-row justify="center" class="my-6" no-gutters>
      <v-col cols="12" sm="10" md="8">
        <v-tabs v-model="tab" background-color="#e5e5e5" show-arrows>
          <v-tab href="#personal_info"> Informasi Pribadi </v-tab>
          <v-tab href="#my_cv"> CV Saya </v-tab>
          <v-tab href="#saved_jobs"> Pekerjaan Disimpan </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <!-- tab personal info -->
          <v-scroll-x-transition mode="in-out" hide-on-leave>
            <v-tab-item v-if="tab === 'personal_info'" id="personal_info">
              <!-- fieldset contact -->
              <v-sheet color="white" elevation="1" rounded class="pa-4 my-6">
                <v-row no-gutters align="center">
                  <v-col>
                    <h2 class="title font-weight-bold">Kontak</h2>
                  </v-col>
                  <v-col v-if="!editContact" class="text-right">
                    <v-tooltip top color="primary" close-delay="250">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          @click="changeEditContact"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Edit</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
                <hr class="grey lighten-5 my-4" />
                <!-- field telp number -->
                <v-row no-gutters :class="[editContact ? '' : 'my-4']">
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
                <v-row no-gutters :class="[editContact ? '' : 'my-4']">
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
                <v-row no-gutters :class="[editContact ? '' : 'my-4']">
                  <v-col>
                    <label for="location" class="font-weight-bold"
                      >Lokasi</label
                    >
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
                <v-row no-gutters :class="[editContact ? '' : 'my-4']">
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

                <v-row v-if="editContact" no-gutters class="mt-6">
                  <v-col class="text-center">
                    <v-btn class="mr-4" @click="changeEditContact">Batal</v-btn>
                    <v-btn color="primary" class="ml-4">Simpan</v-btn>
                  </v-col>
                </v-row>
              </v-sheet>
              <!-- end fieldset contact -->

              <!-- fieldset education -->
              <v-sheet color="white" elevation="1" rounded class="pa-4 my-6">
                <v-row no-gutters align="center">
                  <v-col>
                    <h2 class="title font-weight-bold">Tingkat Pendidikan</h2>
                  </v-col>
                  <v-col v-if="!editEducation" class="text-right">
                    <v-tooltip top color="primary" close-delay="250">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          @click="changeEditEducation"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Edit</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
                <hr class="grey lighten-5 my-4" />
                <v-btn
                  text
                  color="primary"
                  @click="toggleEducation = !toggleEducation"
                >
                  <v-icon left>mdi-plus-thick</v-icon>
                  Tambahkan Pendidikan
                </v-btn>

                <v-expand-transition>
                  <v-row class="mx-0 mt-4 img-border rounded">
                    <v-col class="pa-4">
                      <!-- field education name -->
                      <v-row no-gutters :class="[editContact ? '' : 'my-4']">
                        <v-col>
                          <label for="educationName" class="font-weight-bold"
                            >Nama Instansi</label
                          >
                          <v-text-field
                            id="educationName"
                            v-model="accountProfile.educationName"
                            single-line
                            :outlined="editEducation"
                            :solo="!editEducation"
                            :flat="!editEducation"
                            :readonly="!editEducation"
                            type="text"
                            class="mt-2"
                            :hide-details="!editEducation"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <!-- end field education name -->

                      <v-row no-gutters :class="[editContact ? '' : 'my-4']">
                        <!-- field degree -->
                        <v-col class="pr-2">
                          <label for="educationDegree" class="font-weight-bold"
                            >Tingkatan Pendidikan</label
                          >
                          <v-text-field
                            id="educationDegree"
                            v-model="accountProfile.educationDegree"
                            single-line
                            :outlined="editEducation"
                            :solo="!editEducation"
                            :flat="!editEducation"
                            :readonly="!editEducation"
                            type="text"
                            class="mt-2"
                            :hide-details="!editEducation"
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
                            :outlined="editEducation"
                            :solo="!editEducation"
                            :flat="!editEducation"
                            :readonly="!editEducation"
                            type="text"
                            class="mt-2"
                            :hide-details="!editEducation"
                          >
                          </v-text-field>
                        </v-col>
                        <!-- end field of study -->
                      </v-row>

                      <v-row no-gutters :class="[editContact ? '' : 'my-4']">
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
                                :outlined="editEducation"
                                :solo="!editEducation"
                                :flat="!editEducation"
                                class="mt-2"
                                :hide-details="!editEducation"
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
                          <label for="work_end" class="font-weight-bold"
                            >Tahun Berakhir</label
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
                                :outlined="editEducation"
                                :solo="!editEducation"
                                :flat="!editEducation"
                                class="mt-2"
                                :hide-details="!editEducation"
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

                      <v-row v-if="editEducation" no-gutters class="mt-6">
                        <v-col class="text-center">
                          <v-btn class="mr-4" @click="changeEditEducation"
                            >Batal</v-btn
                          >
                          <v-btn color="primary" class="ml-4">Simpan</v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-expand-transition>
              </v-sheet>
              <!-- end fieldset education -->

              <!-- fieldset education -->
              <v-sheet color="white" elevation="1" rounded class="pa-4 my-6">
                <v-row no-gutters align="center">
                  <v-col>
                    <h2 class="title font-weight-bold">Pengalaman Kerja</h2>
                  </v-col>
                  <v-col v-if="!editEducation" class="text-right">
                    <v-tooltip top color="primary" close-delay="250">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          @click="changeEditWork"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Edit</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
                <hr class="grey lighten-5 my-4" />
                <v-btn text color="primary" @click="toggleWork = !toggleWork">
                  <v-icon left>mdi-plus-thick</v-icon>
                  Tambahkan Pengalaman Kerja
                </v-btn>

                <v-expand-transition>
                  <v-row class="mx-0 mt-4 img-border rounded">
                    <v-col class="pa-4">
                      <!-- field work name -->
                      <v-row no-gutters :class="[editWork ? '' : 'my-4']">
                        <v-col>
                          <label for="workName" class="font-weight-bold"
                            >Nama Instansi</label
                          >
                          <v-text-field
                            id="workName"
                            v-model="accountProfile.workName"
                            single-line
                            :outlined="editWork"
                            :solo="!editWork"
                            :flat="!editWork"
                            :readonly="!editWork"
                            type="text"
                            class="mt-2"
                            :hide-details="!editWork"
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
                            :outlined="editWork"
                            :solo="!editWork"
                            :flat="!editWork"
                            :readonly="!editWork"
                            type="text"
                            class="mt-2"
                            :hide-details="!editWork"
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
                            :outlined="editWork"
                            :solo="!editWork"
                            :flat="!editWork"
                            :readonly="!editWork"
                            type="text"
                            class="mt-2"
                            :hide-details="!editWork"
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
                                :outlined="editWork"
                                :solo="!editWork"
                                :flat="!editWork"
                                class="mt-2"
                                :hide-details="!editWork"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-if="editWork"
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
                                  $refs.menuWorkStart.save(
                                    accountProfile.workStart
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
                                :outlined="editWork"
                                :solo="!editWork"
                                :flat="!editWork"
                                class="mt-2"
                                :hide-details="!editWork"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-if="editWork"
                              v-model="accountProfile.workEnd"
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
                                  $refs.menuWorkEnd.save(accountProfile.workEnd)
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
                      <v-row no-gutters :class="[editWork ? '' : 'my-4']">
                        <v-col>
                          <label for="workDesc" class="font-weight-bold"
                            >Alamat</label
                          >
                          <v-textarea
                            id="workDesc"
                            v-model="accountProfile.workDesc"
                            :outlined="editWork"
                            :solo="!editWork"
                            :flat="!editWork"
                            :readonly="!editWork"
                            :clearable="editWork"
                            clear-icon="mdi-close-circle"
                            auto-grow
                            value=""
                            class="mt-2"
                            :hide-details="!editWork"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                      <!-- end field work desc -->

                      <v-row v-if="editWork" no-gutters class="mt-6">
                        <v-col class="text-center">
                          <v-btn class="mr-4" @click="changeEditWork"
                            >Batal</v-btn
                          >
                          <v-btn color="primary" class="ml-4">Simpan</v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-expand-transition>
              </v-sheet>
              <!-- end fieldset education -->
            </v-tab-item>
          </v-scroll-x-transition>
          <!-- end tab personal info -->

          <!-- tab my cv -->
          <v-scroll-x-transition mode="in-out" hide-on-leave>
            <v-tab-item v-if="tab === 'my_cv'" id="my_cv">
              <v-fade-transition mode="in-out" hide-on-leave>
                <v-sheet
                  v-if="isCV"
                  color="white"
                  elevation="1"
                  rounded
                  class="pa-4 my-6"
                >
                  <v-row no-gutters>
                    <v-col cols="6" sm="auto" class="mr-sm-4">
                      <div class="rounded pa-4 grey lighten-4 d-inline-block">
                        <v-img
                          src="/pdf-icon.png"
                          lazy-src="/pdf-icon.png"
                          width="60"
                          height="60"
                          contain
                        ></v-img>
                      </div>
                    </v-col>
                    <v-col order="last" class="mt-4 mt-sm-0">
                      <h4 class="headline font-weight-bold">CV.PDF</h4>
                      <p class="text--secondary font-weight-bold">17 MB</p>
                      <a
                        href="/cv-example.jpg"
                        download
                        class="font-weight-bold mr-4"
                      >
                        Unduh
                      </a>
                      <a
                        href="/cv-example.jpg"
                        target="blank"
                        class="font-weight-bold"
                        >Lihat</a
                      >
                    </v-col>
                    <v-col
                      cols="6"
                      sm="auto"
                      order-sm="last"
                      class="text-right text-sm-left"
                    >
                      <v-tooltip top color="error" close-delay="250">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                            @click="toggleCV"
                          >
                            <v-icon>mdi-trash-can</v-icon>
                          </v-btn>
                        </template>
                        <span>Hapus</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </v-sheet>
              </v-fade-transition>

              <v-fade-transition mode="in-out" hide-on-leave>
                <v-sheet
                  v-if="!isCV"
                  color="white"
                  elevation="1"
                  rounded
                  class="pa-4 my-6"
                >
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
                            Anda hanya bisa mengupload file pdf, png, jpeg
                            dengan Maks 10mb
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
              </v-fade-transition>
            </v-tab-item>
          </v-scroll-x-transition>
          <!-- end tab my cv -->

          <!-- tab saved jobs -->
          <v-scroll-x-transition mode="in-out" hide-on-leave>
            <v-tab-item v-if="tab === 'saved_jobs'" id="saved_jobs">
              <SavedJobs />
            </v-tab-item>
          </v-scroll-x-transition>
          <!-- end tab saved jobs -->
        </v-tabs-items>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import SavedJobs from '@/components/base/SavedJobs'

export default {
  components: {
    SavedJobs,
  },
  data() {
    return {
      tab: '',
      // edit form state
      editContact: false,
      editEducation: false,
      editWork: false,
      toggleEducation: false,
      toggleWork: false,
      menuEducationStart: false,
      menuEducationEnd: false,
      menuWorkStart: false,
      menuWorkEnd: false,
      accountProfile: {
        telpNumber: '62881976251147',
        email: 'email@domain.com',
        location: 'Bandung',
        address:
          'Cursus nec, egestas diam ipsum ipsum aliquam. Vel, ut lacus, dictum lorem cursus amet. Mauris, vel placerat aenean at in. Blandit laoreet tortor tortor, sed. Lectus quis nisi ornare vel in. Risus magna et ac habitant. ',
        educationName: 'Politeknik Negeri Bandung',
        educationDegree: 'Teknik Informatika dan Komputer',
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

      // cv edit state
      isCV: true,
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
      // end cv edit state
    }
  },
  methods: {
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

    // cv edit methods
    toggleCV() {
      this.isCV = !this.isCV
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
    // end cv edit methods
  },
}
</script>

<style scoped>
.theme--light.v-tabs-items {
  background-color: #e5e5e5 !important;
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
