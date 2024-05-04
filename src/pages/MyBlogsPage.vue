<template>
  <div style="position: relative;height: 100%;width: 100%">
    <van-tabs v-model:active="active">
      <van-tab>
        <van-pull-refresh
            v-model="refreshLoading"
            success-text="刷新成功"
            @refresh="blogRefresh">
          <van-search v-model="blogSearch" placeholder="请输入搜索关键词" shape="round" @search="searchBlog"/>
          <van-list
              v-model:loading="listLoading"
              :finished="blogListFinished"
              offset="0"
              @load="blogLoad"
              style="margin: 15px"
          >
            <template #finished>
              <van-empty :image-size="[60, 40]" v-if="!searching">🌈没有更多博文了</van-empty>
            </template>
            <blog-card-list :blog-list="blogList"/>
          </van-list>
          <van-back-top right="20px" bottom="60px"/>
          <van-empty v-if="(!blogList ||　blogList.length===0) && !listLoading &&!searching" image="search"
                     description="暂无博文"/>
        </van-pull-refresh>
      </van-tab>
      <van-loading vertical v-if="searching">
        <template #icon>
          <van-icon name="star-o" size="30"/>
        </template>
        加载中...
      </van-loading>
    </van-tabs>
  </div>


</template>
<script setup lang="ts">
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";
import BlogCardList from "../components/BlogCardList.vue";

const searching = ref(false)
const listLoading = ref(false)
const listFinished = ref(false)
const userList = ref([])
const refreshLoading = ref(false)
const currentPage = ref(0)
const userSearch = ref("")
const active = ref(0)
const blogList = ref([])
const blogListFinished = ref(false)
const blogCurrentPage = ref(0)

const blogLoad = async () => {
  blogCurrentPage.value++
  await getBlogList(blogCurrentPage.value)
}

const getBlogList = async (currentPage) => {
  let res = await myAxios.get("/blog/list/my/blog", {
    params: {
      currentPage: currentPage,
      title: blogSearch.value
    }
  });
  if (res?.code === 0) {
    if (res.data.records.length > 0) {
      res.data.records.forEach(item => blogList.value.push(item))
    } else {
      blogListFinished.value = true
    }
    listLoading.value = false
  }
}

async function getUserList(currentPage) {
  const userListData = await myAxios.get("/user/match", {
    params: {
      currentPage: currentPage,
      username: userSearch.value
    }
  })
  if (userListData?.code === 0) {
  } else {
    showFailToast("加载失败")
  }

  if (userListData?.data.records.length === 0) {
    listFinished.value = true
    return
  }
  if (userListData?.data.records) {
    userListData.data.records.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    for (let i = 0; i < userListData.data.records.length; i++) {
      userList.value.push(userListData.data.data.records[i])
    }
  }
}

const onLoad = async () => {
  currentPage.value++
  await getUserList(currentPage.value)
  listLoading.value = false;
}
const onRefresh = async () => {
  currentPage.value = 1
  userList.value = []
  listFinished.value = false
  await getUserList(currentPage.value)
  refreshLoading.value = false
  listLoading.value = false;
}

const blogRefresh = async () => {
  blogCurrentPage.value = 1
  blogList.value = []
  blogListFinished.value = false
  await getBlogList(blogCurrentPage.value)
  refreshLoading.value = false
  listLoading.value = false
}
const searchUser = async () => {
  searching.value = true
  userList.value = []
  currentPage.value = 1
  await getUserList(currentPage.value)
  searching.value = false
}
const blogSearch = ref("")
const searchBlog = async () => {
  searching.value = true
  blogList.value = []
  blogCurrentPage.value = 1
  await getBlogList(blogCurrentPage.value)
  searching.value = false
}
</script>
<style scoped>


</style>
