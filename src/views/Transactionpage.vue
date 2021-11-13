<template>
  <div>

    <v-dialog
      v-model="dialog"
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
              v-model="contact"
              label="Contact"
              :items="contacts"
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

          </v-form>

        </v-card-text>

        <v-card-actions>

        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="transferer"
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
            @click="dialog = false"
          >
            Close
          </v-btn>

          </v-card-actions>

      </v-card>
    </v-dialog>



    <v-dialog
      v-model="supply"
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
            @click="supply = false"
          >
            Close
          </v-btn>
          </v-card-actions>

      </v-card>
    </v-dialog>

   



   

  
    <v-card>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="transactions"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.contactEntity="{ item }">
            {{ item.contactEntity.username }}
          <!-- <template v-slot:item.userEntity="{ item }">
            {{ item.userEntity.username }} -->
          </template>
          
        </v-data-table>
      </v-card-text>

      <v-card-actions
      >


      <div
        class="justify-start pr-5"
      >
          
        Solde : {{solde}} €
        <!-- <v-text-field
            label="Solde actuel"
            placeholder="Dense & Rounded"
            filled
            rounded
            dense
          ></v-text-field> -->
          <v-btn
          fab
          small
          color="green accent-4"
          dark
          @click="supply = !supply"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
    
      <div
      >
        <v-btn
          fab
          small
          color="red accent-2"
          dark
          @click="dialog = !dialog"
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

    this.$emit('pagetitle', "Page transaction")

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
      this.navigate("transactioncontactpage");
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
        .get("http://localhost:8080/contacts/list")
        /* .get("http://localhost:8080/users/contacts/list") */
        .then(function(response) {
          console.log(response)
          self.contacts = response.data
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
        /* .get("http://localhost:8080/users/contacts/list") */
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

    transferer () {
      let self = this
      let transaction = {
        "montant" : this.montant,
        "contactEntity" : {"id" : this.contact},
        /* "userEntity" : {"id" : this.contact}, */
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

    trace(transaction){
      console.log(transaction)
    },


    crediter () {
      /* solde = this.solde + crediterCompte ; */
      let self = this
      let approvisionner = {
        "montant" : this.crediterCompte,
      }

      this.axios
        .post("http://localhost:8080/transaction/supplying", approvisionner)
        .then(function(response) {
          console.log(response)
          self.supply = false
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

      contact: null,

      contacts: [],

      transactions: [],

      headers: [
            {
              text: 'ID',
              align: 'start',
              sortable: false,
              value: 'id',
            },
            { text: 'Contact', value: 'contactEntity' },
            /* { text: 'Contact', value: 'userEntity' }, */
            { text: 'Montant', value: 'montant' },
            { text: 'Actions', value: 'actions' },
          ],

      dialog: false,
      supply: false,

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

      solde: 0,
      
    };
  },  

};

</script>

<style>

</style>
