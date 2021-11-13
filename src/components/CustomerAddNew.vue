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
                    <label for="customerId">CustomerId :</label>
                    <input type="text" v-model="customer.CustomerId" class="form-control" id="customerId" placeholder="Enter customerId" name="customerId">
                </div>
            </div>
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
                    <label for="publishedDate">Published Date:</label>
                    <vc-date-picker v-model="book.publishedDate" mode="date" id="publishedDate" name="publishedDate" />   
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="bookimage">Upload Image:</label>
                    <UploadImage id="custormerimages" name="custormerimages" ref="custormerimages" />
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

        <button class="btn btn-primary" v-on:click="SaveCustomer()" >Save</button>&nbsp;
        <button class="btn btn-danger" v-on:click="Cancel()">Cancel</button>

    </div>
    <br /><br />
</div>
</template>

<script>
import axios from "axios";
import moment from 'moment';
import UploadImage from './UploadImage';
export default {
    name: "CustomerAddNew",
    components:{
        UploadImage
    },
    data() {
        return {
             accessToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzY3ODg1ODMsImV4cCI6MTYzNjc5MjE4M30.VlaL9lL9STCuJoHCutDfccuGXevXCO1JAqjnYUAf7KI",
        customer: {
        CustomerName: "",
        CustomerAddress: "",
        CustomerAge: "",
        customerPicture : "",
            }
        }
    },
    methods: {
        async SaveCustomer() {

            if (confirm("Do you want to save this book?")) {
                //Code for sent data to API to add new book
                this.customer.publishedDate = moment(String(this.customer.publishedDate)).format('YYYY-MM-DD');
                let custormerimages = await this.$refs.custormerimages.getFileName()

                if (await custormerimages !== "") {
                    this.customer.thumbnailUrl = await custormerimages
                    await this.$refs.custormerimages.UploadImage();
                }

                let accessToken= await localStorage.getItem('accessToken')
        
        if (await accessToken) {
            try {
                //Code for this page
                await axios.post(this.$apiUrl + "customer", this.book, { headers: {"Authorization" : `bearer ${accessToken}`} });
                await this.$router.push('/customer');


             }
            catch{
                this.$router.push('/login');
            }
        }else{
            this.$router.push('/login');
        }

                

            }
            

        },
        Cancel() {
            if (confirm("Do you want to cancel adding this book?")) {

                this.$router.push('/');

            }

        }
    }
}
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
