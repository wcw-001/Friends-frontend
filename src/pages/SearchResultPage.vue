<template>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList || userList.length<1" description="未找到相关信息" />
</template>

<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";
const route = useRoute();
const {tags} = route.query;

const userList = ref([]);//存放用户列表
onMounted(async()=> {     //异步调用
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: {
      serialize: params => qs.stringify(params, {indices: false}),
    }
  }).then(function (response) {
    console.log('/user/search/tags succeed', response);
    showSuccessToast('请求成功!');
    return response?.data;  //返回数据  ?.可选链操作符，避免数据为null或undefined时报错
  }).catch(function (error) {
    console.error('/user/search/tags error', error);
    showFailToast('请求失败!');
  });
  // console.log(userListData)
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
  }
})

/*
const mockUser = {
  id: 12345,
  username: 'wcw',
  userAccount: '12345',
  avatarUrl: 'http://s6he8mzr3.hn-bkt.clouddn.com/wallpaper1705021285121.jpg',
  profile: 'wcw个人简介',
  gender: 0,
  phone: '18779750601',
  email: '23140775528@qq.com',
  userCode: 1234,
  userRole: 0,
  tags: ['java','emo','打工中'],
  createTime: new Date(),
}
*/
</script>



<style scoped>

</style>