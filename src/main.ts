import {createApp} from 'vue'
import App from './App.vue'
// 1. 引入你需要的组件
import {Button, Card, NavBar, Sidebar, SidebarItem, Swipe, SwipeItem} from 'vant';
import * as VueRouter from 'vue-router';
import { Field } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
import routes from "./config/route.ts";
import '../global.css'
import "../public/icon/iconfont.css"
import BasicLayout from "./layouts/BasicLayout.vue";
import ChatPage from "./pages/chatPage.vue";
import ForgetPasswordPage from "./pages/ForgetPasswordPage.vue";
const app = createApp(App);
// 3. 注册你需要的组件
app.use(Button);
app.use(NavBar);
app.use(Sidebar);
app.use(SidebarItem);
app.use(Card);
app.use(Field);
app.use(Swipe);
app.use(SwipeItem);
app.component("default-layout", BasicLayout)
app.component("chat-layout", ChatPage)
app.component("forget-layout", ForgetPasswordPage)


const router = VueRouter.createRouter({
    //内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})
app.use(router)
app.mount('#app')



