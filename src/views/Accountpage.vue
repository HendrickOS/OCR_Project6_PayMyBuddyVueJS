<template>

  <div>
    <!-- Comptes {{ token }} -->

    <v-data-table
    :headers="headers"
    :items="accounts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>

  <!-- {{accounts}} -->

  </div>



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
