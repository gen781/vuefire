<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="title">What do I need to do today?</div>
    <input v-model="myTodo" /><button @click="addToDo">Add</button>
    <div v-if="errors !== ''" id="errors">{{ errors }}</div>

    <div v-if="this.$store.getters.getItems && this.$store.getters.getItems.length > 0">
      <div class="title">Today, you've go to do...</div>
      <div v-for="item in this.$store.getters.getItems" :key="item.id">
        <div class="row">
          <div class="col-md-6">
            {{ item.title }} 
          </div>
          <div class="col-md-6">
            <button 
              type="button"
              class="btn btn-danger btn-sm" 
              @click="deleteItem(item.id)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
        <hr/>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/main'
export default {
  name: 'home',
  data: function () {
    return {
      myTodo: '',
      errors: ''
    }
  },
  beforeCreate: function () {
    this.$store.dispatch('setItems')
  },
  methods: {
    addToDo: function () {
      this.errors = ''
      if (this.myTodo !== '') {
        db.collection('items').add({
          title: this.myTodo,
          created_at: Date.now()
        }).then((response) => {
          if (response) {
            this.myTodo = ''
          }
        }).catch((error) => {
          this.errors = error
        })
      } else {
        this.errors = 'Please enter some text'
      }
    },
    deleteItem: function (id) {
      if (id) {
        db.collection("items").doc(id).delete().then(function() {
          console.log('Document successfully deleted')
        }).catch(function(error) {
          this.error = error
        })
      } else {
        this.error = 'Invalid ID'
      }
    }
  }
}
</script>

<style>
* {
  box-sizing:border-box;
}

body, html, #app {
  background:#f0f3f5;
}

.home {
  width:300px;
  margin:auto;
}

#vue-logo {
  width:100px;
}

input, button {
  border:0;
  width:100%;
  margin:0 0 10px;
  padding:7px;
}

input {
  font-size:12px;
}

button {
  background:#0fb87f;
  border:0;
  text-transform:uppercase;
  color:#fff;
  font-weight:700;
  cursor:pointer;
  max-width: 100%;
  padding:10px;
}

.title {
  font-size:14px;
  font-weight:700;
  padding:0 0 10px 0;
  margin:0 0 10px 0;
  border-bottom:1px solid #666;
}

#errors {
  background:#a52222;
  color:#fff;
  padding:5px;
}
</style>