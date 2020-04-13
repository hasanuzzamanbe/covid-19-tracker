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
  Image,
  Progress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Notification
} from 'element-ui';

import 'element-ui/lib/theme-chalk/button.css';
import 'element-ui/lib/theme-chalk/button-group.css';
import 'element-ui/lib/theme-chalk/container.css';
import 'element-ui/lib/theme-chalk/header.css';
import 'element-ui/lib/theme-chalk/main.css';
import 'element-ui/lib/theme-chalk/aside.css';
import 'element-ui/lib/theme-chalk/dialog.css';
import 'element-ui/lib/theme-chalk/row.css';
import 'element-ui/lib/theme-chalk/col.css';
import 'element-ui/lib/theme-chalk/divider.css';
import 'element-ui/lib/theme-chalk/popover.css';
import 'element-ui/lib/theme-chalk/input.css';
import 'element-ui/lib/theme-chalk/table.css';
import 'element-ui/lib/theme-chalk/table-column.css';
import 'element-ui/lib/theme-chalk/loading.css';
import 'element-ui/lib/theme-chalk/image.css';
import 'element-ui/lib/theme-chalk/progress.css';
import 'element-ui/lib/theme-chalk/dropdown.css';
import 'element-ui/lib/theme-chalk/dropdown-item.css';
import 'element-ui/lib/theme-chalk/dropdown-menu.css';
import 'element-ui/lib/theme-chalk/notification.css';
import 'element-ui/lib/theme-chalk/icon.css';

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
Vue.use(Image);
Vue.use(Progress);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.prototype.$notify = Notification;
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router: routes,
}).$mount('#app')
