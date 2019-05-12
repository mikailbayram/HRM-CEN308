// src/main.js
import App from "./components/App.js";
import Login from "./components/Login.js";

import Main from "./components/Main.js";
import Staff from "./components/Staff.js";
import StaffForm from "./components/StaffForm.js";

// components
import Sidebar from "./components/Sidebar.js";

Vue.component("sidebar", {
  template: Sidebar
});

const UserHome = { template: "<div>Home</div>" };

const routes = [
  {
    path: "/login",
    component: Login
  },

  {
    path: "/dashboard/",
    component: Main,
    children: [
      {
        path: "staff",
        component: Staff
      },
      {
        path: "staff/new",
        component: StaffForm
      },
      {
        path: "staff/edit/:id",
        component: StaffForm
      }
    ],
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") !== null) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

Vue.prototype.$http = axios;

new Vue({
  render: h => h(App),
  router
}).$mount(`#app`);

Vue.use(VueRouter);
