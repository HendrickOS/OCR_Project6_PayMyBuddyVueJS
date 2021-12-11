<template>
  <div>
    <!-- Dialogue Add Contact -->
    <v-dialog
      v-model="addDialog"
      max-width="500px"
    >
      <v-card
        color="grey darken-3"
        dark
      >

        <v-card-text class="pa-5">

          <v-form
            ref="form"
          >
            <v-select
              v-model="selectedContactId"
              label="Contact"
              :items="users"
              item-text="username"
              item-value="id"
            ></v-select>

          </v-form>
              

        </v-card-text>

        <v-card-actions>

          <v-btn
            :disabled="!selectedContactId"
            color="success"
            class="mr-4"
            @click="addAction"
          >
            Add
          </v-btn>

          <v-btn
            color="blue darken-4"
            @click="addDialog = false"
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

  
    <v-card>
      <v-card-text>
        {{accounts}}
        <hr>
        test
        <hr>
        {{users}}
        <hr>
        <hr>
        {{selectedContactId}}
        <v-data-table
          :headers="headers"
          :items="accounts"
          :items-per-page="5"
          class="elevation-1"
        >

        <!-- Bouton delete contact dans la liste -->
          <template v-slot:item.remove="{ item }">
            <v-btn
              fab
              x-small
              color="error"
              @click="selectForDelete(item)"
            >
            <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        <!-- Fin Bouton delete contact dans la liste -->

        </v-data-table>
      </v-card-text>
    
    <!-- Bouton add contact -->
      <v-card-actions
        class="justify-end pr-5"
      >

      <template v-slot:item.userEntity="{ item }">
            {{ item.userEntity.username }}
          </template>

        <v-btn
          fab
          small
          color="blue accent-2"
          dark
          @click="addDialog = !addDialog"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-actions>
    <!-- Fin Bouton add contact -->

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

    this.$emit('pagetitle', "Add new contacts to your list")

    if (!this.token) {
      document.targetpage="accountpage";
      this.navigate("loginpage");
    }
    else{
      this.loadAccounts()
      this.loadUsers()
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
        .get("http://localhost:8080/users/contacts/list")
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

    loadUsers: function() {
      let self= this
      this.selectedContactId = null
       this.axios
        .get("http://localhost:8080/users/allusersbutme")
        .then(function(response) {
          console.log(response)
          self.users = response.data
          if(self.users.length > 0){
            self.selectedContactId = self.users[0].id
          }
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {

        });
    },

    addAction () {
      let self = this
      let user = {
        "id" : this.selectedContactId,
      }
      debugger
      this.axios
        .post("http://localhost:8080/users/contacts", user)
        .then(function(response) {
          console.log(response)
          self.accounts = response.data
          self.addDialog = false
          self.loadUsers()
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {

        });
    },

    /* addReset () {
      this.$refs.form.reset()
    }, */

    selectForDelete(item){
      this.selectIdForDelete = item.id
      this.deleteDialog = true
    },

    deleteAction () {
      let self = this
      this.axios
        .delete("http://localhost:8080/users/contacts/", {
          data: {
            "id": this.selectIdForDelete
          }
        })
        .then(function(response) {
          console.log(response)
          self.accounts = response.data
          self.loadUsers()
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

      users: [],

      selectedContactId: null,

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
            { text: 'Delete', value: 'remove' },
          ],

      addDialog: false,
      deleteDialog: false,

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

    };
  },  

};

</script>