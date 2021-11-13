<template>
  <div class="container">
    <br /><br />
    <div class="row">
      <div>
        <h2>Add New Customer</h2>
        <br />
      </div>
    </div>
   <div class="container">

        <div class="form-group row">
            <div class="col">
                <div class="form-group">
                    <label for="customerAddress">CustomerName :</label>
                    <input type="text" v-model="customer.customerName" class="form-control" id="customerName" placeholder="Enter customerName" name="customerName">
                </div>
            </div>
        </div>
        
      <div class="form-group row">
        <div class="col">
          <div class="form-group">
            <label for="productPicture">Upload Image:</label>
            <UploadImage
              id="customerPicture"
              name="customerPicture"
              address="customerPicture"
            />
          </div>
        </div>
      </div>
      <div class="form-group row">
            <div class="col">
                <div class="form-group">
                    <label for="customerAge">CustomerAddress:</label>
                    <textarea v-model="customer.CustomerAddress" class="form-control" id="Descriotion" placeholder="Enter Address" rows="3"></textarea>

                </div>
            </div>
        </div>

      <button class="btn btn-primary" v-on:click="SaveCustomer()">Save</button
      >&nbsp;
      <button class="btn btn-danger" v-on:click="Cancel()">Cancel</button>
    </div>
    <br /><br />
  </div>
</template>

<script>
import UploadImage from "./UploadImage.vue";
import axios from "axios";
//import moment from "moment";
export default {
  name: "AddCustomer",
  components: {
    UploadImage,
  },
  data() {
    return {
      accessToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzY3ODg1ODMsImV4cCI6MTYzNjc5MjE4M30.VlaL9lL9STCuJoHCutDfccuGXevXCO1JAqjnYUAf7KI",
      customer: {
        CustomerName: "",
        CustomerAddress: "",
        CustomerAge: "",
        customerPicture : "",
      },
    };
  },
  methods: {
    async SaveCustomer() {
      if (confirm("Do you want to save this product?")) {

        let customerPicture = await this.$refs.customerPicture.getFileName();

        if ((await customerPicture) !== "") {
          this.area.customerPicture = await customerPicture;
          await this.$refs.customerPicture.UploadImage();
        }

        await axios.post(this.$apiUrl + "customer", this.customer, {
          headers: { Authorization: `bearer ${this.accessToken}` },
        });
        await this.$router.push("/customer");
      }
    },
    Cancel() {
      if (confirm("Do you want to cancel adding this customer?")) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.book-item {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}

label {
  /* Other styling... */
  text-align: right;
  clear: both;
  float: left;
  margin-right: 15px;
}
</style>
