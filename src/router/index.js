import Vue from 'vue'
import VueRouter from 'vue-router'
import Customer from '../components/Customer.vue'
import AddCustomer from '../components/CustomerAddNew.vue'




Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Customer
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer
  },
  {
    path: '/addcustomer',
    name: 'AddCustomer',
    component: AddCustomer
  },
  
  
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router