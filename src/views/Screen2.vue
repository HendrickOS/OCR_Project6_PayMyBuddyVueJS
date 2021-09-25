<template>
  <div>
    <div>
      <h1 class="display-1">Ecran 2B</h1>
    </div>
    <div>
      <div v-if="loading">
      <v-progress-linear :indeterminate="true" ></v-progress-linear>
      Loading...
      </div>
      <div v-else>
      <div>Voici les informations</div>
      <div class="pa-5" v-if="user">
        
        Prénom: {{user.name.first}} <br/>
        Nom: {{user.name.last}} <br/>
          <v-avatar
                  size="64px"
                >
        <v-img :src="user.picture.medium"></v-img>
          </v-avatar>
      </div>
    </div>
    </div>
    
    <div>
      <div>
       <div>Clique sur le bouton pour retourner sur l'écran 1: </div> 
       <v-btn color="primary" @click="goHomepage">Back !</v-btn>
      </div>
    </div>

    <div>
      <div>
       <div>Clique sur le bouton pour changer l'utilisateur: </div> 
       <v-btn color="primary" @click="refresh">Change</v-btn>
      </div>
    </div>
       </div>
 
</template>
<script>
import commonMixin from "../mixin/commonMixin"
export default {
  name: "Screen2",
  mixins: [commonMixin],
  created: function() {
    
  },

  mounted: function() {

    this.loadData()
  },

  computed: {
    
  },
  methods: {

    loadData() {
      this.loading=true;
      this.axios.get("https://randomuser.me/api/")
      .then(response =>{
        this.user = response.data.results[0]
        
      })
      .catch(error =>{
      console.log(error);
      })
      .finally ( () => {
        this.loading = false
      })
    },

    goHomepage: function() {
        this.navigate("homepage");
    },
    refresh: function() {
        this.loadData();
    },
   
  },
  data: () => ({
    user: null,
    loading: false
  })
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
</style>
