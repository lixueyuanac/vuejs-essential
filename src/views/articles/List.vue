<template>
  <div class="col-md-9 left-col pull-right">
    <div class="panel article-body article-index">
      <div class="panel-body">
        <h1 class="all-articles">
          专栏文章
          <router-link v-if="auth" to="/articles/create" class="btn btn-primary pull-right">
            <i class="fa fa-paint-brush"></i>
            创作文章
          </router-link>
        </h1>

        <ul class="list-group">
          <!-- 使用 v-for 指令渲染文章列表 -->
          <li v-for="article in articles" class="list-group-item">
            <img :src="article.avatar" class="avatar avatar-small">
            <router-link :to="`/articles/${article.id}/content`" class="title">
              {{ article.title }}
            </router-link>
            <span class="meta pull-right">
              <span class="timeago">{{ article.date | moment('from') }}</span>
            </span>
          </li>
        </ul>
         <!-- 分页组件 -->
        <div class="panel-footer text-right remove-padding-horizontal pager-footer">
          <Pagination :currentPage="currentPage" :total="total" :pageSize="pageSize" :onPageChange="changePage" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserByUserName,articles } from '@/api/api'
export default {
  name: 'List',
  data() {
    return {
      articles: [], // 对应用户文章
      total: 0, // 文章总数
      pageSize: 20, // 每页条数
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 确认渲染该组件的对应路由时，获取对应用户文章
      vm.setDataListByParams(to.params.user)
    })
  },
  watch: {
    '$route'(to) {
      // 在子页面之间相互切换时，通过 to.params 参数设置用户和文章数据
      this.setDataListByParams(to.params.user)
    }
  },
  computed: {
    ...mapState([
      'auth',
      'user'
    ]),
    // 当前页，从查询参数 page 返回
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    }
  },
  methods:{
    async setDataListByParams(user){
      console.log(this.currentPage)
      let returnUserData = await getUserByUserName(user)
      console.log(returnUserData)
      let returnArticleData = await articles({'uid':returnUserData['data']['id'],'page':this.currentPage,'page_size':this.pageSize})

      this.articles = returnArticleData['data']["list"]
      this.total = returnArticleData['data']['total']
    },
    // 回调，组件的当前页改变时调用
    changePage(page) {
      // 在查询参数中混入 page，并跳转到该地址
      // 混入部分等价于 Object.assign({}, this.$route.query, { page: page })
      this.$router.push({ query: { ...this.$route.query, page } })
    }
  }
}
</script>

<style scoped>

</style>
