<template>
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
            <van-text-ellipsis :content="user?.profile || '点此编辑个性签名'" @click="toEditProfile"/>
          </template>
        </van-cell>
      </van-space>
      <van-cell center style="margin-top: 15px">
        <template #title>
          <span style="margin-left: 20px">我的标签</span>
        </template>
        <template #value>
          <van-tag v-for="tag in user.tags" plain type="danger" style="margin-right: 8px;margin-top: 8px">
            {{ tag }}
          </van-tag>
        </template>
      </van-cell>
      <!--<van-cell title="当前用户" :value="user?.username" />
      <van-cell title="修改信息" is-link to="/user/update" />
      <van-cell title="我创建的队伍" is-link to="/user/team/create" />
      <van-cell title="我加入的队伍" is-link to="/user/team/join" />-->
      <van-grid :border="false" style="padding: 10px">
        <van-grid-item icon="friends" text="创建的队伍" to="/user/team/create" icon-color= "#0048ff"/>
        <van-grid-item icon="cluster" text="加入的队伍" to="/user/team/join" icon-color="#11d35d"/>
        <van-grid-item icon="add-square" text="添加队伍" to="/team/add" icon-color="#1989fa"/>
        <van-grid-item text="好友列表" to="/my/friends">
          <template #icon>
            <van-icon name="contact" size="23" style="margin-bottom: 8px;color: #0a0dd2"/>
          </template>
        </van-grid-item>
        <van-grid-item text="我的博文" to="/user/my/blogs">
          <template #icon>
            <van-icon class-prefix="my-icon" name="wofadetiezi" size="23" style="margin-bottom: 8px;color: #10d1d9"/>
          </template>
        </van-grid-item>
        <van-grid-item icon="fire" text="贴吧" to="/user/blogs" icon-color="#FF0000"/>
        <van-grid-item icon="lock" text="修改密码" to="/update/password" icon-color="#FF8000"/>
        <van-grid-item icon="setting" text="我的信息" to="/user/update" icon-color="＃C0C0C0"/>
      </van-grid>
      <div style="margin: 16px;">
        <van-button style="background-color:#f3f0f0 ;margin-left: 60px;margin-top: 10px;width: 220px; font-size: 16px"
                    round
                    type="default" native-type="submit"
                    @click="logout">
          退 出
        </van-button>
      </div>
    </template>

</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
//import qs from "qs";
import {getCurrentUser} from "../service/user.ts";
import {showFailToast, showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios.ts";

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
    //await router.replace("/user/login")
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

const toUserUpdatePage = () => {
  router.push("/user/update")
}

const toEditProfile = () => {
  router.push({
    path: "/user/edit",
    query: {
      editKey: "profile",
      editName: "个性签名",
      editValue: user.value.profile
    }
  })
}
const logout = async () => {
  let res = await myAxios.post("/user/logout");
  console.log(res)
  if (res.code === 0) {
    showSuccessToast("退出成功")
    await router.replace("/")
  } else {
    showFailToast("内部错误," + res.message)
  }
}
</script>

