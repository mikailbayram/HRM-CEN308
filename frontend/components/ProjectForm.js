import { headers, environment } from "../api.js";

export default {
  name: "ProjectForm",
  template: `
    <div class="form-container">
    <h3>Project</h3>
      <form @submit.prevent="save">
        <div class="form-group row">
          <label for="name" class="col-4 col-form-label">Name</label> 
          <div class="col-8">
            <input id="name" name="name" v-model="name" type="text" class="form-control">
          </div>
        </div>
        <div class="form-group row">
          <label for="details" class="col-4 col-form-label">Details</label> 
          <div class="col-8">
            <textarea id="details" name="details" v-model="details" type="text" class="form-control"></textarea>
          </div>
        </div>
        <div class="form-group row">
          <div class="offset-4 col-8">
            <button name="submit" type="submit" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
        `,
  data: function() {
    let staffObj = {
      name: '',
      details: ''
    };

    return staffObj;
  },
  created: function() {
    let projectId = this.$route.params.id;

    // if parameter is passed
    if(projectId)
    {
      this.$http
        .get(environment.apiUrl + 'project/' + projectId, { headers })
        .then(res => {
          this.$data.name = res.data.name;
          this.$data.details = res.data.details;       
        })
        .catch(err => (this.invalid = true));
    }
  },
  methods: {
    save: function() {
      let projectId = this.$route.params.id;
      
      if(projectId)
      {
        this.$http
        .put(environment.apiUrl + 'project/' + projectId, this.$data, { headers })
        .then(res => {
            this.$router.push("/dashboard/project");
        })
        .catch(err => (this.invalid = true));
      }
      else
      {
      this.$http
        .post(environment.apiUrl + 'project', this.$data, { headers })
        .then(res => {
            this.$router.push("/dashboard/project");
        })
        .catch(err => (this.invalid = true));
      }
    }
  }
};
