<template>

<v-card
  class="mx-auto overflow-hidden"
  height="550"
>
  <v-btn
    fab
    color="cyan accent-2"
    bottom
    right
    dark
    absolute
    @click="dialog = !dialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <v-card
      color="blue-grey darken-1"
      dark
      :loading="isUpdating"
    >

      
              <v-autocomplete
                v-model="friends"
                :disabled="isUpdating"
                :items="people"
                filled
                chips
                color="blue-grey lighten-2"
                label="Select"
                item-text="name"
                item-value="name"
                multiple
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item)"
                  >
                    <v-avatar left>
                      <v-img :src="data.item.avatar"></v-img>
                    </v-avatar>
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-avatar>
                      <img :src="data.item.avatar">
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            
      <v-divider></v-divider>
      <v-card-actions>

        <v-col
          class="text-right"
          cols="12"
        >
        
          <v-btn 
            color="primary" 
            @click="dialog = false"
          >
            Close
          </v-btn>

          <v-btn 
            color="green"
            @click="addContact"
          >
            Confirm
          </v-btn>

        </v-col>

      </v-card-actions>
    </v-card>
    </v-dialog>
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

    this.$emit('pagetitle', "Page Ajouter Contact")

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

    remove (item) {
        const index = this.friends.indexOf(item.name)
        if (index >= 0) this.friends.splice(index, 1)
      },

    addContact:function(){
      let self = this
      let user = {"connections" : this.name, 
                  }

      this.axios
        .post("http://localhost:8080/contacts/", user)
        .then(function(response) {
          console.log(response)
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
    },
    
  },

  data () {

    const srcs = {
        1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      }

    return{
      autoUpdate: true,
      friends: ['Sandra Adams', 'Britta Holt'],
      isUpdating: false,
      name: 'Midnight Crew',
      people: [
        { header: 'Group 1' },
        { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
        { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
        { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
        { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
        { divider: true },
        { header: 'Group 2' },
        { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
        { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
        { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
        { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
      ],

      dialog: false,
    }
  
  },

  watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
    },


}

</script>

<style>

</style>
