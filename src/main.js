import Vue from 'vue'

// import ElementUI from 'element-ui';

import {
  Table,
  TableColumn,
  Container,
  Header,
  Aside,
  Main,
  Button,
  Input,
  menu,
  submenu,
  menuItemGroup,
  menuItem,
  Icon,
  Row,
  Col,
  Form,
  formItem,
  Message,
  DatePicker,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Progress,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Tag,
  Tree,
  Select,
  Option,
  Upload
} from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css'
import "./assets/base.css"
import App from './App.vue'
import router from  './router'
import TreeTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// require styles 导入富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import axios from 'axios'
// 配置请求的路径
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'

// 拦截
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须 return config
  return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table',TreeTable)

// Vue.use(ElementUI);
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Button)
Vue.use(Input)
Vue.use(menu)
Vue.use(submenu)
Vue.use(menuItemGroup)
Vue.use(menuItem)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(formItem)
Vue.use(DatePicker)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Progress)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)


Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm


new Vue({
  render: h => h(App),router
}).$mount('#app')

// npm install axios
// npm install vue-router

// 第105讲


// 问题解决了，原来是我太久没有更新npm 和vue的版本了。
// table 超出隐藏
// <el-table-column :show-overflow-tooltip="true">
//     </el-table-column>
