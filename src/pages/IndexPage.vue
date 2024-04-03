<template>
  <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      left-icon="volume-o"
      style="margin-bottom: 10px;margin-top: 0px"
      text="校园有着你朗朗书声，有着你写不完的试卷，有着你忘不掉的老师，有着你共同学习的同学，在这里你可以尽情发挥你最好的水平。在这里可以找到志同道合的校友奋笔直追！！"
  />
  <van-swipe :autoplay="3000" class="my-swipe" style="width: 90%;height: 150px;margin: 0 auto" lazy-render>
    <van-swipe-item v-for="image in images" :key="image">
      <img :src="image" />
    </van-swipe-item>
  </van-swipe>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" />
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList||userList.length<1" description="请求数据为空" />
</template>

<script setup lang="ts">
//import {useRoute} from "vue-router";
import { ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
//import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";
import images from "../constants/Images.ts";

//const route = useRoute();
const  isMatchMode = ref<boolean>(false);

//const {tags} = route.query;

const userList = ref([]);//存放用户列表
const loading = ref(true)
/**
 * 加载数据
 */
const loadData = async () => {
  loading.value = true;
  let userListData;
  // 心动模式,根据标签匹配用户
  if(isMatchMode.value){
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    }).then(function (response) {
      console.log('/user/match succeed', response);
      showSuccessToast('请求成功!');
      return response?.data;  //返回数据  ?.可选链操作符，避免数据为null或undefined时报错
    }).catch(function (error) {
      console.error('/user/match error', error);
      showFailToast('请求失败!');
    });
  }else {
    //普通模式直接分页查询用户
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1
      },
    }).then(function (response) {
      console.log('/user/recommend succeed', response);
      showSuccessToast('请求成功!');
      return response?.data?.records;  //返回数据  ?.可选链操作符，避免数据为null或undefined时报错
    }).catch(function (error) {
      console.error('/user/recommend error', error);
      showFailToast('请求失败!');
    });
  }

  // console.log(userListData)
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
  }
  loading.value = false
}

//监听
watchEffect(() => {
  loadData();
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
.my-swipe {
  margin: 15px;
  border-radius: 3%;
}
</style>