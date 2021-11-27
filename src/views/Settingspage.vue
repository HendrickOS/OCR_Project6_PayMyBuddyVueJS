<template>
  <div>

    <v-row justify="center">
    
      <v-card>
        <v-card-title>
          <span class="text-h5">{{username}} Profile</span>
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
                  v-model="updateEmail"
                  label="E-mail"
                ></v-text-field>
              </v-col>

              
              <v-col
                cols="12"
                sm="6"
                md="5"
              >
                <v-text-field
                  v-model="updatePassword"
                  label="Password"
                ></v-text-field>
              </v-col>
              
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
        <v-spacer></v-spacer>
         
          <v-btn
            color="warning"
            class="mr-4"
            @click="reset"
          >
            Reset Form
          </v-btn>

          <v-btn
            color="success"
            @click="editAction"
          >
            <v-icon left>mdi-pencil</v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-row>
  
    
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
    

    edit(item){
      this.updateId = item.id
      this.updateUsername = item.username
      this.updateEmail = item.email
      this.password = item.password
    },

    editAction () {
      let self = this
      let user = {
        "id" : this.updateId,
        "username" : this.updateUsername,
        "email" : this.updateEmail,
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

      username: 'Nametest',
      updateId: '',
      updateUsername: '',
      updateEmail: '',
      updatePassword: '',
      
      
    };
  },  

};

</script>