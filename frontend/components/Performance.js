import { headers, environment } from "../api.js";

export default {
  name: "Performance",
  template: `
        <div class="grid-wrapper">
            <div class="row">
                <div class="col-md-8">
                    <h2>Performance</h2>
                </div>
            <div class="col-md-4">
                <router-link tag="button" :to="{path:'/dashboard/performance/new/' + staffId }" class="btn btn-primary float-right">
                    Add New
                </router-link>
            </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <h3>Average Rating: {{average}}</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-striped margin-top-25">
                        <thead class="thead-dark">
                            <tr>
                                <th>
                                    Date
                                </th>
                                <th>
                                    Rating
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="rating in ratings">
                                <td>
                                    {{ rating.date }}
                                </td>
                                <td>
                                    {{ rating.rating }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `,
  data: function() {
    let staffObj = {
      ratings: [],
      average: 0
    };

    return staffObj;
  },
  created: function() {
    this.staffId = this.$route.params.id;
    if(this.staffId)
    {
      this.$http
        .get(environment.apiUrl + 'performance/' + this.staffId, { headers })
        .then(res => {
            this.ratings = res.data.data;  
            let sum = 0;
            this.ratings.forEach(rating=>sum += rating.rating);
            this.average = this.ratings.length === 0 ? "N/A" : (sum / this.ratings.length).toFixed(2); 
        })
        .catch(err => (this.invalid = true));
    }
  },
  methods: {
  }
};
