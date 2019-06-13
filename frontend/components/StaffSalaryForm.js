import { headers, environment } from "../api.js";

export default {
  name: "StaffSalaryForm",
  template: `
  <div class="form-container">
  <h3>Staff Salary</h3>
  <form @submit.prevent="save">
     <div class="form-group row">
        <label for="staff_id" class="col-3 col-form-label">Staff</label> 
        <div class="col-9">
           <select id="staff_id" v-model="staff_id" name="staff_id" class="custom-select">
              <option v-for="item in $data.staff" v-bind:value="item.id">{{ item.name }}</option>
           </select>
        </div>
     </div>
     <div class="form-group row">
        <label for="salary_type_id" class="col-3 col-form-label">Salary Type</label> 
        <div class="col-9">
           <select id="salary_type_id" v-model="salary_type_id" name="salary_type_id" class="custom-select">
            <option v-for="item in $data.salary_types" v-bind:value="item.id">{{ item.type }}</option>
           </select>
        </div>
     </div>
     <div class="form-group row">
        <label for="amount" class="col-3 col-form-label">Amount</label> 
        <div class="col-9">
           <input id="amount" name="amount" v-model="amount" type="text" class="form-control" required="required">
        </div>
     </div>
     <div class="form-group row">
        <label for="description" class="col-3 col-form-label">Description</label> 
        <div class="col-9">
           <textarea id="description" v-model="description" name="description" cols="40" rows="3" class="form-control"></textarea>
        </div>
     </div>
     <div class="form-group row">
        <div class="offset-3 col-9">
           <button name="submit" type="submit" class="btn btn-primary">Save</button>
        </div>
     </div>
  </form>
</div>
        `,
  data: function() {
    let staffObj = {
      staff_id: '',
      salary_type_id: '',
      amount: '',
      description: ''
    };

    return staffObj;
  },
  created: function() {
    let staffSalaryId = this.$route.params.id;    
    // if parameter is passed    
    this.$http
      .get(environment.apiUrl + 'salary/' + (staffSalaryId ? staffSalaryId : 0), { headers })
      .then(res => {
        this.$data.staff = res.data.staff;
        this.$data.salary_types = res.data.salary_types;
        this.$data.staff_id = res.data.staff_id;
        this.$data.salary_type_id = res.data.salary_type_id;
        this.$data.amount = res.data.amount;                    
        this.$data.description = res.data.description;                         
      })
      .catch(err => (this.invalid = true));
  },
  methods: {
    save: function() {
      let staffSalaryId = this.$route.params.id;
      
      if(staffSalaryId)
      {
        this.$http
        .put(environment.apiUrl + 'salary/' + staffSalaryId, this.$data, { headers })
        .then(res => {
            this.$router.push("/dashboard/staff-salary");
        })
        .catch(err => (this.invalid = true));
      }
      else
      {
      this.$http
        .post(environment.apiUrl + 'salary', this.$data, { headers })
        .then(res => {
            this.$router.push("/dashboard/staff-salary");
        })
        .catch(err => (this.invalid = true));
      }
    }
  }
};
