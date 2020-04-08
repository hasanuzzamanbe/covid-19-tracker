import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import routes from './routes.js'

import {
  Button,
  ButtonGroup,
  Container,
  Header,
  Main,
  Aside,
  Dialog,
  Row,
  Col,
  Divider,
  Popover,
  Input,
  Table,
  TableColumn,
  Loading,
  Carousel,
  CarouselItem,
  Image
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Dialog);
Vue.use(Row);
Vue.use(Col);
Vue.use(Divider);
Vue.use(Popover);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Loading);
Vue.use(CarouselItem);
Vue.use(Carousel);
Vue.use(Image);
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router: routes,
}).$mount('#app')
