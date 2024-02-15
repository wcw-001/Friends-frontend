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
  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
//import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../config/route.ts";
//import Team from "../pages/TeamPage.vue";
const router = useRouter()
const route = useRoute()
const DEFAULT_TITLE = '伙伴匹配';
const title = ref('伙伴匹配');

/**
 * 切换标题
 */
router.beforeEach((to,from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})
const onClickLeft = () => {
  router.back();
}
const onClickRight = () => {
  router.push('/search')
}

//const active = ref("index");
</script>
<style scoped>
#content {
  padding-bottom: 150px;
}
</style>