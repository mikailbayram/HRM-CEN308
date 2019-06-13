import { headers, environment } from "../api.js";

export default {
  name: "Project",
  template: `
  <div class="grid-wrapper">
    <div class="row">
      <div class="col-md-8">
        <h2>Project</h2>
      </div>
      <div class="col-md-4">
        <router-link tag="button" to="/dashboard/project/new" class="btn btn-primary float-right">
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
                Details
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
              {{ item.details }}
              </td>
              <td>
              <router-link class="action-link" tag="a" :to="{ path: '/dashboard/project/edit/' + item.id }">
                Edit
              </router-link>
              <a href="#" class="action-link" v-on:click="deleteProject(item.id)">
                Delete
              </a>
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
      .get(environment.apiUrl + 'project', { headers })
      .then(res => this.items = res.data.data);
    },
    deleteProject: function(id)
    {
      var r = confirm("Are you sure that you want to delete selected project?");
      
      if(r)
      {
        this.$http
        .delete(environment.apiUrl + 'project/' + id, { headers })
        .then(res => 
          this.loadData()
        );
      }
    }    
  }
};
