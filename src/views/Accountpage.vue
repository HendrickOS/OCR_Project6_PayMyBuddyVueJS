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
          <v-text-field
            v-model="username"
            :counter="10"
            :rules="usernameRules"
            label="Username"
            required
          ></v-text-field>

          <v-text-field
            v-model="description"
            :counter="10"
            :rules="descriptionRules"
            label="Description"
            required
          ></v-text-field>

          <v-select
            v-model="solde"
            :items="soldes"
            label="Solde"
            required
            >
          </v-select>

          
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
          :items="accounts"
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
  name: "Accountpage",
  mixins: [commonMixin],
  created: function() {
    
  },

  mounted: function() {

    this.$emit('pagetitle', "Page account")

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

    goLoginpage: function() {
        this.navigate("loginpage");
    },

    goTransactionpage: function() {
      this.navigate("transactionpage");
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

    validate () {
      let self = this
      let contact = {
        "username" : this.username,
        "description" : this.description,
        "solde" : this.solde,
      }

      this.axios
        .post("http://localhost:8080/contacts/", contact)
        .then(function(response) {
          console.log(response)
          self.accounts = response.data
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

    /* close () {
      this.$refs.form.resetValidation()
    }, */
    
  },

  data () {

    return {

      accounts: [],

      headers: [
            {
              text: 'ID',
              align: 'start',
              sortable: false,
              value: 'id',
            },
            { text: 'Username', value: 'username' },
            { text: 'Description', value: 'description' },
            { text: 'Solde', value: 'solde' },
          ],

      dialog: false,

      valid: true,
      username: '',
      description: '',
      /* solde: 0, */
      soldes: [
        '5',
        '10',
        '15',
        '20',
      ],

      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 10) || 'Username must be less than 10 characters',
      ],
      descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length <= 10) || 'Description must be valid',
        /* v => /.+@.+\..+/.test(v) || 'Email must be valid', */
      ],
      /* select: null, */
      
    };
  },  

};

</script>

<style>

</style>
