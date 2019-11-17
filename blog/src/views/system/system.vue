<template>
  <div>
    <div>
      <div class="row mb-2">
        <div class="col-12 text-left">
          <h3>
            <i class="fa fa-bar-chart"></i>
            内容统计
          </h3>
        </div>
      </div>
      <div class="row text-left mb-2">
        <div
          class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 mb-2 mb-md-3 mb-lg-3"
          v-for="(item,i)  in count"
          :key="i"
        >
          <div class="card my_shadow">
            <div class="card-body">
              <h5 class="card-title f18 font-weight-bold">
                <i :class="'text-info fa mr-1 '+item.icon"></i>
                {{item.title}}
              </h5>
              <p class="card-text f18" v-text="item.count"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-lg-4 col-xl-4">
          <h3 class="text-left">
            <i class="fa fa-bar-chart"></i>
            文章占比
          </h3>
          <div id="circleChart" ref="circleChart" class="w-100" style="height:300px"></div>
        </div>
        <div class="col-12 col-lg-8 col-xl-8">
          <h3 class="text-left">
            <i class="fa fa-bar-chart"></i>
            七日增长折线图
          </h3>
          <div id="myCharts" ref="chart" class="w-100" style="height:300px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSide from "../system/adminSide";
const echarts = require("echarts");
export default {
  name: "cm",
  data() {
    return {
      count: [
        { title: "文章总数", count: 0, icon: "fa-folder" },
        { title: "相册总数", count: 0, icon: "fa-area-chart" },
        { title: "留言总数", count: 0, icon: "fa-comments" },
        { title: "友链总数", count: 0, icon: "fa-link" }
      ],
      cateCount: [], //每个分类下的文章数
      dateList: [], //当前时间前七天的日期数组
      dateCount: [], //当前时间前七天文章每天的增长数
      userCount: [] //当前时间前七天用户每天的增长数
    };
  },
  created() {
    // this.dataList=this.getDate()
  },
  mounted() {
    if (sessionStorage.getItem("count")) {
      let data = JSON.parse(sessionStorage.getItem("count"));
      this.count[0].count = data.articleCount;
      this.count[1].count = data.albumCount;
      this.count[2].count = data.leaveMsgCount;
      this.count[3].count = data.flinkCount;
      this.cateCount = data.cateCount;
      this.initCircleChart();
    } else {
      this.$http("getAllCount?adm=1", res => {
        if (res.data.code === 200) {
          sessionStorage.setItem("count", JSON.stringify(res.data.data));
          let data = res.data.data;
          this.count[0].count = data.articleCount;
          this.count[1].count = data.albumCount;
          this.count[2].count = data.leaveMsgCount;
          this.count[3].count = data.flinkCount;
          this.cateCount = data.cateCount;
          this.initCircleChart();
        }else{
          this.$toast('未能获取数据')
        }
      });
    }
    this.getUp(res => {
      this.dateList = res.data.dateList;
      this.dateCount = res.data.count.A;
      this.userCount = res.data.count.U;
      this.initCharts();
    });
  },
  methods: {
    initCharts() {
      let myChart = echarts.init(this.$refs.chart);
      myChart.setOption({
        legend: {
          data: ["用户增长", "文章增长"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.dateList,
          triggerEvent: true
        },
        yAxis: {
          type: "value",
          minInterval: 1,
          splitNumber: 7
        },
        tooltip: {
          trigger: "axis"
        },
        series: [
          {
            name: "文章增长",
            data: this.dateCount,
            type: "line",
            smooth: true
          },
          {
            name: "用户增长",
            type: "line",
            data: this.userCount,
            smooth: true
          }
        ]
      });
    },
    initCircleChart() {
      let arr = [];
      this.cateCount.forEach(item => {
        arr.push({ name: item.name, value: item.count });
      });
      let myChart = echarts.init(this.$refs.circleChart);
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          // orient: "vertical",
          left: "left",
          data: ["相册", "学习", "随笔"]
        },
        series: [
          {
            name: "文章类别",
            type: "pie",
            radius: "55%",
            // center: ["50%", "60%"],
            data: arr,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    getUp(callback) {
      this.$http("getUp", res => {
        if (res.data.code === 200) {
          callback(res.data);
        }
      });
    }
  },
  components: {
    AdminSide
  }
};
</script>

<style lang="scss" scoped>
.my_shadow {
  box-shadow: #999 2px 2px 3px;
}
</style>