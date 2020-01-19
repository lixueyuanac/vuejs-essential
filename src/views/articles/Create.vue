<template>
  <div class="blog-container">
    <div class="blog-pages">
      <div class="col-md-12 panel">
        <div class="panel-body">
          <h2 class="text-center">{{ articleId ? '编辑文章' : '创作文章' }}</h2>
          <hr>
          <div data-validator-form>
            <div class="form-group">
              <input v-model.trim="title" v-validator.required="{ title: '标题' }" type="text" class="form-control" placeholder="请填写标题" @input="saveTitle">
            </div>
            <div class="form-group">
              <input v-model.trim="desc" v-validator.required="{ title: '描述' }" type="text" class="form-control" placeholder="请填写描述" @input="saveDesc">
            </div>
            <div class="form-group">
              <div class="aaa-left">
                <div class="select-left">
                  <select class="form-control" @change="selectTag" v-model="indexList">
                    <option value="0" disabled="disabled">请选择</option>
                    <option :value="item.id" v-for="(item,index) in tagList">{{ item.name}}</option>
                  </select>
                </div>

                <div class="select-right">
                  <select class="form-control" v-model="indexList2">
                    <option value="0" disabled="disabled">请选择</option>
                    <option :value="item.id" v-for="(item,index) in tagListChild">
                      {{item.name}}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group" style="margin-top:65px">
              <textarea id="editor"></textarea>
            </div>
            <br>
            <div class="form-group">
              <button class="btn btn-primary" type="submit" @click="post">发 布</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//npm install simplemde --save
import SimpleMDE from 'simplemde'
// 引入 highlight.js 的默认值
//npm install highlight.js --save
import hljs from 'highlight.js'

import ls from '@/utils/localStorage'
// 请求接口
import { article, addArticle, modifyArticle,getTags } from '@/api/api'
// 添加全局变量
window.hljs = hljs

export default {
  name: 'Create',
  // 添加相关数据
  data() {
    return {
      //article :[],
      title: '', // 文章标题
      desc: '', // 文章描述
      content: '', // 文章内容
      articleId: undefined, // 文章 ID
      tagList :[],
      tagListChild:[],
      indexList:0,
      indexList2:0,
      indexNum:0,
    }
  },
   beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setArticleId(vm.$route.params.articleId)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.clearData()
    next()
  },
  watch: {
    '$route'(to) {
      // 清空自动保存的文章数据
      this.clearData()
      // 设置 articleId
      this.setArticleId(to.params.articleId)
    }
  },
  mounted() {
    const simplemde = new SimpleMDE({
      element: document.querySelector('#editor'),
      placeholder: '请使用 Markdown 格式书写 ;-)，代码片段黏贴时请注意使用高亮语法。',
      spellChecker: false,
      autoDownloadFontAwesome: false,
      autosave: {
        enabled: true,
        uniqueId: 'vuejs-essential'
      },
      renderingConfig: {
        codeSyntaxHighlighting: true
      }
    })
    // 监听编辑器的 change 事件
    simplemde.codemirror.on('change', () => {
      // 将改变后的值赋给文章内容
      this.content = simplemde.value()
    })

    // 将 simplemde 添加到当前实例，以在其他地方调用
    this.simplemde = simplemde
    // 初始化标题和内容
    this.fillContent()
    // 初始化下拉框
    this.fillTags()
  },
  methods: {
    // 编辑器只会自动保存文章的内容，我们需要自己保存文章的标题
    saveTitle() {
      ls.setItem('smde_title', this.title)
    },
    saveDesc() {
      ls.setItem('smde_desc', this.desc)
    },
    async fillContent(articleId) {
      const simplemde = this.simplemde
      const smde_title = ls.getItem('smde_title')
      const smde_desc = ls.getItem('smde_desc')
      // 如果 localStorage 有标题数据，使用它作为文章标题
      if (articleId !== undefined) {
        var articles = await article(articleId) // 请求接口获取数据
        console.log(articles)
        if (articles) {
          const {title, desc, content} = articles.data
          this.title = smde_title || title
          this.desc = smde_desc || desc
          this.content = simplemde.value() || content
          simplemde.value(this.content)
        }
      } else {
        this.title = smde_title
        this.content = simplemde.value()
      }
    },
    async fillTags(){
      let lists = await getTags({'parent_id':0});
      this.tagList = lists.data.lists
    },
    async post() {
      const title = this.title
      const content = this.content
      const desc = this.desc
      // 如果标题和内容都不为空，提交发布
      if (title !== '' && content.trim() !== '') {
        const article = {
          'tag_id':this.indexList2==0?this.indexList:this.indexList2,
          'title':title,
          'content':content,
          'desc':desc,
          'created_on':Date.parse(new Date()),
          'created_by':'站长',
        }

         // 在控制台输出当前文章
        console.log(article,this.articleId)
        if (this.articleId !== undefined) { // 编辑
         let result = await modifyArticle(this.articleId, article)
         if (result.code === 200) {
            //this.$message.show('修改成功')
            this.$router.push({name:'Content'})
         }
        } else {
           let result = await addArticle(article)
           console.log('addArticle ===>',result.data.id);
           const articleId = result.data.id
          if (result.code === 200){
            this.$message.show('添加成功')
            this.$router.push({name:'Content', params:{articleId:articleId}})
          } else {
            this.$message.show('添加失败')
          }

          // 提交
        }
        //this.$store.dispatch('post', { article,  articleId: this.articleId  })

        // 清除数据
        //this.clearData()
      }
    },
    clearData() {
      this.title = ''
      this.desc = ''
      ls.removeItem('smde_title')
      ls.removeItem('smde_desc')
      // 清除编辑的内容
      this.simplemde.value('')
      // 清除编辑器自动保存的内容
      this.simplemde.clearAutosavedValue()
    },
    setArticleId(articleId) {

      const localArticleId = ls.getItem('articleId') // 旧的文章id
      //console.log(localArticleId)

      if (articleId !== undefined && !(articleId === localArticleId)) { // 如果存在articleId 并且和旧的articleId不一样则清除旧的后重新读取
        this.clearData()
      }

      this.articleId = articleId
      this.fillContent(articleId)
      ls.setItem('articleId', articleId)
    },
    selectTag(){
       let i = 0;
        for (i = 0;i<this.tagList.length;i++) {
          if (this.tagList[i].id == this.indexList){
            this.indexNum = i;
            break
          }else{
            this.indexList2=0
          }
        }
        this.indexList2 = this.tagList[this.indexNum]['Tag'][0] ?this.tagList[this.indexNum]['Tag'][0].id :0
        this.tagListChild = this.tagList[this.indexNum]['Tag'];
    }
  }
}
</script>

<style scoped>
.blog-container { max-width: 980px; margin: 0 auto; margin-top: 20px;}
textarea { height: 200px; }

.select-left {
  width:48%;
  float:left;
}
.select-middle{
  width:20px;
  float:left;

}
.select-right {
  margin-left:4%;
  width:48%;
  float:left;

}
</style>
