<template>
  <div class="item2">
    <h1>Data List</h1>
    <button class="btn" v-on:click="create">Add new</button>

    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, i) in todos" :key="i">
          <td>{{ todo.id }}</td>
          <td>{{ todo.title }}</td>
          <td>{{ todo.completed }}</td>
          <td>
            <button class="btn" v-on:click="editData(todo)">Edit</button>
            <button class="btn" v-on:click="deleteData(todo)">Delete</button>
            <button class="btn" v-on:click="view(todo)">View</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      todos: [],
      id: "",
      title: "",
      completed: false,
      isEdit: false,
    };
  },
  mounted() {
    this.fetchApi();
  },
  methods: {
    async fetchApi() {
      await axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((response) => {
          this.todos = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async view(todo) {
      await axios
        .get(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
        .then((response) => {
          this.$router.push(`/todos/${todo.id}/view`).catch(() => {});
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async editData(todo) {
      this.isEdit = true;
      await axios
        .get(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
        .then((response) => {
          this.$router.push(`/todos/${todo.id}/edit`).catch(() => {});
        })
        .catch((error) => {
          console.log(error);
        });
    },
    create() {
      this.$router.push(`/todos/create`).catch(() => {});
    },
     deleteData: async function (todo) {
           console.log(todo.id);
      await axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)

        .then((response) => {

          console.log(response.data);
          this.fetchApi();
         
        });
    },
  },
};
</script>


<style scoped>
.btn {
  width: 70px;
  margin: 10px;
}
</style>