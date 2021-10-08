<template>

  <div
    class="mx-auto overflow-hidden"
    height="600"
  >

    <v-container fluid>
      <v-row justify="space-around">
        
        <v-card
          elevation="4"
          :loading="loading"
          class="mx-auto my-12"
          max-width="374"
        >
          <v-tabs
            v-model="tab"
            background-color="deep-purple accent-4"
            centered
            dark
            icons-and-text
          >
            <v-tabs-slider></v-tabs-slider>

            <v-card-title>

              <v-tab href="#tab-1" @click="switchToSignIn()">
              Sign In
              <v-icon>mdi-phone</v-icon>
              </v-tab>

              <v-tab href="#tab-2" @click="switchToSignUp()">
              Sign Up 
              <v-icon>mdi-heart</v-icon>
              </v-tab>

            </v-card-title>
          </v-tabs>

          <v-card-text>

            <form>
              <v-text-field v-if="mode == 'signUp'"
                v-model="nom"
                :error-messages="nameErrors"
                :counter="10"
                label="UserName"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>

              <!-- <v-text-field v-if="mode == 'signUp'"
                v-model="prenom"
                :error-messages="nameErrors"
                :counter="10"
                label="Firstname"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field> -->

              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>

              <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"
                >
              ></v-text-field>

              <v-checkbox
                v-if="mode == 'signIn'"
                v-model="checkbox"
                :error-messages="checkboxErrors"
                label="Remember me"
                required
                @change="$v.checkbox.$touch()"
                @blur="$v.checkbox.$touch()"
              ></v-checkbox>

              <v-btn class="mr-4" :disabled="!validatedFields" v-if="mode == 'signUp'" @click="submit"> create </v-btn> 
              <v-btn class="mr-4" :disabled="!validatedFields" v-else @click="submit"> connection </v-btn>
              
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

    goAddContactpage: function() {
      this.navigate("addcontactpage");
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

    submit:function(){
      let self = this
      let user = {"username" : this.email, "password" : this.password}

      this.axios
        .post("http://localhost:8080/login/", user)
        .then(function(response) {
          console.log(response)
          console.log("francois")
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
        console.log("coucou")
    },

    switchToSignIn: function (){
      this.mode = 'signIn' ;
    },

    switchToSignUp: function (){
      this.mode = 'signUp' ;
    },

  },

  data () {

    return {
      mode: 'signIn',
      email: '',
      nom: '',
      password: '',

      drawer: false,
      group: null,
      tab: null,

      show1: false,
      password: 'Password',
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
  /* background: linear-gradient(green, yellow, rgba(0, 174, 255, 0.849)); */
  /* background: url(https://hdfondsdecran.com/image/201609/69/motif-givre-merveilleux.jpg); */
}

</style>
