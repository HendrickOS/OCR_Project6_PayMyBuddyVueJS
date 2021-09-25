<template>
    <v-app class="white">
      <v-content class="ma-3">
        <router-view></router-view>
      </v-content>
    </v-app>
</template>

<script>
import commonMixin from "./mixin/commonMixin"

export default {
  name: "App",
  mixins: [commonMixin],
  data: () => ({
  }),

  watch: {
    
  },

  created: function() {
    
  },

  props: {
    
  },

  mounted: function() {
   
  },

  computed: {
   
  },

  methods: {

  }

};
</script>

<style>


</style>
