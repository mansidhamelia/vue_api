<template>
  <div class="container">
    <div class="item1" id="todoForm">
      <h1>App</h1>

      <div>
        <!-- <input
          type="text"
          v-model="id"
          class="text"
          placeholder="Id"
        /><br /><br /> -->

        <label for="id">Id: {{id}}</label><br><br>
        <label>title: </label>
        <input
          type="text"
          v-model="title"
          class="text"
          placeholder="title"
        /><br /><br />
      </div>
      <div class="">
        <label>completed: </label><br />

        <input
          type="radio"
          id="true"
          name="status"
          :value="true"
          v-model="completed"
        />

        <label for="true">True</label><br />
         
        <input
          type="radio"
          id="false"
          name="status"
          :value="false"
          v-model="completed"
        />
        <label for="false">False</label><br />
      </div>
      <br /><br />

      <button class="btn1" @click="postData">Submit</button>
      <!-- <button class="btn1" @click="view">Todos</button> -->

      <div v-if="isActive">
        <button class="btn1" @click="postData">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {

  data() {
    return {
      todos: [],
      // id: "",
      id: this.$route.params.id,
      title: "",
      completed: false,
      isActive: false,
    };
  },
  methods: {
    view() {
      this.$router.push("/todos").catch(()=>{});
    },
    async fetchApi() {
      await axios
        .get(`https://jsonplaceholder.typicode.com/todos/${this.id}`)
        .then((response) => {
          this.todos = response.data;
          this.title = response.data.title;
          this.completed = response.data.completed;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    postData() {
          this.fetchApi();
      if (this.$route.name==='todo.create') {
        alert("create page");
        axios
          .post("https://jsonplaceholder.typicode.com/todos", {

         
            title: this.title,
            completed: this.completed,
          })
          .then((response) => {
            console.log(response.data);
            this.todos.push(response.data);
            this.title = "";
            this.completed = "";
          });
      } else {
        alert("update page");
        axios
          .put(`https://jsonplaceholder.typicode.com/todos/${this.id}` , {
            title: this.title,
            completed: this.completed,
          })
          .then((response) => {
            console.log("edit", response);
            this.fetchApi();
            this.id = "";
            this.title = "";
            this.completed = "";
          });
      }
    },
   
  },

  mounted() {
    if(this.$route.name==='todo.edit'){
     
    this.fetchApi();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  text-align: center;
}
.text {
  background: transparent;
  border: none;
  height: 30px;
  width: 50%;
  border-radius: 4px;
  background-color: #faf8f5;
  font-size: 15px;
}
.btn1 {
  width: 80px;
  height: 30px;
  background-color: #ad825a;
  border: none;
  border-radius: 4px;
  color: wheat;
  font-size: 15px;
  margin: 10px;
}
.btn {
  width: 60px;
  margin: 10px;
}

label {
  font-weight: bold;
  font-size: 20px;
}
.text {
  width: 20%;
}
</style>
