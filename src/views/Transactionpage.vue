<template>
  <div>
    <!-- Dialogue Transfert à un contact -->
    <v-dialog
      v-model="paymentDialog"
      max-width="500px"
    >
      <v-card
        color="grey darken-3"
        dark
      >
        <v-card-text class="pa-5">

          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-select
              v-model="user"
              label="User"
              :items="users"
              item-text="username"
              item-value="id"  
            ></v-select>

            <v-select
              v-model="montant"
              :items="montants"
              :rules="[v => !!v || 'Amount is required']"
              label="Montant"
              required
            ></v-select>

            <small>*Tax : 0,5%</small>
            <p><strong>Montant TTC : {{montantTTC}}</strong></p>
            

          </v-form>

        </v-card-text>

        <v-card-actions>

        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="paymentAction"
          >
            Valider
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
            @click="reset"
          >
            Reset Form
          </v-btn>

          <v-btn
            color="blue darken-4"
            @click="paymentDialog = false"
          >
            Close
          </v-btn>

          </v-card-actions>

      </v-card>
    </v-dialog>
    <!-- Fin Dialogue Transfert à un contact -->


    <!-- Dialogue Réapprovisionner porte-monnaie -->
    <v-dialog
      v-model="supplyDialog"
      max-width="500px"
    >
    <v-card
        color="grey darken-3"
        dark
    >

    <v-card-text class="pa-5">
        <v-form
          ref="form"
          v-model="confirm"
          lazy-validation
        >
          <v-text-field
            v-model="crediterCompte"
            label="Montant à créditer"
          ></v-text-field>
          </v-form>
          </v-card-text>

          <v-card-actions>

          <v-btn
            :disabled="!confirm"
            color="success"
            class="mr-4"
            @click="crediter"
          >
            Crediter
          </v-btn>

          <v-btn
            color="blue darken-4"
            @click="supplyDialog = false"
          >
            Close
          </v-btn>
          </v-card-actions>

      </v-card>
    </v-dialog>
    <!-- Fin Dialogue Réapprovisionner porte-monnaie -->

   
  
    <v-card>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="transactions"
          :items-per-page="5"
          class="elevation-1"
        >
          
          <template v-slot:item.userEntity="{ item }">
            {{ item.userEntity.username }}
          </template>

        </v-data-table>
      </v-card-text>

      <v-card-actions>

      <div
        class="justify-start pr-5"
      >
          
        Solde : {{solde}} €
        
          <v-btn
          fab
          small
          color="green accent-4"
          dark
          @click="supplyDialog = !supplyDialog"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
    
      <div
      >
        <v-btn
          fab
          small
          color="blue accent-2"
          dark
          @click="paymentDialog = !paymentDialog"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>

      </v-card-actions>


      

      <v-container fluid>
        <v-row justify="space-around">
        </v-row>
      </v-container>

    </v-card>
  </div>
</template>

<script>
import commonMixin from "../mixin/commonMixin"
export default {
  name: "Transactionpage",
  mixins: [commonMixin],
  created: function() {
    
  },

  mounted: function() {

    this.$emit('pagetitle', "Check your pay & Send money")

    if (!this.token) {
      document.targetpage="transactionpage";
      this.navigate("loginpage");
    }
    else{
      this.loadTransactions();
      this.loadContacts();
      this.loadSolde();
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

    goTransactionpage: function() {
      this.navigate("transactionpage");
    },
    
    loadTransactions: function() {
      let self= this
       this.axios
        .get("http://localhost:8080/transactions/list")
        .then(function(response) {
          console.log(response)
          self.transactions = response.data
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {

        });
    },

    loadContacts: function() {
      let self= this
       this.axios
        .get("http://localhost:8080/users/contacts/list")
        .then(function(response) {
          console.log(response)
          self.users = response.data
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {

        });
    },

     loadSolde: function() {
      let self= this
       this.axios
        .get("http://localhost:8080/users/solde")
        .then(function(response) {
          console.log(response)
          self.solde = response.data
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {

        });
    },

    paymentAction () {
      let self = this
      let transaction = {
        "montant" : this.montant,
        "userEntity" : {"id" : this.user},
      }

      this.axios
        .post("http://localhost:8080/transactions/transfert", transaction)
        .then(function(response) {
          console.log(response)
          self.dialog = false
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {

        });
    },

    reset () {
      this.$refs.form.reset()
    },


    crediter () {
      let self = this
      let approvisionner = {
        "montant" : this.crediterCompte,
      }

      this.axios
        .post("http://localhost:8080/users/supplying", approvisionner)
        .then(function(response) {
          console.log(response)
          self.supplyDialog = false
          
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {

        });
    },
    
  },

  data () {

    return {
      transactions: [],

      user: null,
      users: [],

      headers: [
            {
              text: 'ID',
              align: 'start',
              sortable: false,
              value: 'id',
            },
            { text: 'Contact', value: 'userEntity' },
            { text: 'Montant', value: 'montant' },
          ],

      paymentDialog: false,
      supplyDialog: false,
      crediterCompte: 0,

      valid: true,

      montant: 0,
      confirm: true,
      
      select: null,
      montants: [
        '5',
        '10',
        '15',
        '20',
      ],
      
      montantTTC: this.montant * 1.005 ,

      solde: 0,
      
    };
  },  

};

</script>

<style>

</style>
