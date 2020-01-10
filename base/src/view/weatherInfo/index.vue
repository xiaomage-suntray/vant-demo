<template>
  <van-collapse v-model="activeNames">
  <van-collapse-item title="邯郸市天气预报" name="1">  
    天气 ：<van-tag type="primary">晴</van-tag>
    温度 ：<van-tag type="primary">晴  </van-tag>
    风向 ：<van-tag type="primary">东北风  </van-tag>
    风力 ：<van-tag type="primary">3</van-tag>
    湿度 ：<van-tag type="primary">68  </van-tag>
    数据更新时间：<van-tag type="primary">2020-01-08 14:32:39</van-tag>
  </van-collapse-item>
  <van-collapse-item title="峰峰市区天气预报" name="2">
    天气 ：<van-tag type="primary">晴</van-tag>
    温度 ：<van-tag type="primary">晴  </van-tag>
    风向 ：<van-tag type="primary">东北风  </van-tag>
    风力 ：<van-tag type="primary">3</van-tag>
    湿度 ：<van-tag type="primary">68  </van-tag>
    数据更新时间：<van-tag type="primary">2020-01-08 14:32:39</van-tag>
  </van-collapse-item>
  <van-collapse-item title="磁县天气预报" name="3">
    天气 ：<van-tag type="primary">晴</van-tag>
    温度 ：<van-tag type="primary">晴  </van-tag>
    风向 ：<van-tag type="primary">东北风  </van-tag>
    风力 ：<van-tag type="primary">3</van-tag>
    湿度 ：<van-tag type="primary">68  </van-tag>
    数据更新时间：<van-tag type="primary">2020-01-08 14:32:39</van-tag>
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
      activeNames: ['1']
    };
  }
};
</script>
