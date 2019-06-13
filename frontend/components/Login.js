import { environment } from "../api.js";

export default {
  name: "Login",
  template: `
      <div class="mx-auto w-50 mt-5"> 
      <form @submit.prevent="login">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email"  v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div class="alert alert-danger mt-2" role="alert" v-if="invalid">
        <span class="block sm:inline">Invalid credentials.</span>
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
