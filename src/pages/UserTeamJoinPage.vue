
<template>
  <div>
    <van-search v-model="searchText" placeholder="请输入搜索队伍" @search="onSearch" />
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="!teamList || teamList.length<1" description="未找到相关信息" />
  </div>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";

const router = useRouter();
const searchText = ref('');
const teamList = ref([]);

/**
 * 搜索队伍
 * @param val
 */
const listTeam = async (val = '')=>{
  const res = await myAxios.get("/team/list/my/join",{
    params: {
      searchText: val,
      pageNum: 1,
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