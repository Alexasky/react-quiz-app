<template>
  <v-container>
    <v-layout row v-if="!loading && myAds.length !== 0">
      <v-flex xs12 sm8 md6 offset-sm-2 offset-md-3>
        <h1 class="text--secondary mb-3"> My ads</h1>
        <v-card
          class="elevation-10 mb-3"
          v-for="ad of myAds"
          :key="ad.id"
        >
          <v-layout row>
            <v-flex class="card-image" xs12 sm4>
              <v-img
                 height="160px"
                :src="ad.imageSrc"
              ></v-img>
            </v-flex>
            <v-flex class="card-info" xs12 sm8>
              <v-card-text>
                <h2 class="text--primary">{{ad.title}}</h2>
                <p>{{ad.description.length > 100 ? ad.description.slice(0, 100) + '...' : ad.description}}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                  class="info"
                  :to="'/ad/' + ad.id"
                >Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else-if="!loading && myAds.length == 0">
      <v-flex xs12 class="text-center">
        <h1 class="text--primary">You have no ads</h1>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex xs12 class="text-center">
        <v-progress-circular
          :size="70"
          :width="5"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    myAds () {
      return this.$store.getters.myAds
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
<style scoped>
  .layout {
    margin: 0;
  }
  .card-info,
  .card-image {
    display: flex;
    flex-direction: column;
  }
  .v-card__text {
    flex-grow: 1;
  }
  .v-card__actions {
    padding: 16px;
    padding-top: 0;
  }
  p {
    margin-bottom: 0;
  }
</style>
