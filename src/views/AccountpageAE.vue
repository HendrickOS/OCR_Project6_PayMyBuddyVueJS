<template>
  <div>
    <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <v-card
              color="blue-grey darken-1"
              dark
            >

              <v-autocomplete
                v-model="friends"
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
  
  <v-card>

    <v-card-text>
        <v-data-table
          :headers="headers"
          :items="accounts"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
    </v-card-text>

    <v-card-actions
      class="justify-end pr-5"
      >
      <v-btn
          fab
          small
          color="red accent-2"
          dark
          @click="dialog = !dialog"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
    </v-card-actions>

    <v-container fluid>
      <v-row justify="space-around">
        
        

        <!-- <v-list-item
          v-for="account in accounts"
          :key="account.connection"
        >
        <v-list-item-icon>
          <v-icon
            v-if="item.icon"
            color="pink"
            @click="deleteContact"
          >
            mdi-minus
          </v-icon>
        </v-list-item-icon>
        </v-list-item> -->

    </v-row>
    </v-container>

  </v-card>
</div>
</template>

<script>
import commonMixin from "../mixin/commonMixin"
export default {
  name: "Accountpage",
  mixins: [commonMixin],
  created: function() {
    
  },

  mounted: function() {

    this.$emit('pagetitle', "Page account")

    if (!this.token) {
      document.targetpage="accountpage";
      this.navigate("loginpage");
    }
    else{
      this.loadAccounts()
    }


  },

  computed: {   

    token: function () {
      return document.token
    }

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

    goAddContactpage: function() {
      this.navigate("addcontactpage");
    },
    
    loadAccounts: function() {
      let self= this
       this.axios
        .get("http://localhost:8080/contacts/list")
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

    remove (item) {
      const index = this.friends.indexOf(item.name)
      if (index >= 0) this.friends.splice(index, 1)
    },

    addContact:function(){
      let self = this
      let user = {"connections" : this.friends }

      this.axios
        .post("http://localhost:8080/contacts/", user)
        .then(function(response) {
          console.log(response)
          self.friends = response.data;
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

    deleteContact:function(){
      let self = this
      let user = {"id" : this.id }

      this.axios
        .delete("http://localhost:8080/contacts/", user)
        .then(function(response) {
          console.log(response)
          self.user=response.data;
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

    const srcs = {
        1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      }

    return {

      accounts: [],

      headers: [
            {
              text: 'ID',
              align: 'start',
              sortable: false,
              value: 'id',
            },
            { text: 'Connections', value: 'connections' },
            { text: 'Description', value: 'description' },
            { text: 'Amount', value: 'amount' },
          ],

      friends: [],
      //name: 'Midnight Crew',
      people: [
        { header: 'Group 1' },
        { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1], icon: true },
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
      
    };
  },  

};

</script>

<style>

</style>
