<template>
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view/>
   <!-- <template v-if="active === 'index'">
      <index />
    </template>
    <template v-if="active === 'team'">
      <Team/>
    </template>-->
  </div>
  <van-tabbar route v-model="active">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item v-if="hasMessage" icon="chat-o" name="chat" class="message"
                     @click="checkLogin('/message',3)" dot>
    </van-tabbar-item>
    <van-tabbar-item v-else icon="chat-o" name="message" class="message" @click="checkLogin('/message',3)">
      消息
    </van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="js">
//import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../config/route.ts";
import {getCurrentUser} from "../service/user.ts";
import {showConfirmDialog, showFailToast} from "vant";
import myAxios from "../plugins/myAxios.ts";
//import Team from "../pages/TeamPage.vue";
const hasMessage = ref(false)
const active = ref(0)
const router = useRouter()
const route = useRoute()
const DEFAULT_TITLE = '相友聚';
const title = ref('相友聚');

/**
 * 切换标题
 */
router.beforeEach(async (to,from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  document.title = "相友聚"
  title.value = route?.title ?? DEFAULT_TITLE;
  if (to.path !== '/user/login') {
    let res = await myAxios.get("/message");
    if (res.code === 0) {
      if (res.data) {
        hasMessage.value = true
      } else {
        hasMessage.value = false
      }
    }
  }
})
const onClickLeft = () => {
  router.back();
}
const onClickRight = () => {
  router.push('/search')
}

//const active = ref("index");
const checkLogin = async (to, index) => {
  let user = await getCurrentUser();
  if (!user) {
    showConfirmDialog({
      message:
          "该功能需要登陆后使用,是否登录",
      confirmButtonText: "去登录"
    })
        .then(() => {
          showFailToast("未登录")
          router.replace("/user/login")
        })
        .catch(() => {
        });
  } else {
    await router.push(to)
    if (active.value === 'message') {
      let message = document.getElementsByClassName("message")
      message.item(0).style.color = '#007eff'
    }
  }
}
</script>
<style scoped>
#content {
  padding-bottom: 150px;
}
</style>