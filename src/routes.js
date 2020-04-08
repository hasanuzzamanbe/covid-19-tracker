import VueRouter from 'vue-router';
import AllCountry from './components/All.vue'
import ByDate from './components/ByDate.vue'
let routes=[
     {
      path: "/",
      name: "AllCountry",
      component: AllCountry
    },
  {
    path: "/by-date",
    name: "ByDate",
    component: ByDate
  }
];

export default new VueRouter({routes});