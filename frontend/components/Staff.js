import { headers } from "../api.js";

export default {
  name: "Staff",
  template: `
    <div class="w-full max-w-screen-xl mx-auto p-6">
  <div class="relative rounded overflow-hidden border border-grey-light mb-8 bg-white">
    <div class="border-b border-grey-light p-4 bg-grey-lighter py-8">
      <div class="bg-white mx-auto max-w-md shadow-lg rounded-lg overflow-hidden">
        <div class="sm:flex sm:items-center px-2 py-4">
          <div class="flex-grow">
          <div class="flex">
            <h3 class="font-normal px-2 py-3 leading-tight">Staff</h3>
            <router-link tag="button" to="/dashboard/staff/new" class="bg-green hover:bg-green-dark text-white font-bold py-2 px-4 ml-auto rounded focus:outline-none focus:shadow-outline">
              Create New
            </router-link>
            </div>
            <div v-for="item in items" class="w-full">
              <div class="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
                <div class="w-4/5 h-10 py-3 px-1">
                  <p class="hover:text-blue-dark">{{ item.name }}</p>
                </div>
                <div class="w-1/5 h-10 text-right p-3">
                  <p class="text-sm text-grey-dark">{{ item.email }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  data: function() {
    return {
      items: []
    };
  },
  created: function() {
    this.$http
      .get("/api/staff", { headers })
      .then(res => this.items = res.data.data);
  }
};
