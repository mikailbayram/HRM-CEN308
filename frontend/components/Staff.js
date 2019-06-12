import { headers, environment } from "../api.js";

export default {
  name: "Staff",
  template: `
  <div class="grid-wrapper">
    <div class="row">
      <div class="col-md-8">
        <h2>Staff</h2>
      </div>
      <div class="col-md-4">
        <router-link tag="button" to="/dashboard/staff/new" class="btn btn-primary float-right">
          Create New
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped margin-top-25">
          <thead class="thead-dark">
            <tr>
              <th>
                Name
              </th>
              <th>
                Email
              </th>
              <th class="actions-column">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items">
              <td>
              {{ item.name }}
              </td>
              <td>
              {{ item.email }}
              </td>
              <td>
              <router-link class="action-link" tag="a" :to="{ path: '/dashboard/staff/edit/' + item.id }">
                Edit
              </router-link>
              <a href="#" class="action-link" v-on:click="deleteStaffMember(item.id)">
                Delete
              </button>
              </td>
            </tr>
          </tbody>
        </table>
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
