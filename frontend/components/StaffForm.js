import { headers } from "../api.js";

export default {
  name: "Login",
  template: `
      <div class="w-full max-w-md mx-auto mt-20">
        <form @submit.prevent="create" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
              Name
            </label>
            <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name">
          </div>
          <div class="mb-4">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
              Email
            </label>
            <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email">
          </div>
          <div class="mb-6">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
              Phone Number
            </label>
            <input v-model="phone_number" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" id="phone_number" type="text" placeholder="Phone Number">
          </div>
          <div class="flex">
            <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
              Create Staff
            </button>
          </div>
        </form>
        </div>
        `,
  data: function() {
    return {
      name: "",
      email: "",
      phone_number: ""
    };
  },
  methods: {
    create: function() {
      let name = this.name;
      let email = this.email;
      let phone_number = this.phone_number;
      this.$http
        .post("/api/staff", { name, email, phone_number }, { headers })
        .then(res => {
            this.$router.push("/dashboard/staff");
        })
        .catch(err => (this.invalid = true));
    }
  }
};
