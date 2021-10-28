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
            @click="validate"
          >
            Validate
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
  
    <v-card>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="transactions"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </v-card-text>

      <v-card-actions
        class="justify-end pr-5"
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
      this.loadTransactions()
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

    validate () {
      let self = this
      let transaction = {
        "montant" : this.montant,
        "contactEntity" : {"id" : this.contact}
      }

      this.axios
        .post("http://localhost:8080/transactions/transfert", transaction)
        .then(function(response) {
          console.log(response)
          /* self.accounts = response.data */
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

    /* close () {
      this.$refs.form.resetValidation()
    }, */
    
  },

  data () {

    return {

      contact: null,

      contacts: [{text:'contact1', value:'id1'}],

      transactions: [],

      headers: [
            {
              text: 'ID',
              align: 'start',
              sortable: false,
              value: 'id',
            },
            { text: 'Contact', value: 'contactEntity' },
            { text: 'Montant', value: 'montant' },
          ],

      dialog: false,

      valid: true,
      montant: 0,
      
      select: null,
      montants: [
        '5',
        '10',
        '15',
        '20',
      ],
      
    };
  },  

};

</script>

<style>

</style>
