<template>
  <div>
    <van-cell center>
      <template #title>
        <span style="font-size: 20px;font-weight: bold;margin-left: 16px">您好{{
            username
          }}，请牢记密码哦❤️</span>
      </template>
    </van-cell>
    <van-field
        v-model="password"
        required
        type="password"
        label="新密码"
        placeholder="请输入新密码"
        :rules="[{ required: true, message: '请填写密码' }]"
    />
    <van-field
        v-model="newPassword"
        required
        type="password"
        label="新密码"
        placeholder="请输入新密码"
        :rules="[{ required: true, message: '请填写密码' }]"
    />
    <van-field
        v-model="checkPassword"
        required
        type="password"
        label="确认新密码"
        placeholder="请输入新密码"
        :rules="[{ validator, message: '两次输入的密码不一致' }]"
    />
    <div style="margin: 30px 16px 16px;">
      <van-button style="margin-top: 10px" round block type="primary" @click="confirmUpdate">
        确认
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";

const checkPassword = ref('')
const newPassword = ref('');
let router = useRouter();
const password = ref()
const validator = () => {
  return newPassword.value === checkPassword.value;
}
const username = ref("")

// const checkCode = async () => {
//     let res = await myAxios.get("/user/check?password=" + password.value + "&code=" + code.value);
//     if (res?.data.code === 0) {
//         two.value = false
//         three.value = true
//     } else {
//         showFailToast("失败" + (res.data.description ? `,${res.data.description}` : ''))
//     }
// }
const confirmUpdate = async () => {
  let res = await myAxios.post("/user/update/password", {
    userPassword: password.value,
    // code: code.value,
    newPassword: newPassword.value,
    checkPassword: checkPassword.value
  });
  if (res.code === 0) {
    showSuccessToast("修改成功")
    await router.replace("/user")
  } else {
    showFailToast("失败" + (res.message ? `,${res.message}` : ''))
  }
}
</script>

<style scoped>

</style>