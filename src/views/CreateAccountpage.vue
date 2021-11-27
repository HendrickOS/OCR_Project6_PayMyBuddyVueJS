<template>
    
    <v-form
    ref="form"
    v-model="validateFields"
  >
    <v-text-field
      v-model="username"
      :counter="10"
      :rules="usernameRules"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      :rules="passwordRules"
      label="Password"
      @click:append="showPassword = !showPassword"
      required
    ></v-text-field>

    <v-text-field
      v-model="passwordCheck"
      :append-icon="showPasswordCheck ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPasswordCheck ? 'text' : 'password'"
      :rules="passwordCheckRules"
      label="Password Check"
      @click:append="showPasswordCheck = !showPasswordCheck"
      required
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Accept terms"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!validateFields"
      color="success"
      class="mr-4"
      @click="createAccount"
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
      color="warning"
      @click="resetValidation"
    >
      Reset Validation
  </v-btn>

  <p class="pt-3">Already have an account ? : <a href="http://localhost:8081/#/loginpage"> Connect to an existing account </a></p>

  </v-form>

    
</template>

<script>
import commonMixin from "../mixin/commonMixin"
export default {
  name: "CreateAccountpage",
  mixins: [commonMixin],
  created: function() {
    
  },

  mounted: function() {

    this.$emit('pagetitle', "Sign Up")

  },

  computed: {   

    token: function () {
      return document.token
    },

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

     createAccount () {
      let self = this
      let user = {"username" : this.username,
                  "email" : this.email, 
                  "password" : this.password,
                  }

      this.axios
        .post("http://localhost:8080/users/", user)
        .then(function(response) {
          console.log(response)
          self.navigate("loginpage")
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
      resetValidation () {
        this.$refs.form.resetValidation()
      },

    
    
  },

  data () {

    return {

      validateFields: false,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 10) || 'Username must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      showPassword: false,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      showPasswordCheck: false,
      passwordCheck: '',
      passwordCheckRules: [
        v => !!v || 'PasswordCheck Check is required',
        v => (v && v == this.password) || 'Doesn t match your password '
      ],
      select: null,
      checkbox: false,
      
      
    };
  },  

};

</script>

<style>

</style>
