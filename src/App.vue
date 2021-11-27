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
      
      <v-spacer></v-spacer>
      
      <!-- 
      <div class="my-2">
        <v-btn
          color="primary"
          fab
          dark
          x-small
          @click="userDialog = !userDialog"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </div>
      -->

      <div class="text-center">
    <v-menu transition="scale-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          dark
          color="primary"
          v-bind="attrs"
          v-on="on"
          x-small
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list
        nav
        dense
      >
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            
          >
            {{username}}
          
            <v-divider></v-divider>

            <v-list-item-icon>
              <v-icon color="success">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="goLoginpage">Log In</v-list-item-title>
            </v-list-item-content>

            <v-divider></v-divider>

            <v-list-item-icon>
              <v-icon color="purple">mdi-wrench</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="goSettingspage">Settings</v-list-item-title>
            </v-list-item-content>

            <v-divider></v-divider>

            <v-list-item-icon>
              <v-icon color="error">mdi-cancel</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="goLoginpage">Log Out</v-list-item-title>
            </v-list-item-content>


          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-menu>
  </div>
      
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

    goSettingspage: function(){
      this.navigate("settingspage");
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
      userDialog: false,

      username:'',

    };
  },

};

</script>

<style>


</style>
