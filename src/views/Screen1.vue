<template>

 <v-card
    class="mx-auto overflow-hidden"
    height="600"
  >
    <v-app-bar
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Pay my Buddy</v-toolbar-title>
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
              <v-btn color="primary" @click="goScreen2">Home</v-btn>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <v-btn color="primary" @click="goScreen2">Account</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="600"
    >

    <v-container fluid>
      <v-row justify="space-around">
        
        <v-img
          src="https://picsum.photos/510/300?random"
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
       <v-btn color="primary" @click="goScreen2">Go !</v-btn>
      </div>
    </v-row>
    </v-container>

  </v-sheet>

  </v-card>
</template>
Title
<script>
import commonMixin from "../mixin/commonMixin"
export default {
  name: "Screen1",
  mixins: [commonMixin],
  created: function() {
    
  },

  mounted: function() {
  },


  computed: {
    
   
    
  },
  methods: {

    goScreen2: function() {
        this.navigate("screen2");
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
</style>
