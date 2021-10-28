<template>

 <v-card
    class="mx-auto overflow-hidden"
    height="800"
  >

    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="600"
    >

    <v-container fluid>
      <v-row justify="space-around">
        
        <v-img
        class="bannierePMB"
          src="https://user.oc-static.com/upload/2019/10/21/15716565363662_image1.png"
          aspect-ratio="1.0"
          height="500px"
          
        ></v-img>
        
      </v-row>

      <v-row>
      <h1 class="display-1">PRESENTATION</h1>
      <p>Les fondateurs souhaitent développer l'activité et vous avez
         entendu parler d'une nouvelle idée de produit : une appli 
         qui permettrait aux clients de transférer de l'argent pour 
         gérer leurs finances ou payer leurs amis. Pendant que vous 
         étiez en formation à l’extérieur, le directeur de l'entreprise 
         a organisé une réunion pour mettre votre équipe au courant des 
         besoins produit de cette nouvelle appli. Votre équipe, composée 
         de concepteurs UX, de développeurs d'interface, de développeurs 
         d'infrastructure et d'un chef de projet, a été choisie pour 
         transformer cette idée en un produit totalement fonctionnel 
         que les gens adoreront utiliser.</p>
    </v-row>
    <v-row>
      <div>
       <div>Clique sur le bouton pour aller sur l'écran 2: </div> 
       <v-btn color="primary" @click="goLoginpage">Go !</v-btn>
      </div>
    </v-row>
    </v-container>

  </v-sheet>

  </v-card>
</template>

<script>
import commonMixin from "../mixin/commonMixin"
export default {
  name: "Homepage",
  mixins: [commonMixin],
  created: function() {
    
  },

  mounted: function() {

    this.$emit('pagetitle', "Page Home")

  },


  computed: {
    
   
    
  },
  methods: {

    goHomepage: function() {
        this.navigate("homepage");
    },

    goLoginpage: function() {
        this.navigate("loginpage");
    },
    
    goTransactionpage: function() {
      this.navigate("transactionpage");
    },
    
  },

  data: () => ({
    drawer: false,
    group: null,
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

.display-1{
  text-align: center;
  color: rgb(223, 122, 28);
  box-shadow: 2px 2px 2px black;
  border: 1px solid black;
}

</style>
