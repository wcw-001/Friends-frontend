<script setup lang="ts">
import {showFailToast, showSuccessToast} from "vant";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.js";
const userAccount = ref('');
const userPassword = ref('');
const router = useRouter();
const route = useRoute();
const onSubmit = async () => {
  const res = await myAxios.post('/user/login',{
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  console.log(res,'用户登录');
  if(res.code ===0 && res.data){
    showSuccessToast('登录成功');
    //跳转到之前的页面
    const redirectUrl = route.query?.redirect as string ?? '/';
    window.location.href = redirectUrl;
  }else{
    showFailToast('登录失败')
  }
};
</script>

<template>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="userAccount"
            name="userAccount"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="userPassword"
            type="password"
            name="userPassword"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
</template>

<style scoped>

</style>


<style scoped>

</style>