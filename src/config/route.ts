//定义一些路由
import IndexPage from "../pages/IndexPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import EditUserPage from "../pages/EditUserPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";

const routes = [
    { path: '/', component: IndexPage },
    { path: '/team', component: TeamPage },
    { path: '/user',component: UserPage },
    { path: '/search',component: SearchPage },
    { path: '/user/edit',component: EditUserPage },
    { path: '/user/list',component: SearchResultPage },
    { path: '/user/login',component: UserLoginPage },
    { path: '/team/add',component: TeamAddPage}

]
export default routes;