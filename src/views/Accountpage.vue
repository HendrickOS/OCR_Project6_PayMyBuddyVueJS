<template>
  <div>
    <!-- Dialogue Add Contact -->
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
    <!-- Fin Dialogue Add Contact -->

    
    <!-- Dialogue Delete -->
    <v-row justify="center">
    <v-dialog
      v-model="deleteDialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Êtes-vous sûr ?
        </v-card-title>
        <v-card-text>
          Ce contact sera définitivement supprimé
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="deleteDialog = false"
          >
            Refuser
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteAction"
          >
            Confirmer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
    <!-- Fin Dialogue Delete -->

    <!-- Dialogue Update -->
    <v-row justify="center">
    <v-dialog
      v-model="editDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="updateUsername"
                  label="Username"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="updateDescription"
                  label="Description"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  v-model="updateSolde"
                  :items="soldes"
                  label="Solde"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="editDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="editAction"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
    <!-- Fin Dialogue Update -->
  
    <v-card>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="accounts"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.remove="{ item }">
            <v-btn
              fab
              x-small
              color="error"
              @click="selectForDelete(item)"
            >
            <v-icon>mdi-minus</v-icon>
            </v-btn>
          </template>

          <template v-slot:item.edit="{ item }">
            <v-btn
              fab
              x-small
              color="success"
              @click="edit(item)"
            >
            <v-icon>mdi-cached</v-icon>
            </v-btn>
          </template>
        
        </v-data-table>
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
/* import mdiDelete from '@mdi/js' */
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
        /* .get("http://localhost:8080/users/contacts/list") */
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
      /* let user = {
        "id" : this.id,
        "username" : this.username,
        "email" : this.email,
        "solde" : this.solde,
      } */

      this.axios
        .post("http://localhost:8080/contacts/", contact)
        /* .post("http://localhost:8080/users/contacts", user) */
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

    edit(item){
      this.updateId = item.id
      this.updateUsername = item.username
      this.updateDescription = item.description
      this.editDialog = true
    },

    /* edit(item){
      this.updateId = item.id
      this.updateUsername = item.username
      this.updateEmail = item.email
      this.password = item.password
      this.editDialog = true
    }, */

    editAction () {
      let self = this
      let contact = {
        "id" : this.updateId,
        "username" : this.updateUsername,
        "description" : this.updateDescription,
        "solde" : this.updateSolde,
      }
      /* let user = {
        "id" : this.updateId,
        "username" : this.updateUsername,
        "email" : this.updateEmail,
        "password" : this.updatePassword,
        "solde" : this.updateSolde,
      } */

      this.axios
        .put("http://localhost:8080/contacts/", contact)
        /* .put("http://localhost:8080/users/", user) */
        .then(function(response) {
          console.log(response)
          self.accounts = response.data
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {
          self.editDialog = false
        });
    },

    selectForDelete(item){
      this.selectIdForDelete = item.id
      this.deleteDialog = true
    },

    deleteAction () {
      let self = this
      this.axios
        .delete("http://localhost:8080/contacts/", {
          data: {
            "id": this.selectIdForDelete
          }
        })
        .then(function(response) {
          console.log(response)
          self.accounts = response.data
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {
          self.deleteDialog = false
        });
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
            { text: 'Update', value: 'edit' },
            { text: 'Delete', value: 'remove' },
          ],

      dialog: false,
      deleteDialog: false,
      editDialog: false,

      selectIdForDelete: null,

      valid: true,
      username: '',
      description: '',
      soldes: [
        '5',
        '10',
        '15',
        '20',
      ],

      updateUsername: '',
      updateDescription:'',
      updateId:'',
      
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
