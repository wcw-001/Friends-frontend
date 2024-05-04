<template>
    <van-empty
        v-if="(!blogList || blogList.length===0) && loading===false"
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        image-size="80"
        description="您关注的用户没有更新"
    />
    <van-loading vertical v-if="loading">
        <template #icon>
            <van-icon name="star-o" size="30"/>
        </template>
        加载中...
    </van-loading>
    <blog-card-list v-if="blogList.length>0" :blog-list="blogList"/>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import BlogCardList from "../components/BlogCardList.vue";

const loading = ref(true)
const blogList = ref([])
onMounted(async () => {
    let res = await myAxios.get("/message/blog");
    if (res?.code === 0) {
        blogList.value = res.data
    }
    loading.value = false
})
</script>

<style scoped>

</style>
