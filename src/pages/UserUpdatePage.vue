<template>
  <template v-if ="user">
    <van-cell icon="photo-o" title="头像" is-link center @click="toEditAvatar">
      <div>
        <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" preview-size="60px">
          <van-image class="my-van-image"
                     round
                     fit="cover"
                     width="2rem"
                     height="2rem"
                     :src="user.avatarUrl"
          />
        </van-uploader>
      </div>

    </van-cell>
    <van-cell icon="contact" title="账号"  :value="user.userAccount" />
    <van-cell icon="user-o" title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit( 'username',  '昵称', user.username)"/>
    <van-cell title="标签" to="/user/tag" is-link>
      <template #icon>
        <van-icon name="like-o" style="top: 5px;margin-left: 5px;right: 5px;color: #ff0000"/>
      </template>
    </van-cell>
    <van-cell title="个人简介" is-link @click="toEdit('profile','个性简介',user.profile)">
      <template #value>
        <van-text-ellipsis :content="user.profile || '还没有填写个性签名'"/>
      </template>
      <template #icon>
        <van-icon name="award-o" style="top: 5px;margin-left: 5px;right: 5px;color: #ffa600"/>
      </template>
    </van-cell>
    <van-cell title="性别" is-link :value="user.gender"  @click="()=>showPicker=true">
      <span v-if="user.gender===1">男</span>
      <span v-if="user.gender===0">女</span>
      <span v-if="user.gender===2">保密</span>
      <span v-if="user.gender === null">{{ "还没有填写性别" }}</span>
      <template #icon>
        <van-icon v-if="user.gender===1" name="user-circle-o"
                  style="top: 5px;margin-left: 5px;right: 5px;color: #0029ff"/>
        <van-icon v-if="user.gender===0" name="user-circle-o"
                  style="top: 5px;margin-left: 5px;right: 5px;color: #ff0000"/>
        <van-icon v-if="user.gender===2" name="user-circle-o" style="top: 5px;margin-left: 5px;right: 5px"/>
        <van-icon v-if="user.gender === null" name="info-o">{{ "还没有填写性别" }}</van-icon>
      </template>
    </van-cell>
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
          title="性别"
          :columns="genders"
          @confirm="onConfirmGender"
          @cancel="()=>showPicker=false"
      />
    </van-popup>
    <van-cell icon="phone-o" title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit( 'phone',  '电话', user.phone)" />
    <van-cell icon="send-gift-o" title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit( 'email',  '邮箱', user.email)"/>
    <van-cell icon="orders-o" title="编号" :value="user.userCode" />
    <van-cell icon="underway-o" title="注册时间" :value="user.createTime" />
  </template>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
//import qs from "qs";
import {getCurrentUser} from "../service/user.ts";
import {showFailToast, showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios.ts";
import {genders} from "../constants/gender.ts";

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
const showPicker = ref(false);
/*onMounted(async ()=>{
  user.value = await getCurrentUser();
})*/
async function getUser() {
  let currentUser = await getCurrentUser();
  if (currentUser) {
    user.value = currentUser
  } else {
    showFailToast("未登录")
//    await router.replace("/user/login")
  }
}

onMounted(async () => {
  await getUser();
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
const fileList = ref([]);
const afterRead = async () => {
  let formData = new FormData();
  formData.append("file", fileList.value[0].file)
  const res = await myAxios.post("/file/upload", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  console.log(res)
  if (res.code === 0) {
    showSuccessToast("更新成功")
    user.value.avatarUrl = res?.data
  } else {
    showFailToast("更新失败：" + res.data.message)
  }
  fileList.value = []
  console.log(res)
}


const onConfirmGender = async ({selectedValues}) => {
  const currentUser = await getCurrentUser();
  const res:any = await myAxios.put("/user/update", {
    id: currentUser.id,
    gender: selectedValues[0]
  })
  console.log(res)
  if (res?.code === 0) {
    showSuccessToast("修改成功")
  } else {
    showFailToast("修改失败")
  }
  showPicker.value = false
  await refresh()
};
const refresh = async () => {
  user.value = await getCurrentUser();
}
</script>

