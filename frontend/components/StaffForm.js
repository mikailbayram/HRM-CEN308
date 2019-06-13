import { headers, environment } from "../api.js";

export default {
  name: "StaffForm",
  template: `
    <div class="form-container">
    <h3>Staff</h3>
      <form @submit.prevent="save">
        <div class="form-group row">
          <label for="name" class="col-4 col-form-label">Name</label> 
          <div class="col-8">
            <input id="name" name="name" v-model="name" type="text" class="form-control">
          </div>
        </div>
        <div class="form-group row">
          <label for="email" class="col-4 col-form-label">Email</label> 
          <div class="col-8">
            <input id="email" name="email" v-model="email" type="text" class="form-control">
          </div>
        </div>
        <div class="form-group row">
          <label for="phone_number" class="col-4 col-form-label">Phone Number</label> 
          <div class="col-8">
            <input id="phone_number" v-model="phone_number" name="phone_number" type="text" class="form-control">
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
      email: '',
      phone_number: ''
    };

    return staffObj;
  },
  created: function() {
    let staffId = this.$route.params.id;

    // if parameter is passed
    if(staffId)
    {
      this.$http
        .get(environment.apiUrl + 'staff/' + staffId, { headers })
        .then(res => {
          this.$data.name = res.data.name;
          this.$data.email = res.data.email;
          this.$data.phone_number = res.data.phone_number;          
        })
        .catch(err => (this.invalid = true));
    }
  },
  methods: {
    save: function() {
      let staffId = this.$route.params.id;
      
      if(staffId)
      {
        this.$http
        .put(environment.apiUrl + 'staff/' + staffId, this.$data, { headers })
        .then(res => {
            this.$router.push("/dashboard/staff");
        })
        .catch(err => (this.invalid = true));
      }
      else
      {
      this.$http
        .post(environment.apiUrl + 'staff', this.$data, { headers })
        .then(res => {
            this.$router.push("/dashboard/staff");
        })
        .catch(err => (this.invalid = true));
      }
    }
  }
};
