<template>
  <van-collapse v-model="activeNames">
  <van-collapse-item title="邯郸市今日限行" name="1">  
    限行尾号 ：<van-tag type="danger">3，8</van-tag>
    单双号限行 ：<van-tag type="danger">单号限行  </van-tag>
  </van-collapse-item>
  <van-collapse-item title="峰峰市区今日限行" name="2">
    限行尾号 ：<van-tag type="danger">3，8</van-tag>
    单双号限行 ：<van-tag type="danger">单号限行  </van-tag>
  </van-collapse-item>
  <van-collapse-item title="磁县今日限行" name="3">
    限行尾号 ：<van-tag type="danger">3，8</van-tag>
    单双号限行 ：<van-tag type="danger">单号限行  </van-tag>
  </van-collapse-item>
</van-collapse>
</template>

<script>
import Vue from 'vue';
import { Collapse, CollapseItem,Tag, IndexAnchor  } from 'vant';
Vue.use(Collapse).use(CollapseItem).use(Tag).use(IndexAnchor);
export default {
  data() {
    return {
      activeNames: ['1','2','3']
    };
  }
};
</script>
