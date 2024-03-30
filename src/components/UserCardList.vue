<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
    <van-card
        :desc= user.profile
        :title= "`${user.username}（${user.userCode}）`"
        :thumb=user.avatarUrl
    >
      <template #tags>
        <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
          {{tag}}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini" @click="toChat(user)">联系我</van-button>
      </template>
    </van-card>
  </van-skeleton>
</template>

<script setup lang="ts">
import {UserType} from "../models/user";
import {showConfirmDialog, showFailToast} from "vant";
import {getCurrentUser} from "../service/user.ts";
import {useRouter} from "vue-router";
const router = useRouter()
interface UserCardListProps{
  loading: boolean;
  userList: UserType[];
}
const props = withDefaults(defineProps<UserCardListProps>(), {
  loading: true,
  //@ts-ignore
  userList: [] as UserType[],
});
const toChat = async (user: any) => {
  let currentUser = await getCurrentUser();
  if (!currentUser) {
    showConfirmDialog({
      message:
          "该功能需要登陆后使用,是否登录",
      confirmButtonText: "去登录"
    }).then(() => {
          showFailToast("未登录")
          router.replace("/user/login")
        })
        .catch(() => {
        });
  } else {
    await router.push({
      path: "/chat",
      query: {
        id: user.id,
        username: user.username,
        userType: 1
      }
    })
  }
}

</script>

<style scoped>

</style>