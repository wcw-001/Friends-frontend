<template>
  <div>

    <template v-if ="user">
      <van-space style="margin-left: 20px">
        <van-image
            round
            width="80"
            height="80"
            :src="user?.avatarUrl"
            @click="toUserUpdatePage"

        />
        <van-cell :title="user.username" is-link to="/user/update" style="width: 260px" :center="true">
          <template #label>
            <van-text-ellipsis :content="user?.profile || '点此编辑个性签名'" />
          </template>
        </van-cell>
      </van-space>
      <van-cell title="当前用户" :value="user?.username" />
      <van-cell title="修改信息" is-link to="/user/update" />
      <van-cell title="我创建的队伍" is-link to="/user/team/create" />
      <van-cell title="我加入的队伍" is-link to="/user/team/join" />
    </template>
  </div>

</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
//import qs from "qs";
import {getCurrentUser} from "../service/user.ts";
import {showFailToast} from "vant";

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
  //user.value = await getCurrentUser();
  let currentUser = await getCurrentUser();
  if (currentUser) {
    user.value = currentUser
    if (currentUser.tags) {
      currentUser.tags = JSON.parse(currentUser.tags)
    }
  } else {
    showFailToast("未登录")
    await router.replace("/user/login")
  }
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

