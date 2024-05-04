<script setup lang="ts">
import { ref } from 'vue';
import {useRouter} from "vue-router";
//import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";
const searchText = ref('');
const userDefinedTag = ref("")
//已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);
const router = useRouter();
const addUserDefinedTag = () => {
  if (userDefinedTag.value !== "") {
    activeIds.value.push(userDefinedTag.value)
    userDefinedTag.value = ""
  } else {
    showFailToast("请先输入标签名")
  }
}
const originTagList = [
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
      { text: '保密', id: '保密'}
    ],
  },
  {
    text: '年级',
    children: [
      { text: '高一', id: '高一' },
      { text: '高二', id: '高二' },
      { text: '高三', id: '高三' },
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
      { text: '大三', id: '大三' },
      { text: '大四', id: '大四' },
      { text: '研究生', id: '研究生'},
      { text: '已工作', id: '已工作'},
    ],
  },
  {
    text: '编程',
    children: [
      {text: "Java", id: "Java"},
      {text: "Python", id: "Python"},
      {text: "C++", id: "C++"},
      {text: "JavaScript", id: "JavaScript"},
      {text: "Ruby", id: "Ruby"},
      {text: "PHP", id: "PHP"},
      {text: "Swift", id: "Swift"},
      {text: "Objective-C", id: "Objective-C"},
      {text: "C#", id: "C#"},
      {text: "Go", id: "Go"},
      {text: "Kotlin", id: "Kotlin"},
      {text: "TypeScript", id: "TypeScript"},
      {text: "Rust", id: "Rust"},
      {text: "Lua", id: "Lua"},
      {text: "Perl", id: "Perl"},
      {text: "Scala", id: "Scala"},
      {text: "Dart", id: "Dart"},
      {text: "R", id: "R"},
      {text: "MATLAB", id: "MATLAB"},
      {text: "Haskell", id: "Haskell"},
      {text: "Julia", id: "Julia"},
      {text: "Groovy", id: "Groovy"},
      {text: "Shell", id: "Shell"},
      {text: "Assembly", id: "Assembly"},
      {text: "F#", id: "F#"},
      {text: "Clojure", id: "Clojure"},
      {text: "Erlang", id: "Erlang"},
      {text: "Lisp", id: "Lisp"},
      {text: "Prolog", id: "Prolog"},
      {text: "Smalltalk", id: "Smalltalk"}
    ],
  },
  {
    text: '兴趣爱好',
    children: [
      {text: '阅读', id: '阅读'},
      {text: '旅游', id: '旅游'},
      {text: '游戏', id: '游戏'},
      {text: '音乐', id: '音乐'},
      {text: '电影', id: '电影'},
      {text: '美食', id: '美食'},
      {text: '健身', id: '健身'},
      {text: '编程', id: '编程'},
    ],
  }
]

let tagList = ref(originTagList);
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const temParentTag = {...parentTag};
    temParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return temParentTag;
  });
};

const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  });
};
const doSearchResult = () => {
  router.push({
    path: "/user/list",
    query: {
      tags: activeIds.value
    }
  })
}

</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="center">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>

  <van-row gutter="8">
    <van-col v-for="tag in activeIds">
      <van-tag  closeable TagSize="small" type="primary" @close="doClose(tag)">
        {{tag}}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="center">选择自定义标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <van-divider content-position="center">自定义标签</van-divider>
  <van-cell-group inset>
    <van-field v-model="userDefinedTag" placeholder="请添加标签">
      <template #button>
        <van-button round size="small" type="success" @click="addUserDefinedTag" icon="passed">添加</van-button>
      </template>
    </van-field>
  </van-cell-group>

  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>

</template>

<style scoped>

</style>
