webpackJsonp([10],{"3Jfp":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Xxa5"),r=a.n(s),i=a("exGp"),n=a.n(i),o=a("P9l9"),l=a("ssT3"),c={name:"Login",data:function(){return{username:"",password:""}},methods:{login:function(t){var e=this;this.$nextTick(function(){("submit"===t.target.type?t.target:t.target.parentElement).canSubmit&&e.submit()})},submit:function(){var t=this;return n()(r.a.mark(function e(){var a,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={username:t.username,password:t.password},t.$store.state.user,e.next=4,Object(o.h)(a);case 4:s=e.sent,console.log(s),200!=s.code||void 0===s.data.token?t.$message.show("用户名或密码不正确"):(l.a.setItem("user",a),l.a.setItem("auth",!0),l.a.setItem("token",s.data.token),t.$store.dispatch("login"));case 7:case"end":return e.stop()}},e,t)}))()}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4 col-md-offset-4 floating-box"},[a("div",{staticClass:"panel panel-default"},[t._m(0),t._v(" "),a("div",{staticClass:"panel-body",attrs:{"data-validator-form":""}},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label"},[t._v("用户名")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.username,expression:"username",modifiers:{trim:!0}},{name:"validator",rawName:"v-validator.required",value:{title:"用户名"},expression:"{ title: '用户名' }",modifiers:{required:!0}}],staticClass:"form-control",attrs:{type:"text",placeholder:"请填写用户名"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label"},[t._v("密码")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.password,expression:"password",modifiers:{trim:!0}},{name:"validator",rawName:"v-validator.required",value:{title:"密码"},expression:"{ title: '密码' }",modifiers:{required:!0}}],staticClass:"form-control",attrs:{id:"password",type:"password",placeholder:"请填写密码"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"form-group",on:{click:t.login}},[t._m(1)])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"panel-heading"},[e("h3",{staticClass:"panel-title"},[this._v("请登录")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn btn-lg btn-success btn-block",attrs:{type:"submit"}},[e("i",{staticClass:"fa fa-btn fa-sign-in"}),this._v(" 登录\n          ")])}]};var d=a("VU/8")(c,u,!1,function(t){a("iTb8")},"data-v-476fc0a5",null);e.default=d.exports},iTb8:function(t,e){}});
//# sourceMappingURL=10.76cb5f3620e5388f2462.js.map