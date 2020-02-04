<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="ad in promoAds"
              :key="ad.id"
              :src="ad.imageSrc"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <div class="ad-link">
                <v-btn class="error" :to="'/ad/' + ad.id">{{ad.title}}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex
          xs12
          sm6
          md4
          v-for="ad of ads" :key="ad.id"
        >
          <v-card
            class="mx-auto"
            max-width="344"
          >
            <v-img
              :src="ad.imageSrc"
              height="200px"
            ></v-img>

            <v-card-title>
              {{ad.title}}
            </v-card-title>

            <v-card-subtitle>
             {{ad.description.length > 100 ? ad.description.slice(0, 100) + '...' : ad.description}}
            </v-card-subtitle>

            <v-card-actions>
              <v-spacer />
              <v-btn text :to="'/ad/' + ad.id">Open</v-btn>
              <app-buy-modal :ad="ad"></app-buy-modal>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 class="text-xs-center text-center pt-8">
          <v-progress-circular
            :size="70"
            :width="5"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  computed: {
    promoAds () {
      return this.$store.getters.promoAds
    },
    ads () {
      return this.$store.getters.ads
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
<style scoped lang="scss">
  .ad-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0,0,0,.3);
    padding: 5px 15px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    transform: translate(-50%, 0)
  }
  .v-card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .v-card__subtitle {
    flex-grow: 1;
  }
  .v-image {
    flex-shrink: 0;
  }
</style>
