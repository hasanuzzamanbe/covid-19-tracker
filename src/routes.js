import VueRouter from 'vue-router';
import AllCountry from './components/All.vue'
import ByDate from './components/ByDate.vue'
import ByLatest from './components/ByLatest.vue'
let routes = [
  {
    path: "/",
    name: "All",
    component: AllCountry
  },
  {
    path: "/by-date/:country",
    name: "ByDate",
    component: ByDate
  },
  {
    path: "/by-latest/:country",
    name: "ByLatest",
    component: ByLatest
  },
];

export default new VueRouter({ routes });