<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
//import qs from "qs";
import {getCurrentUser} from "../service/user.ts";

/*
const user = {
  id: 1,
  username: 'wcw',
  userAccount: 'dogwcw',
  avatarUrl: 'http://s6he8mzr3.hn-bkt.clouddn.com/wallpaper1705021285121.jpg',
  gender: '男',
  phone: '18779750601',
  email: '2314075528@qq.com',
  userCode: '123',
  createTime: new Date()
}*/
const router = useRouter();
const user = ref('')
onMounted(async ()=>{
  user.value = await getCurrentUser();
})

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
</script>

<template>
  <template v-if ="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit( 'username',  '昵称', user.username)"/>
    <van-cell title="账号"  :value="user.userAccount" />
    <van-cell title="头像" is-link to="/user/edit" >
      <img style="height: 60px;width: 60px" :src="user.avatarUrl"/>
    </van-cell>
    <van-cell title="性别" is-link :value="user.gender" @click="toEdit( 'gender',  '性别', user.gender)" />
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" />
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" />
    <van-cell title="编号" :value="user.userCode" />
    <van-cell title="注册时间" :value="user.createTime" />
  </template>

</template>