<template>
  <van-collapse v-model="activeNames">
    <van-collapse-item :title="row.cityname+'限行规则'" name="1" v-for="(row,index) in dataList" :key="index">  
      <van-tag type="danger">{{row.rules}}</van-tag> 
    </van-collapse-item>
    <!-- <van-collapse-item title="峰峰市区今日限行" name="2">
      限行尾号 ：<van-tag type="danger">3，8</van-tag>
      单双号限行 ：<van-tag type="danger">单号限行  </van-tag>
    </van-collapse-item>
    <van-collapse-item title="磁县今日限行" name="3">
      限行尾号 ：<van-tag type="danger">3，8</van-tag>
      单双号限行 ：<van-tag type="danger">单号限行  </van-tag>
    </van-collapse-item> -->
  </van-collapse>
</template>

<script>
import Vue from 'vue';
import { Collapse, CollapseItem,Tag, IndexAnchor  } from 'vant';
Vue.use(Collapse).use(CollapseItem).use(Tag).use(IndexAnchor);
export default {
  data() {
    return {
      activeNames: ['1','2','3'],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataList:[],
      dataListLoading:false,
    };
  },
   created () {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/carNumberLimit/list'),
        method: 'post',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'type': 1
        })
      }).then((data) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list
        } else {
          this.dataList = []
        }
        this.dataListLoading = false
      })
    },
  }
};
</script>
