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
          {{`队伍人数:${team.hasJoinNum}/${team.maxNum}`}}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间：'+team.expireTime }}
        </div>
        <div>
          {{'创建时间：'+team.createTime}}
        </div>
      </template>

      <template #footer>
        <van-button v-if="team.userId !== currentUser?.id && !team.hasJoin" size="mini" type="primary"  plain
                    @click="preJoinTeam(team)">加入队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" size="mini" plain @click="doUpdateTeam(team.id)">更新队伍</van-button>
        <!--todo 仅加入队伍可见-->
        <van-button v-if="team.hasJoin" size="mini"  plain @click="doQuitTeam(team.id)">退出队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" size="mini"  plain type="danger" @click="doDeleteTeam(team.id)">解散队伍</van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>

  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team.ts";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import img from "../assets/img.png"
import {getCurrentUser} from "../service/user.ts";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
interface TeamCardListProps{
  teamList: TeamType[];
}
const props = withDefaults(defineProps<TeamCardListProps>(), {
  //@ts-ignore
  teamList: [] as TeamType[]
});
const password = ref('');
const currentUser = ref();
onMounted(async ()=>{
  currentUser.value = await getCurrentUser();
})

const preJoinTeam = (team: TeamType) =>{
    joinTeamId.value = team.id;
    if(team.status === 0){
      doJoinTeam()
    }else {
      showPasswordDialog.value = true
    }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}
const showPasswordDialog = ref(false);
const joinTeamId = ref();
/**
 * 加入队伍
 *
 */
const doJoinTeam = async () => {
    if(!joinTeamId.value){
      return;
    }
    const res = await myAxios.post("/team/join",{
    teamId: joinTeamId.value,
    password: password.value,
  });
  if(res?.code === 0){
    showSuccessToast('加入成功');
    doJoinCancel();
  }else{
    showFailToast({
      message:'加入失败'+(res.description ?`,${res.description}`:''),
      icon: 'cross',
    });
  }
}
/**
 * 更新队伍
 * @param id
 */
const doUpdateTeam = async (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}
/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post("/team/quit",{
    teamId: id
  });
  if(res?.code === 0){
    showSuccessToast('操作成功');
  }else{
    showFailToast({
      message:'操作失败'+(res.description ?`,${res.description}`:''),
      icon: 'cross',
    });
  }
}
/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post("/team/delete",{
    id,
  });
  if(res?.code === 0){
    showSuccessToast('操作成功');
  }else{
    showFailToast({
      message:'操作失败'+(res.description ?`,${res.description}`:''),
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