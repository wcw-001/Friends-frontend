//定义一些路由
import IndexPage from "../pages/IndexPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import EditUserPage from "../pages/EditUserPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import ForgetPasswordPage from "../pages/ForgetPasswordPage.vue";
import MessagePage from "../pages/MessagePage.vue";
import ChatPage from "../pages/chatPage.vue";
import UserTagPage from "../pages/UserTagPage.vue";
import UpdatePasswordPage from "../pages/UpdatePasswordPage.vue";
import UserFriendsPage from "../pages/UserFriendsPage.vue";
import UserMyFriendsPage from "../pages/UserMyFriendsPage.vue";
import UserDetailPage from "../pages/UserDetailPage.vue";
import UserFollowedBlogPage from "../pages/UserFollowedBlogPage.vue";
import UserFollowPage from "../pages/UserFollowPage.vue";
import UserFansPage from "../pages/UserFansPage.vue";
import BlogEditPage from "../pages/BlogEditPage.vue";
import UserBlogCommentPage from "../pages/UserBlogCommentPage.vue";
import blogsPage from "../pages/blogsPage.vue";
import BlogPage from "../pages/BlogPage.vue";
import MyBlogsPage from "../pages/MyBlogsPage.vue";
import UserLikePage from "../pages/UserLikePage.vue";

const routes = [
    { path: '/', component: IndexPage },
    { path: '/team',title: '找队伍', component: TeamPage },
    { path: '/user',title: '个人信息',component: UserPage },
    { path: '/search',title: '找伙伴',component: SearchPage },
    { path: '/user/edit',title: '编辑信息',component: EditUserPage },
    { path: '/user/list',title: '用户列表',component: SearchResultPage },
    { path: '/user/login',title: '登录',component: UserLoginPage },
    { path: '/team/add',title: '创建队伍',component: TeamAddPage},
    { path: '/team/update',title: '当前用户',component: TeamUpdatePage},
    { path: '/user/update',title: '更新信息',component: UserUpdatePage},
    { path: '/user/team/join',title: '加入队伍',component: UserTeamJoinPage},
    { path: '/user/team/create',title: '创建队伍',component: UserTeamCreatePage},
    { path: '/user/signup', component: SignUpPage},
    { path: '/forget', title: '忘记密码',component: ForgetPasswordPage, meta: {layout: 'forget'}},
    { path: '/message', title: '消息', component: MessagePage},
    { path: '/chat', component: ChatPage, meta: {layout: 'chat'}},
    { path: '/user/tag', title: "标签选择", component: UserTagPage},
    { path: '/update/password', title: '修改密码', component: UpdatePasswordPage, meta: {layout: 'password'}},
    { path: '/user/follow/blog', title: '关注', component: UserFollowedBlogPage},
    { path: '/friends', title: '好友申请', component: UserFriendsPage},
    { path: '/my/friends', title: '好友列表', component: UserMyFriendsPage},
    { path: '/user/detail', title: '用户详情', component: UserDetailPage},
    { path: '/user/follow', title: '我关注的用户', component: UserFollowPage},
    { path: '/fans', title: '我的粉丝', component: UserFansPage},
    { path: '/friends', title: '好友申请', component: UserFriendsPage},
    { path: '/my/friends', title: '好友列表', component: UserMyFriendsPage},
    { path: '/blog/edit', title: '博文编辑', component: BlogEditPage, meta: {layout: 'blog-edit'}},
    { path: '/user/comment', title: '我的评论', component: UserBlogCommentPage},
    { path: '/user/blogs', title: '贴吧', component: blogsPage},
    { path: '/blog', component: BlogPage, meta: {layout: 'blog'}},
    { path: '/user/my/blogs', title: '我的博文', component: MyBlogsPage},
    { path: '/user/like', title: '赞', component: UserLikePage}
]
export default routes;