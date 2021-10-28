<template>
    <v-app class="white">

      <v-app-bar
      color="deep-purple" 
      dark  
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Pay My Buddy</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{pagetitle}}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <v-btn color="primary" @click="goHomepage">Home</v-btn>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <v-btn color="primary" @click="goLoginpage">Login</v-btn>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <v-btn color="primary" @click="goAccountpage">Account</v-btn>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <v-btn color="primary" @click="goTransactionpage">Transaction</v-btn>
            </v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    
      <v-main class="ma-3">

        <router-view @pagetitle='updatetitle'></router-view>
      </v-main>
    </v-app>
</template>

<script>
import commonMixin from "./mixin/commonMixin"

export default {
  name: "App",
  mixins: [commonMixin],

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

  methods : {

     goHomepage: function() {
        this.navigate("homepage");
    },

    goAccountpage: function() {
        this.navigate("accountpage");
    },

    goLoginpage: function() {
        this.navigate("loginpage");
    },

    goTransactionpage: function() {
      this.navigate("transactionpage");
    },

    updatetitle: function(title){
      this.pagetitle = title
    }

  },


  data () {

    return{

      drawer: false,
      group: null,
      pagetitle: '',

      dialog : false,
    
    };
  },

};

</script>

<style>


</style>
