<template>

  <v-card
    class="mx-auto overflow-hidden"
    height="600"
  >
    <v-app-bar
      color="blue" 
      dark  
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Pay My Buddy</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <v-btn color="primary" @click="goHomepage">Home</v-btn>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <v-btn color="primary" @click="goAccountpage">Account</v-btn>
            </v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

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

              <v-tab href="#tab-1">
              Sign In
              <v-icon>mdi-phone</v-icon>
              </v-tab>

              <v-tab href="#tab-2">
              Sign Up
              <v-icon>mdi-heart</v-icon>
              </v-tab>

            </v-card-title>
          </v-tabs>

          <v-card-text>

            <form>
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                :counter="10"
                label="Name"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>

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
                v-model="checkbox"
                :error-messages="checkboxErrors"
                label="Remember me"
                required
                @change="$v.checkbox.$touch()"
                @blur="$v.checkbox.$touch()"
              ></v-checkbox>

              <v-btn class="mr-4" @click="submit"> connection </v-btn>
              
            </form>

          </v-card-text>
        </v-card>
    
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import commonMixin from "../mixin/commonMixin"
export default {
  name: "Accountpage",
  mixins: [commonMixin],
  created: function() {
    
  },

  mounted: function() {

  },

  computed: {   

  },

  methods: {

    goHomepage: function() {
        this.navigate("homepage");
    },

    goAccountpage: function() {
        this.navigate("accountpage");
    },

    testOtherMethod: function() {
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
      let user = {"username" : this.name, "password" : this.password}

      this.axios
        .post("http://localhost:8080/login/", user)
        .then(function(response) {
          console.log(response)
          document.token=response.data;
           if (document.targetpage){
            self.navigate(document.targetpage)
          }

          /* self.testOtherMethod(); */

        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {

        });

    }
    
  },

  data: () => ({

    drawer: false,
    group: null,
    tab: null,

    show1: false,
    password: 'Password',
    name: 'Name',
    rules: {
      required: value => !!value || 'Required.',
    }
  
  }),

  

};
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
  background: url(https://hdfondsdecran.com/image/201609/69/motif-givre-merveilleux.jpg);
}

</style>
