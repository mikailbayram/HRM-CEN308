import { headers, environment } from "../api.js";

export default {
    name: "StaffForm",
    template: `
  <form @submit.prevent="save">
  <div class="form-group">
    <label for="Rating">Rating</label>
    <select v-model="rating" class="form-control"> 
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
    </select>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
        `,
    data: function () {
        let staffObj = {
            rating: '1'
        };

        return staffObj;
    },
    methods: {
        save: function () {
            let staff_id = this.$route.params.id;

            this.$http
                .post(environment.apiUrl + 'performance', {
                    staff_id,
                    rating: this.rating,
                    date: this.getDate()
                }, { headers })
                .then(res => {
                    this.$router.push("/dashboard/performance/single/"+staff_id);
                })
                .catch(err => (this.invalid = true));


        },
        getDate: function () {
            var d = new Date(),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
        
            return [year, month, day].join('-');
        }
    }
};
