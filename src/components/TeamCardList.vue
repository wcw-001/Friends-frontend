<template>
  <div id ="teamCardList">
    <van-card
        v-for= "team in props.teamList"
        :thumb = "img"
        :desc= "team.description"
        :title="`${team.name}`"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>

      <template #bottom>
        <div>
          {{'最大人数：'+team.maxNum}}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间：'+team.expireTime }}
        </div>
        <div>
          {{'创建时间：'+team.createTime}}
        </div>
      </template>

      <template #footer>
        <van-button size="mini" type="primary" plain @click="doJoinTeam(team.id)">加入队伍</van-button>
      </template>

    </van-card>
  </div>

</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team.ts";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import img from "../assets/img.png"


interface TeamCardListProps{
  teamList: TeamType[];
}
const props = withDefaults(defineProps<TeamCardListProps>(), {
  //@ts-ignore
  teamList: [] as TeamType[]
});
/**
 * 加入队伍
 * @param id
 */
const doJoinTeam = async (id: number) => {
    const res = await myAxios.post("/team/join",{
    teamId: id
  });
  if(res?.code === 0){
    showSuccessToast('加入成功');
  }else{
    showFailToast({
      message:'加入失败'+(res.description ?`,${res.description}`:''),
      icon: 'cross',
    });
  }
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img){
  height: 128px;
  object-fit: unset;
}
</style>