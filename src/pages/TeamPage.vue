
<template>
  <div>
    <van-search v-model="searchText" placeholder="请输入搜索队伍" @search="onSearch" />
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="private"/>
    </van-tabs>

    <van-button type="primary" icon="plus"  class="add-button" @click="toCreateTeam"/>
    <team-card-list :teamList="teamList" />
    <van-empty v-if="!teamList || teamList.length<1" description="未找到相关信息" />
  </div>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";

const active = ref('public');
const router = useRouter();
const searchText = ref('');
/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name) =>{
  if(name === 'public'){
    listTeam(searchText.value,0);
  }else{
    listTeam(searchText.value,2)
  }
}

//跳转到创建队伍页
const toCreateTeam = ()=>{
  router.push({
    path: "/team/add"
  })
}
const teamList = ref([]);
/**
 * 搜索队伍
 * @param val
 * @param status
 */
const listTeam = async (val = '',status = 0)=>{
  const res = await myAxios.get("/team/list",{
    params: {
      searchText: val,
      pageNum: 1,
      status,
    }
  });
  console.log(res)
  if(res?.code === 0){
    teamList.value = res.data;
  }else{
    showFailToast("队伍加载失败，请刷新重试");
  }
}

//页面加载时只触发一次
onMounted(()=>{
  listTeam();
})
const onSearch = (val) => {
  listTeam(val);
};
</script>

<style scoped>

</style>