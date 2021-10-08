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
        
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="username"
            label="Username..."
            outlined
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
      >
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="pink"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
        </v-col>

    </v-row>
    </v-container>

  </v-sheet>

  </v-card>

</template>

<script>
import commonMixin from "../mixin/commonMixin"
export default {
  name: "AddContactpage",
  mixins: [commonMixin],
  created: function() {
    
  },

  mounted: function() {
    if (!this.token) {
      document.targetpage="addcontactpage";
      this.navigate("loginpage");
    }
    else{
     /*  this.loadAccounts() */
    }
  },

  computed: {   
    token: function () {
      return document.token
    }

  },

  methods: {

    
    
  },

  data () {

    return{

      items: [
          { icon: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
          { icon: true, title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { icon: true, title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { icon: true, title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        ],

    };
  },
}

</script>

<style>

</style>
