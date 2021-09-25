<template>

  <div>
    Comptes {{ token }}

    <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>

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
    
  },

  data: () => ({

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
        desserts: [
          {"id":1,"connections":"Hendrick","description":"JAVA Developer","amount":50},
          {"id":101,"connections":"Hendrick","description":"JAVA Developer","amount":50},
          {"id":301,"connections":"Hendrick","description":"JAVA Developer","amount":50},
          {"id":401,"connections":"Hendrick","description":"JAVA Developer","amount":50},
          {"id":501,"connections":"Hendrick","description":"JAVA Developer","amount":50}
        ],

  }),

};
</script>

<style>

</style>
