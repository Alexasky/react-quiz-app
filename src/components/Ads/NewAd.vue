<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm-3>
        <h1 class="text--secondary mb-3">Create new Ad</h1>
        <v-form
        class="mb-3"
          ref="form"
          v-model="valid"
          validation
        >
          <v-text-field
            label="Ad title"
            name="title"
            type="text"
            v-model="title"
            required
            :rules="[v => !!v || 'Title is required']"
            validate-on-blur
          />

          <v-textarea
            label="Ad description"
            name="description"
            type="text"
            v-model="description"
            required
            :rules="[v => !!v || 'Description is required']"
            validate-on-blur
          />
        </v-form>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-btn
              class="ma-2 white--text warning"
              @click="triggerUpload"
            >
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              style="display: none;" accept="image/*"
              @change="onFileChange"
            >
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img
              v-if="imageSrc"
              :src="imageSrc"
              alt=""
              height="100"
            >
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-switch
            color="primary"
              v-model="promo"
              label="Add to promo?"
            ></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-spacer />
            <v-btn
              class="primary"
              @click="createAd"
              :loading="loading"
              :disabled="!valid || !image || loading"
            >
              Create ad
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if(this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        }
        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          // if error, it visible without reload on new page
          .catch(() => {})
      }
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]

      const reader = new FileReader()
      reader.onload = () => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }
}
</script>
