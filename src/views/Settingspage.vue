<template>
  <div>
   <v-dialog
      v-model="editDialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Êtes-vous sûr ?
        </v-card-title>
        <v-card-text>
          Vos paramètres seront changés
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="editDialog = false"
          >
            Refuser
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="editAction"
          >
            Confirmer
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>

  <v-card>
    <v-card-title>
          <span class="text-h5">Hi {{username}}, you want to update your informations ?</span>
        </v-card-title>
  <v-form
    ref="form"
    v-model="valid"
  >
    <v-text-field
      v-model="updateUsername"
      :counter="10"
      label="Username"
    >aaaa</v-text-field>

    <v-text-field
      v-model="updateEmail"
      
      label="E-mail"
      
    ></v-text-field>

    <v-text-field
      v-model="updateDescription"
      label="Description"
      
    ></v-text-field>

    <v-text-field
      v-model="updatePassword"
      label="Password"
    ></v-text-field>

    <v-card-actions>
    <v-spacer></v-spacer>

    <v-btn
      color="warning"
      class="mr-4"
      @click="reset"
    >
      Reset Form
      <v-icon>mdi-cancel</v-icon>
    </v-btn>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="editDialog = !editDialog"
    >
      Validate
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    </v-card-actions>

  </v-form>
  </v-card>
  </div>
</template>

<script>
import commonMixin from "../mixin/commonMixin"
export default {
  name: "Settingspage",
  mixins: [commonMixin],
  created: function() {
    
  },

  mounted: function() {

    this.$emit('pagetitle', "Update your informations")

    if (!this.token) {
      document.targetpage="settingspage";
      this.navigate("loginpage");
    }
    else{
      this.loadUsername();
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

    loadUsername: function() {
      let self= this
       this.axios
        .get("http://localhost:8080/users/username")
        .then(function(response) {
          console.log(response)
          self.username = response.data
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {

        });
    },
    

    edit(item){
      this.updateId = item.id
      this.updateUsername = item.username
      this.updateEmail = item.email
      this.updateDescription = item.description
      this.password = item.password
    },

    editAction () {
      let self = this
      let user = {
        "id" : this.updateId,
        "username" : this.updateUsername,
        "email" : this.updateEmail,
        "description": this.updateDescription,
        "password" : this.updatePassword,
      }

      this.axios
        .put("http://localhost:8080/users/", user)
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

    reset () {
        this.$refs.form.reset()
      },

    
    
  },

  data () {

    return {

      valid: true,

      editDialog: false,

      username: '',

      updateId: '',
      updateUsername: '',
      updateEmail: '',
      updateDescription: '',
      updatePassword: '',
      
      
    };
  },  

};

</script>