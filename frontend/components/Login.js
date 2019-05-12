import { environment } from "../api.js";

export default {
  name: "Login",
  template: `
    <div class="w-full max-w-xs mx-auto mt-20">
      <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
            Email
          </label>
          <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email">
        </div>
        <div class="mb-6">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign In
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
      <div class="bg-red-lightest border border-red-light text-red-dark px-4 py-3 rounded relative" role="alert" v-if="invalid">
        <span class="block sm:inline">Invalid credentials.</span>
        <svg @click=setInvalid class="fill-current h-6 w-6 text-red" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>
      </div>
      `,
  data: function() {
    return {
      email: "",
      password: "",
      invalid: false
    };
  },
  methods: {
    login: function() {
      let email = this.email;
      let password = this.password;
      this.$http
        .post(environment.apiUrl + 'token', { email, password })
        .then(res => {
          localStorage.setItem("token", res.data.token);
          this.$router.push('/dashboard/staff')
        })
        .catch(err => (this.invalid = true));
    },
    setInvalid: function() {
      this.invalid = false;
    }
  }
};
