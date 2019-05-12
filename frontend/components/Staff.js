import { headers, environment } from "../api.js";

export default {
  name: "Staff",
  template: `
    <div class="w-full max-w-screen-xl mx-auto p-6">
  <div class="relative rounded overflow-hidden border border-grey-light mb-8 bg-white">
    <div class="border-b border-grey-light p-4 bg-grey-lighter py-8">
      <div class="bg-white mx-auto shadow-lg rounded-lg overflow-hidden">
        <div class="sm:flex sm:items-center px-2 py-4">
          <div class="flex-grow">
          <div class="flex">
            <h3 class="font-normal px-2 py-3 leading-tight">Staff</h3>
            <router-link tag="button" to="/dashboard/staff/new" class="bg-green hover:bg-green-dark text-white font-bold py-2 px-4 ml-auto rounded focus:outline-none focus:shadow-outline">
              Create New
            </router-link>
            </div>
            <div v-for="item in items" class="w-full">
              <div class="flex my-1 hover:bg-blue-lightest rounded">
                <div class="w-3/5 h-10 py-3 px-1">
                  <p class="hover:text-blue-dark">{{ item.name }}</p>
                </div>
                <div class="w-2/5 h-10 text-right p-3">
                  <p class="text-sm text-grey-dark">{{ item.email }}</p>
                </div>
                <div class="w-1/10 h-10 text-right p-3">
                  <router-link tag="button" :to="{ path: '/dashboard/staff/edit/' + item.id }" class="bg-green hover:bg-green-dark text-white font-bold py-2 px-4 ml-auto rounded focus:outline-none focus:shadow-outline">
                    Edit
                  </router-link>
                </div>
                <div class="w-1/10 h-10 text-right p-3">
                  <button v-on:click="deleteStaffMember(item.id)" class="bg-white hover:bg-grey-lightest text-grey-darkest font-semibold py-2 px-4 border border-grey-light rounded shadow">
                    Delete
                  </button>
                </div>
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
    this.loadData();
  },
  methods: {
    loadData: function() {
      this.$http
      .get(environment.apiUrl + 'staff', { headers })
      .then(res => this.items = res.data.data);
    },
    deleteStaffMember: function(id)
    {
      var r = confirm("Are you sure that you want to delete selected staff member?");
      
      if(r)
      {
        this.$http
        .delete(environment.apiUrl + 'staff/' + id, { headers })
        .then(res => 
          this.loadData()
        );
      }
    }    
  }
};
