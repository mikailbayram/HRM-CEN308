import { headers, environment } from "../api.js";

export default {
    name: "StaffForm",
    template: `
    <div class="grid-wrapper">
    <div class="row">
      <div class="col-md-8">
        <h2>Staff</h2>
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
              <router-link class="action-link" tag="a" :to="{ path: '/dashboard/performance/single/' + item.id }">
                See Ratings
              </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`,
    data: function () {
        return {
            items: []
        };
    },
    created: function () {
        this.loadData();
    },
    methods: {
        loadData: function () {
            this.$http
                .get(environment.apiUrl + 'staff', { headers })
                .then(res => this.items = res.data.data);
        }
    }
};
