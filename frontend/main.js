// src/main.js
import App from './components/App.js';
import Login from './components/Login.js';


const routes = [
  { path: '/login', component: Login },
]


const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.prototype.$http = axios

// Now the app has started!
new Vue({
  render: h => h(App),
  router
}).$mount(`#app`);

Vue.use(VueRouter)