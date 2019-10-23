<template>
  <div>
    <div>
      <table class="table table-responsive-sm table-borderless">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">标题</th>
            <th scope="col">作者</th>
            <th scope="col">分类</th>
            <th scope="col">标签</th>
            <th scope="col">时间</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-top border-bottom border-info" v-for="(item,i) in 10" :key="i">
            <th scope="row">10000</th>
            <td class="elli">记一次回家大萨达所大所大所大所大所大多所大萨达大所大所大所大所大所大</td>
            <td>时间旅客</td>
            <td>学习</td>
            <td>node</td>
            <td class="small">2019-10-01 15:37</td>
            <td class="d-flex justify-content-center">
              <button class="btn btn-info mr-2 btn-sm">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">3</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import AdminSide from "../system/adminSide";
export default {
  name: "arm", //文章管理
  components: {
    AdminSide
  }
};
</script>

<style lang="scss" scoped>
th {
  font-weight: 700;
}
th,
td {
  min-width: 160px;
  max-width: 160px;
}
</style>