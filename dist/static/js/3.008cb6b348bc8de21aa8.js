webpackJsonp([3],{lj24:function(a,t){},o8vE:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=e("Xxa5"),r=e.n(s),i=e("pFYg"),n=e.n(i),o=e("exGp"),c=e.n(o),l=e("P9l9"),d={name:"EditAvatar",data:function(){return{avatar:"",user:"",dialog:{vis:!1},cropperConfig:{img:""},preview:null}},created:function(){var a=this;return c()(r.a.mark(function t(){var e,s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(l.e)();case 2:e=t.sent,console.log(e),a.user=e.data,(s=a.user)&&"object"===(void 0===s?"undefined":n()(s))&&(a.avatar=s.avatar);case 7:case"end":return t.stop()}},t,a)}))()},methods:{updateAvatar:function(){var a=this,t=this.avatar;if(t){var e=new Image;e.onload=function(){a.$message.show("上传成功")},e.onerror=function(){a.$message.show("上传失败","danger")},e.src=t}},handlerUploadImg:function(a){this.cropperConfig.img=a.img,this.dialog.vis=!0,this.avatar=a.img},handlerPreview:function(){this.preview=this.$createImagePreview({imgs:[this.user.avatar]}).show()}}},v={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"col-md-9 left-col"},[e("div",{staticClass:"panel panel-default padding-md"},[e("div",{staticClass:"panel-body"},[a._m(0),a._v(" "),e("hr"),a._v(" "),e("div",{attrs:{"data-validator-form":""}},[e("div",{staticClass:"form-group"},[e("ImgUpload",{staticClass:"dg-flex-1",attrs:{sync:"1"},on:{uploadImg:a.handlerUploadImg}},[e("div",{staticClass:"dg-display-flex dg-align-items-center"},[e("span",{staticClass:"dg-flex-1",staticStyle:{cursor:"hand"}},[a._v("点击上传头像")]),a._v(" "),e("img",{attrs:{src:a.avatar},on:{click:function(t){return t.stopPropagation(),a.handlerPreview(t)}}})])]),a._v(" "),e("div",{staticClass:"clearfix"})],1),a._v(" "),e("div",{staticClass:"form-group"},[e("button",{staticClass:"btn btn-lg btn-primary",attrs:{type:"submit"},on:{click:a.updateAvatar}},[a._v("上传头像")])])])])])])},staticRenderFns:[function(){var a=this.$createElement,t=this._self._c||a;return t("h2",[t("i",{staticClass:"fa fa-picture-o"}),this._v(" 请输入头像地址")])}]};var u=e("VU/8")(d,v,!1,function(a){e("lj24")},"data-v-e403bce4",null);t.default=u.exports}});
//# sourceMappingURL=3.008cb6b348bc8de21aa8.js.map