<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">


      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请登录</h3>
        </div>

        <div class="panel-body" data-validator-form>
          <div class="form-group">
            <label class="control-label">用户名</label>
            <input v-model.trim="username" v-validator.required="{ title: '用户名' }" type="text" class="form-control" placeholder="请填写用户名">
          </div>
          <div class="form-group">
            <label class="control-label">密码</label>
            <input v-model.trim="password" id="password" v-validator.required="{ title: '密码' }" type="password" class="form-control" placeholder="请填写密码">
          </div>
          <br>
          <div class="form-group" @click="login">
            <button  type="submit" class="btn btn-lg btn-success btn-block">
              <i class="fa fa-btn fa-sign-in"></i> 登录
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from '@/api/api'
import ls from '@/utils/localStorage'
export default {
  name: 'Login',
  data() {
    return {
      username: '', // 用户名
      password: '', // 密码
    }
  },
  methods: {
    login(e) {
      this.$nextTick(() => {
        const target = e.target.type === 'submit' ? e.target : e.target.parentElement

        if (target.canSubmit) {
          this.submit()
        }
      })
    },
    async submit() {
      // 表单里的用户信息
      const user = {
        username: this.username,
        password: this.password
      }
      // 仓库的用户信息
      const localUser = this.$store.state.user
      // 调取登陆接口
      const result = await login(user)
      console.log(result)
      // 检查用户名和密码是否匹配
      if (result.code != 200 || result.data.token === undefined) {
        this.$message.show('用户名或密码不正确')
      } else {
        // 匹配时，分发 login 事件进行登录
        ls.setItem('user', user)
        ls.setItem('auth', true)
        ls.setItem('token', result.data.token)
        this.$store.dispatch('login')
      }
    },
  }
}
</script>

<style scoped>

</style>
