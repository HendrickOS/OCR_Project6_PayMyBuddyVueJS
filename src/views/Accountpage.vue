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
            v-model="amount"
            :items="amounts"
            :rules="[v => !!v || 'Amount is required']"
            label="Amount"
            required
          ></v-select>

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
        </v-form>

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

    goAddContactpage: function() {
      this.navigate("addcontactpage");
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
      let user = {
        "username" : this.username,
        "description" : this.description,
        "amount" : this.amount
      }

      this.axios
        .post("http://localhost:8080/contacts/", user)
        .then(function(response) {
          console.log(response)
          /* self.newContact = response.data; */
          self.accoutns = response.data;
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
            { text: 'Amount', value: 'amount' },
          ],

      dialog: false,

      newContact: [],
      valid: true,
      username: '',
      description: '',
      amount: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 10) || 'Username must be less than 10 characters',
      ],
      descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length <= 10) || 'Description must be valid',
        /* v => /.+@.+\..+/.test(v) || 'Email must be valid', */
      ],
      select: null,
      amounts: [
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
