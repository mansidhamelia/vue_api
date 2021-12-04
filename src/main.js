import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Todos from './components/Todos.vue'
import Todo from './components/Todo.vue'
import Create from './components/Create.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [

  {path: '/todos',name: 'todos', component: Todos},
  {path: '/todos/:id/view',name: 'todo', component: Todo},
  {path: '/todos/:id/edit',name: 'todo.edit', component: Create},
  {path: '/todos/create',name: 'todo.create', component: Create},

]

const router = new  VueRouter ({
  routes,
  mode: 'history',
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
