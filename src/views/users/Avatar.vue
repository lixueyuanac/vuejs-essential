<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
        <div class="panel-body">
            <h2><i class="fa fa-picture-o"></i> 请输入头像地址</h2>
        <hr>
        <div data-validator-form>
<!--           <div class="form-group">
            <label>头像预览：</label>
            <div>
              <img :src="avatar" class="avatar-preview-img">
            </div>
          </div> -->
          <div class="form-group">
                <ImgUpload @uploadImg="handlerUploadImg" class="dg-flex-1" sync="1">
                    <div class="dg-display-flex dg-align-items-center">
                        <span class="dg-flex-1" style="cursor:hand">点击上传头像</span>
                        <img :src="avatar" @click.stop="handlerPreview">
                    </div>
                </ImgUpload>
            <div class="clearfix"></div>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-lg btn-primary" @click="updateAvatar">上传头像</button>
          </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import {getUser} from '@/api/api'
export default {
  name: 'EditAvatar',
  data() {
    return {
      avatar: '', // 头像地址
      user:'',
      dialog: {
        vis: false
      },
      cropperConfig: {
          img: ''
      },
      preview: null
    }
  },
  // 在实例创建完成后，初始化头像地址的值
  async created() {
     // 获取仓库的用户信息
    const returnList = await getUser()
    console.log(returnList)
    this.user = returnList.data
    const user = this.user
    if (user && typeof user === 'object') {
      // 将仓库的用户头像赋值给当前头像地址
      this.avatar = user.avatar
    }
  },
  methods: {
    updateAvatar() {
      const avatar = this.avatar

      // 如果头像地址不为空
      if (avatar) {
        // 新建一个 Image 的实例
        let img = new Image()
        // 加载成功时，上传图片
        img.onload = () => {
          //this.$store.dispatch('updateUser', { avatar })
          this.$message.show('上传成功')
        }
        // 加载失败时，只显示一个失败的提示
        img.onerror = () => {
          this.$message.show('上传失败', 'danger')
        }
        // 指定图片地址
        img.src = avatar
      }
    },
    handlerUploadImg (data) {
      this.cropperConfig.img = data.img
      this.dialog.vis = true
      this.avatar = data.img
    },
    handlerPreview () {
            this.preview = this.$createImagePreview({
                imgs: [this.user.avatar]
            }).show()
    }
  }
}
</script>

<style scoped>
.avatar-preview-img { min-width: 200px; min-height: 200px; max-width: 50%;}
</style>
