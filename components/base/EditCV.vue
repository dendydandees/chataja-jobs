<template>
  <section>
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
            <h4 class="title font-weight-bold">CV.PDF</h4>
            <p class="text--secondary font-weight-bold">17 MB</p>
            <a href="/cv-example.jpg" download class="font-weight-bold mr-4">
              Unduh
            </a>
            <a href="/cv-example.jpg" target="blank" class="font-weight-bold"
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
                <v-btn icon v-bind="attrs" v-on="on" @click="toggleCV">
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
                  atau <span class="blue--text">telusuri</span> untuk memilih
                  file
                </p>
                <span class="subtitle-2">
                  Anda hanya bisa mengupload file pdf, png, jpeg dengan Maks
                  10mb
                </span>
              </div>
            </dropzone>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-10 text-center">
          <v-col>
            <v-btn color="primary" :loading="loading" :disabled="disabled">
              Kirim
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-fade-transition>
  </section>
</template>

<script>
export default {
  data: () => ({
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
  }),
  methods: {
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
  },
}
</script>

<style scoped>
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
