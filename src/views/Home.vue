<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

    <!-- 帖子列表 -->
    <div class="col-md-9 topics-index main-col">
      <div class="panel panel-default">
        <div class="panel-heading">
          <ul class="list-inline topic-filter">
            <li><a href="/topics?filter=default" class="active">活跃</a></li>
            <li><a href="/topics?filter=excellent">精华</a></li>
            <li><a href="/topics?filter=vote">投票</a></li>
            <li><a href="/topics?filter=recent">最近</a></li>
            <li><a href="/topics?filter=noreply">零回复</a></li>
          </ul>
          <div class="clearfix"></div>
        </div>

        <div class="panel-body remove-padding-horizontal">
          <ul class="list-group row topic-list">
            <li v-for="article in articles" :key="article.articleId" class="list-group-item">
              <router-link :to="`/articles/${article.id}/content`" tag="div" class="reply_count_area hidden-xs pull-right">
                <div class="count_set">
                  <span class="count_of_votes" title="投票数">{{ article.likeUsers ? article.likeUsers.length : 0 }}</span>
                  <span class="count_seperator">/</span>
                  <span class="count_of_replies" title="回复数">{{ article.comments ? article.comments.length : 0 }}</span>
                  <span class="count_seperator">|</span>
                  <abbr class="timeago">{{ article.date | moment('from') }}</abbr>
                </div>
              </router-link>
              <router-link :to="`/${article.uname}`" tag="div" class="avatar pull-left">
                <img :src="article.uavatar" class="media-object img-thumbnail avatar avatar-middle">
              </router-link>
              <router-link :to="`/articles/${article.id}/content`" tag="div" class="infos">
                <div class="media-heading">
                  {{ article.title }}
                </div>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 分页组件 -->
        <div class="panel-footer text-right remove-padding-horizontal pager-footer">
          <Pagination :currentPage="currentPage" :total="total" :pageSize="pageSize" :onPageChange="changePage" />
        </div>
      </div>
    </div>

    <!-- 侧栏 -->
    <TheSidebar/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入 TheSidebar.vue 的默认值
import TheSidebar from '@/components/layouts/TheSidebar'

// 获取接口
import {articles} from '@/api/api'
export default {
  name: 'Home',
  components:{
    // 局部注册TheSidebar
    TheSidebar
  },
  data() {
    return {
      msg: '',
      msgType: '',
      msgShow: false,
      articles: [],
      filter: 'default',
      filters: [
        { filter: 'default', name: '活跃', title: '最后回复排序'},
        { filter: 'excellent', name: '精华', title: '只看加精的话题'},
        { filter: 'vote', name: '投票', title: '点赞数排序'},
        { filter: 'recent', name: '最近', title: '发布时间排序'},
        { filter: 'noreply', name: '零回复', title: '无人问津的话题'}
      ],
      total: 0, // 文章总数
      pageSize: 20, // 每页条数
      lists:[],
    }
  },
  beforeRouteEnter(to, from, next) {
    const fromName = from.name
    const logout = to.params.logout

    next(vm => {
      if (vm.$store.state.auth) {
        switch (fromName) {
          case 'Register':
            vm.showMsg('注册成功')
            break
          case 'Login':
            vm.showMsg('登录成功')
            break
        }
      } else if (logout) {
        vm.showMsg('操作成功')
      }
      //console.log('Home router to===========>',to.query)
      vm.setDataByFilter(to.query)
    })
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
  watch: {
    auth(value) {
      if (!value) {
        this.showMsg('操作成功')
      }
    },
    '$route'(to) {
      console.log('Home router to===========>',to.query)
      this.setDataByFilter(to.query)
    }
  },
  methods: {
    showMsg(msg, type = 'success') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    },
    async setDataByFilter(filter = 'default') {
      let params = {page:this.currentPage,page_size:this.pageSize};
      if (filter['tag_id']) {
        params['tag_id'] = filter['tag_id']
      }
      this.lists = await articles(params)
      this.articles = this.lists.data.list
      console.log(this.lists)
      // 每页条数
      const pageSize = this.pageSize
      // // 当前页
      const currentPage = this.currentPage
      // // 过滤后的所有文章
      // const allArticles = this.$store.getters.getArticlesByFilter(filter)

      // this.filter = filter
      // // 文章总数
      this.total = this.lists.data.total
      // // 当前页的文章
      // this.articles = allArticles.slice(pageSize * (currentPage - 1), pageSize * currentPage)
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
