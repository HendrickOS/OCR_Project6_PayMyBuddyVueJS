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
                v-model="email"
                label="E-mail"
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

    this.$emit('pagetitle', "Page de login")

  },

  computed: {   

    

    validatedFields: function () {
      /* debugger */
      if (this.mode == 'signUp') {
        if (this.email != "" /* && this.prenom != "" */ && this.nom != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
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

    /* testOtherMethod: function() { */
    logIn: function() {
       this.axios
        .get("http://localhost:8080/contacts/list")
        .then(function(response) {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {

        });
    },

    create:function(){
      
    },

    submit:function(){
      let self = this
      let user = {"username" : this.email, "password" : this.password}

      this.axios
        .post("http://localhost:8080/login/", user)
        .then(function(response) {
          console.log(response)
          /* console.log("francois") */
          document.token=response.data;
           if (document.targetpage){
            self.navigate(document.targetpage)
          } else {
              self.navigate("accountpage")
          }
          
          /* self.goLoginpage(); */
          /* self.testOtherMethod(); */

        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {

        });
        /* console.log("coucou") */
    },

  },

  data () {

    return {
      mode: 'signIn',
      email: 'springuser',
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
