<template>

  <v-card
    class="mx-auto overflow-hidden"
    height="800"
  >
    <v-app-bar
      color="deep-green" 
      dark  
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Pay My Buddy</v-toolbar-title>
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
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <v-btn color="primary" @click="goAccountpage">Account</v-btn>
            </v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="600"
    >

    <v-container fluid>
      <v-row justify="space-around">
        
        <v-data-table
          :headers="headers"
          :items="accounts"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>

    </v-row>
    </v-container>

  </v-sheet>

  </v-card>

</template>

<script>
import commonMixin from "../mixin/commonMixin"
export default {
  name: "Accountpage",
  mixins: [commonMixin],
  created: function() {
    
  },

  mounted: function() {

    if (!this.token) {
      document.targetpage="accountpage";
      /* document.targetpage="loginpage"; */
      this.navigate("loginpage");
    }
    else{
      this.loadAccounts()
    }

  },

  computed: {   

    token: function () {
      return document.token
    }

  },

  methods: {

    goHomepage: function() {
        this.navigate("homepage");
    },

    goAccountpage: function() {
        this.navigate("accountpage");
    },

    goLoginpage: function() {
        this.navigate("loginpage");
    },
    
    loadAccounts: function() {
      let self= this
       this.axios
        .get("http://localhost:8080/contacts/list")
        .then(function(response) {
          console.log(response)
          self.accounts = response.data
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {

        });
    },
  },

  data: () => ({

    drawer: false,
    group: null,

    accounts: [],

    headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Connections', value: 'connections' },
          { text: 'Description', value: 'description' },
          { text: 'Amount', value: 'amount' },
        ],
        /* desserts: [
          {"id":1,"connections":"Hendrick","description":"JAVA Developer","amount":50},
          {"id":101,"connections":"Hendrick","description":"JAVA Developer","amount":50},
          {"id":301,"connections":"Hendrick","description":"JAVA Developer","amount":50},
          {"id":401,"connections":"Hendrick","description":"JAVA Developer","amount":50},
          {"id":501,"connections":"Hendrick","description":"JAVA Developer","amount":50}
        ], */

    /* desserts: [
      for (account in accounts) : 
        {"id": account.id, "connections": account.connection, "description": account.description, "amount": account.amount}
    ], */

  }),

};
</script>

<style>

</style>
