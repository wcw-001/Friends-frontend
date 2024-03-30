<script setup lang="ts">
import {showFailToast, showSuccessToast} from "vant";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.js";
import campusImage from "../assets/friend.png"

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
const toForget = () => {
  router.push("/forget")
}
</script>

<template>
  <div>
    <van-row justify="center">
      <van-image
          round
          width="10rem"
          height="10rem"
          :src=campusImage
          style="background-position:center;"
      />
    </van-row>
  </div>
  <div>
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
      <span style="right: 22px;position: fixed;font-size: 12px;color: #3c89fc;text-decoration: underline"
            @click="toForget">忘记密码?</span>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登入
        </van-button>
        <van-button style="margin-top: 10px;background-color: #4e7abe;color: white" round block type="default"
                    native-type="submit"
                    to="/user/signup">
          注 册
        </van-button>
      </div>
    </van-form>
  </div>

</template>

<style scoped>

</style>


<style scoped>

</style>