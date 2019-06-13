// src/main.js
import App from "./components/App.js";
import Login from "./components/Login.js";

import Main from "./components/Main.js";
import Staff from "./components/Staff.js";
import StaffForm from "./components/StaffForm.js";

//performance
import PerformanceForm from "./components/PerformanceForm.js";
import PerformanceList from "./components/PerformanceList.js";
import Performance from "./components/Performance.js";

// components
import Sidebar from "./components/Sidebar.js";
import StaffSalary from "./components/StaffSalary.js";
import StaffSalaryForm from "./components/StaffSalaryForm.js";

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
      },
      {
        path: "staff-salary",
        component: StaffSalary
      },
      {
        path: "staff-salary/edit/:id",
        component: StaffSalaryForm
      },
      {
        path: "staff-salary/new",
        component: StaffSalaryForm
      },
      {
        path: "performance",
        component: PerformanceList
      },
      {
        path: "performance/single/:id",
        component: Performance
      },
      {
        path: "performance/new/:id",
        component: PerformanceForm
      },
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
