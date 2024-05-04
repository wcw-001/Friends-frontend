<template>
  <div id="messagePage">
    <van-grid :border="false">
      <van-grid-item icon="comment" icon-color="#767ffe" text="评论" to="/user/comment"/>
      <van-grid-item v-if="likeNum===0" icon="good-job" icon-color="#639efc" text="赞" to="/user/like"/>
      <van-grid-item v-else icon="good-job" icon-color="#639efc" text="赞" :badge="likeNum" to="/user/like"/>
      <van-grid-item icon="friends" icon-color="#a778fc" text="关注" to="/user/follow"/>
      <van-grid-item to="/fans">
        <template #icon>
          <van-icon class-prefix="my-icon" name="wodefensi" color="#65cdf2" size="28"/>
        </template>
        <template #text>
          <span style="margin-top: 0px;font-size: 14px">粉丝</span>
        </template>
      </van-grid-item>
    </van-grid>
    <van-divider/>
    <van-cell v-if="blogNum===0" to="/user/follow/blog">
      <template #title>
        <span class="cell-span">我的关注</span>
      </template>
      <template #icon>
        <div class="icon_area">
          <van-icon color="#2a2e31" class-prefix="my-icon" name="guanzhu" size="25"
                    style="margin-left: 12px;margin-top: 13px"/>
        </div>
      </template>
    </van-cell>
    <van-cell v-else to="/user/follow/blog">
      <template #title>
        <span class="cell-span">我的关注</span>
      </template>
      <template #icon>
        <van-badge :content="blogNum">
          <div class="icon_area">
            <van-icon class-prefix="my-icon" name="guanzhu" size="25"
                      style="margin-left: 12px;margin-top: 13px;color: #093ea6"/>
          </div>
        </van-badge>
      </template>
    </van-cell>
    <van-cell to="/friends">
      <template #title>
        <span class="cell-span">好友申请</span>
      </template>
      <template #icon>
        <van-badge >
          <div class="icon_area">
            <van-icon name="bell" size="25"
                      style="margin-left: 12px;margin-top: 13px;color: #e89817" :badge="record"/>
          </div>
        </van-badge>
      </template>
    </van-cell>
    <van-cell @click="toHallChat">
      <template #title>
        <span class="cell-span">公共聊天室</span>
      </template>
      <template #label>
        <span class="cell-span">官方聊天室</span>
      </template>
      <template #icon>
        <div class="icon_area">
          <van-image :src=favicon width="26" height="26" round
                     style="margin-left: 12px;margin-top: 12px"/>
        </div>
      </template>
      <template #value>
        <van-tag style="color:#ecdcdc;background-color:#0F64EC">官 方</van-tag>
      </template>
    </van-cell>
    <van-cell-group v-for="team in teamList">
      <van-cell @click="toChatRoom(team.id,team.name)">
        <template #title>
          <span class="cell-span">{{ `${team.name}` + '聊天室' }}</span>
        </template>
        <template #label>
          <span class="cell-span">{{ team.description }}</span>
        </template>
        <template #icon>
          <van-image :src="team.coverImage || defaultImg" round width="50" height="50" style="margin-left: 10px"/>
          <!--                    <van-icon name="volume" color="#2a2e31" class="icon" size="20px"/>-->
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {useRouter} from "vue-router";
import defaultImg from "../assets/defalutTeamImg.jpg";
import favicon from "../../public/favicon.ico"
import {showSuccessToast} from "vant";
import {getCurrentUser} from "../service/user.ts";
import qs from "qs";
const teamList = ref()
const likeNum = ref(0)
const blogNum = ref(0)
const record = ref(0);
onMounted(async () => {
  let res = await myAxios.get("/team/list/my/join");
  if (res?.code === 0) {
    teamList.value = res.data
  }
  let res2 = await myAxios.get("/message/like/num");
  if (res2.code === 0) {
    likeNum.value = Number(res2.data)
  }
  let res3 = await myAxios.get("/message/blog/num");
  if (res3.code === 0) {
    blogNum.value = Number(res3.data)
  }
  let res4 = await myAxios.get("/friend/getRecordCount");
  if (res4.code === 0) {
    console.log(res4.data)
    record.value = Number(res4.data)
  }
})

let router = useRouter();
const toChatRoom = (id, name) => {
  router.push({
    path: "/chat",
    query: {
      teamId: id,
      teamName: name,
      teamType: 2
    }
  })
}
const toHallChat = () => {
  router.push("/chat")
}
// const toRead = async () => {
//   const ids = ref([]) ;
//   const currentUser = await getCurrentUser();
//   ids.value= currentUser.friendIds.split(",");
//   let res = await myAxios.get("/friend/read",{
//     params: {
//       ids: ids.value
//     },paramsSerializer: {
//       serialize: params => qs.stringify(params, {indices: false}),
//     }
//   });
//   console.log("hhhh:"+res.data);
//     if (res.code === 0) {
//       showSuccessToast('基尼太美');
//     }
//  }

</script>

<style scoped>
#messagePage {
  margin-top: 0px;
}

.icon_area {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ededed;
  position: relative;
  margin-left: 10px;
}

.van-cell {
  padding-left: 5px;
}

.icon {
  position: absolute;
  left: 14px;
  top: 14px
}

.van-divider {
  margin: 2px;
}

.cell-span {
  margin-top: 15px;
  margin-left: 10px;
}

:root:root {
  --van-grid-item-text-font-size: 14px
}
</style>
