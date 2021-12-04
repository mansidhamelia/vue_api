<template>
  <div class="container">
    <label>USERID: {{ userid }} </label><br /><br />

    <label>ID: {{ id }} </label><br /><br />

    <label>TITLE: {{ title }} </label><br /><br />
    <label>COMPLETED: {{ completed }} </label>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      todos: "",
      userid: "",
      id: this.$route.params.id,
      title: "",
      completed: false,
    };
  },
  mounted() {
    this.fetchApi();
  },
  methods: {
    async fetchApi() {
      await axios
        .get(`https://jsonplaceholder.typicode.com/todos/${this.id}`)
        .then((response) => {
        
          this.todos = response.data;
          this.userid = response.data.userId;
          this.title = response.data.title;
          this.completed = response.data.completed;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
