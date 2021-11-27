<template>

  <div
    class="mx-auto overflow-hidden"
    height="600"
  >

    <v-container fluid>
      <v-row justify="space-around">
        
        <v-card
          elevation="4"
          class="mx-auto my-12"
          max-width="374"
        >
        <v-card-title>Login</v-card-title>
          <v-card-text>

            <form>

              <v-text-field
                v-model="username"
                label="Username"
                required
              ></v-text-field>

              <v-text-field
                  v-model="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  hint="At least 8 characters"
                  counter
                  @click:append="showPassword = !showPassword"
                >
              ></v-text-field>
              
              <v-btn class="mr-4" :disabled="!validatedFields" @click="submit"> connection </v-btn>
              <p class="pt-3">Newcomers: <a href="http://localhost:8081/#/createaccountpage"> Create Account </a></p>
                
              
            </form>

          </v-card-text>
        </v-card>
    
      </v-row>
    </v-container>

  </div>
</template>

<script>
import commonMixin from "../mixin/commonMixin"
export default {
  name: "Loginpage",
  mixins: [commonMixin],
  created: function() {
    
  },

  mounted: function() {

    this.$emit('pagetitle', "Sign In")

  },

  computed: {   

    

    validatedFields: function () {
        if (this.username != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
    },
  },

  methods: {

    goHomepage: function() {
        this.navigate("homepage");
    },

    goLoginpage: function() {
        this.navigate("loginpage");
    },

    goAccountpage: function() {
        this.navigate("accountpage");
    },

    goTransactionpage: function() {
      this.navigate("transactionpage");
    },
    goCreateAccountPage: function(){
      this.navigate("createaccountpage");
    },

    logIn: function() {
       this.axios
        .get("http://localhost:8080/users/contacts/list")
        .then(function(response) {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {

        });
    },

    submit:function(){
      let self = this
      let user = {"username" : this.username, "password" : this.password}

      this.axios
        .post("http://localhost:8080/login/", user)
        .then(function(response) {
          console.log(response)
          document.token=response.data;
           if (document.targetpage){
            self.navigate(document.targetpage)
          } else {
              self.navigate("accountpage")
          }
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
      username: 'springuser',
      nom: '',
      password: 'user123',

      drawer: false,
      group: null,
      tab: null,

      showPassword: false,
      name: 'Name',
      rules: {
        required: value => !!value || 'Required.',
      }
    };
  },
}

</script>

<style>
.dense .col-12 {
  padding: 1px !important;
}
.required label::after {
  content: " *";
  color: red;
}

.display-1{
  text-align: center;
  color: rgb(223, 122, 28);
  box-shadow: 2px 2px 2px black;
  border: 1px solid black;
}

.justify-space-around{
  
}

</style>
