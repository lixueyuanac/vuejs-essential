<template>
  <div class="navbar navbar-default topnav">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" @click="toggleNav">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

        <router-link to="/" class="navbar-brand">
          <span class="title">{{ logo.title }}</span>
          <img :src="logo.src" :alt="logo.title">
        </router-link>
      </div>

      <div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse', { in: showCollapsedNav }]">
        <ul class="nav navbar-nav">
          <li v-for="(item, index) in navList" :class="{ active: item.id === activeNavIndex }">
            <router-link :to="{name:'Home',query:{tag_id:item.id}}"  v-dropdown   @click="changeNavIndex(index)">{{ item.name }}</router-link>
            <ul v-if= "item.has_child === 1" class="dropdown-menu">
               <!-- 个人专栏 -->
              <li v-for="(child, childIndex) in item.Tag">
                <router-link :to="{name:'Home',query:{tag_id:child.id}}">
                  <i class="fa fa-lg" :class="generateClassName(index, childIndex)"></i>
                  {{ child.name }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>

          <!-- 入口组件 -->
        <div class="navbar-right">
          <!-- 搜索框 -->
          <!-- 搜索框 -->
          <SearchInput/>
          <TheEntry/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// 引入 TheEntry.vue 的默认值
import TheEntry from '@/components/layouts/TheEntry'
// 引入 SearchInput.vue
import SearchInput from '@/components/layouts/SearchInput'
// 接口
import { getTags } from '@/api/api'
export default {
  name: 'TheHeader',
  components: {
    TheEntry,
    // 注册搜索input
    SearchInput,
  },
  data() {
    return {
      logo: {
        src: `${this.uploadsUrl}sites/ByvFbNlQYVwhvTyBgLdqitchoacDNznN.jpg`,
        title: 'VuejsCaff'
      },
      navList: [],
      activeNavIndex: 0,
      showCollapsedNav: false
    }
  },
  beforeCreate() {
    this.uploadsUrl = 'https://cdn.learnku.com/uploads/'
    //console.log('aaaa')
    //this.getTagList({"parent_id":0})
  },
  watch: {
    '$route' (to, from) {
      // 查找列表
      this.getTagList({"parent_id":0})
      for ( let index in this.navList) {
        if (this.navList[index]['id'] === to.query.tag_id) {
          this.activeNavIndex =this.navList[index]['id']
          break;
        }else {
          for (let childIndex in this.navList[index]["Tag"]) {
            if (this.navList[index]["Tag"][childIndex]['id'] === to.query.tag_id) {
              this.activeNavIndex = this.navList[index]['id']
              break;
            }
          }
        }
      }
      // 对路由变化作出响应...

    }
  },
  mounted(){
    const params = {"parent_id":0};
    this.getTagList(params)
  },
  methods: {
    changeNavIndex(index) {
      this.activeNavIndex = index
    },
    toggleNav() {
      this.showCollapsedNav = !this.showCollapsedNav
    },
    async getTagList(params) {
      let lists = await getTags(params)
      this.navList = lists.data.lists
      console.log('TheHeader.vue:navList=====>',this.navList)
    },
    generateClassName(index,childIndex) {
      return 'fa-'+this.navList[index]["Tag"][childIndex]['icon_fontawesome']
    }
  }
}
</script>

<style scoped>
.title { display: none;}
.navbar-default .navbar-nav > .active > a { background: rgba(0,0,0,.03);}
</style>
