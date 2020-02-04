<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="!loading">
          <v-img
            height="300px"
            :src="ad.imageSrc"
          ></v-img>
          <v-card-text>
            <h2 class="text--primary">{{ad.title}}</h2>
            <p>{{ad.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <editAdModal :ad="ad" v-if="isOwner"></editAdModal>
            <app-buy-modal :ad="ad"></app-buy-modal>
          </v-card-actions>
        </v-card>
        <div v-else class="text-center">
          <v-progress-circular
            :size="70"
            :width="5"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import editAdModal from './EditAdModal'
import {mapGetters} from 'vuex';
export default {
  props: ['id'],
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    loading () {
      return this.$store.getters.loading
    },
    ...mapGetters({
        user: 'user'
    }),
    isOwner () {
      if (this.user === null ){
        return false
      }
      else if(this.ad.ownerId === this.user.id) {
        return true
      }
      else return false
    }
  },
  watch: {
    user: {
        deep: true,
        immediate: true,
        handler(nVal, oVal) {
            console.log("user", nVal, oVal);
            return nVal
        }
    },
},
  components: {
    editAdModal
  }
}
</script>
