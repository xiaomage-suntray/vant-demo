<template>
  <van-collapse v-model="activeNames" v-loading="dataListLoading">
  <van-collapse-item :title="row.city+'天气情况'" :name="index" v-for="(row,index) in dataList" :key="index">  
     <van-tag type="success">实时天气情况：</van-tag><br>
    天气 ：{{row.weather}}----
    温度 ：{{row.temperature}} °C
    <br>
    风向 ：{{row.winddirection}}----
    风力 ：{{row.windpowe}}
    <br>
    湿度 ：{{row.humidity}}----
    数据更新时间：{{row.reporttime}}
    <br>
     <van-tag type="success">天气预报：</van-tag>
    <br>
    <div v-for="(rowd,indexd) in row.casts" :key="indexd">
      <van-tag type="primary">日期 ：{{rowd.date}} ----周 ：{{rowd.week}} 
      </van-tag>
      <br>
      白天天气 ：{{rowd.dayweather}}----
      晚上天气：{{rowd.nightweather}} <br>
      白天温度：{{rowd.daytemp}}°C----
      晚上温度：{{rowd.nighttemp}}°C
       <br>
      白天风向：{{rowd.daywind}}----
      晚上风向：{{rowd.nightwind}}<br>
      白天风力：{{rowd.daypower}}----
      晚上风力：{{rowd.nightpower}}
    </div>
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
      activeNames: [0],
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
        url: this.$http.adornUrl('/weatherinfo/listAll'),
        method: 'post',
        params: this.$http.adornParams({})
      }).then((data) => {
        if (data && data.code === 0) {
          this.dataList = data.list
          // for(var i = 0 ;i<this.dataList.length;i++){
          //   this.activeNames.push(i);
          // }
        } else {
          this.dataList = []
        }
        this.dataListLoading = false
      })
    },
  }
};
</script>
