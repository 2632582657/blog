(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51978b77"],{"03e0":function(t,e,n){"use strict";var i=n("b8a5"),o=n.n(i);o.a},"98f9":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"admin_side border-top bg-primary"},[n("ul",{staticClass:"text-center  text-white text-xl-left text-lg-left text-md-left text-sm-left"},t._l(t.adminMenu,(function(e,i){return n("li",{key:i,class:"py-3 px-lg-5 px-xl-5 px-md-5 px-sm-5  cur "+(t.navActive===i?"active":""),on:{click:function(e){return t.toPath(i)}}},[n("i",{class:[{fa:!0},e.icon]}),n("span",{staticClass:"ml-2 d-none d-sm-inline-block d-md-inline-block d-lg-inline-block d-xl-inline-block",domProps:{textContent:t._s(e.title)}})])})),0)])},o=[],a=(n("ac6a"),{data:function(){return{adminMenu:[{icon:"fa-flag",title:"首页",path:"/admin/system"},{icon:"fa-edit",title:"发布文章",path:"/admin/release"},{icon:"fa-folder",title:"管理文章",path:"/admin/arm"},{icon:"fa-group ",title:"用户管理",path:"/admin/crm"},{icon:"fa-comments",title:"评论管理",path:"/admin/cm"},{icon:"fa-link",title:"友链管理",path:"/admin/frm"},{icon:"fa-music",title:"音乐管理",path:"/admin/audio"}],navActive:0}},created:function(){var t=this;this.adminMenu.forEach((function(e,n){e.path===t.$route.path&&(t.navActive=n,t.$emit("func",t.adminMenu[n].title))}))},methods:{toPath:function(t){this.navActive=t,this.$emit("func",this.adminMenu[t].title),this.$router.push(this.adminMenu[t].path)}}}),r=a,s=(n("03e0"),n("2877")),l=Object(s["a"])(r,i,o,!1,null,"b9b0a324",null);e["a"]=l.exports},a450:function(t,e,n){"use strict";var i=n("a6ca"),o=n.n(i);o.a},a6ca:function(t,e,n){},b8a5:function(t,e,n){},c4a9:function(t,e,n){"use strict";(function(t){n.d(e,"a",(function(){return o}));var i=function(){return"undefined"!==typeof window?window:t},o=function(){var t=i();return t&&t.tinymce?t.tinymce:null}}).call(this,n("c8ba"))},ca72:function(t,e,n){"use strict";var i=["onActivate","onAddUndo","onBeforeAddUndo","onBeforeExecCommand","onBeforeGetContent","onBeforeRenderUI","onBeforeSetContent","onBeforePaste","onBlur","onChange","onClearUndos","onClick","onContextMenu","onCopy","onCut","onDblclick","onDeactivate","onDirty","onDrag","onDragDrop","onDragEnd","onDragGesture","onDragOver","onDrop","onExecCommand","onFocus","onFocusIn","onFocusOut","onGetContent","onHide","onInit","onKeyDown","onKeyPress","onKeyUp","onLoadContent","onMouseDown","onMouseEnter","onMouseLeave","onMouseMove","onMouseOut","onMouseOver","onMouseUp","onNodeChange","onObjectResizeStart","onObjectResized","onObjectSelected","onPaste","onPostProcess","onPostRender","onPreProcess","onProgressState","onRedo","onRemove","onReset","onSaveContent","onSelectionChange","onSetAttrib","onSetContent","onShow","onSubmit","onUndo","onVisualAid"],o=function(t){return-1!==i.indexOf(t)},a=function(t,e,n){Object.keys(e).filter(o).forEach((function(i){var o=e[i];"function"===typeof o&&("onInit"===i?o(t,n):n.on(i.substring(2),(function(t){return o(t,n)})))}))},r=function(t,e){var n,i=t.$props.modelEvents?t.$props.modelEvents:null,o=Array.isArray(i)?i.join(" "):i;t.$watch("value",(function(t,i){e&&"string"===typeof t&&t!==n&&t!==i&&(e.setContent(t),n=t)})),e.on(o||"change keyup undo redo",(function(){n=e.getContent(),t.$emit("input",n)}))},s=function(t,e,n){var i=e.$props.value?e.$props.value:"",o=e.$props.initialValue?e.$props.initialValue:"";n.setContent(i||o),e.$listeners.input&&r(e,n),a(t,e.$listeners,n)},l=0,c=function(t){var e=Date.now(),n=Math.floor(1e9*Math.random());return l++,t+"_"+n+l+String(e)},u=function(t){return null!==t&&"textarea"===t.tagName.toLowerCase()},d=function(t){return"undefined"===typeof t||""===t?[]:Array.isArray(t)?t:t.split(" ")},p=function(t,e){return d(t).concat(d(e))},f=function(t,e,n,i){var o=e.createElement("script");o.referrerPolicy="origin",o.type="application/javascript",o.id=t,o.addEventListener("load",i),o.src=n,e.head&&e.head.appendChild(o)},m=function(){return{listeners:[],scriptId:c("tiny-script"),scriptLoaded:!1}},h=function(t,e,n,i){t.scriptLoaded?i():(t.listeners.push(i),e.getElementById(t.scriptId)||f(t.scriptId,e,n,(function(){t.listeners.forEach((function(t){return t()})),t.scriptLoaded=!0})))},v=n("c4a9"),g={apiKey:String,cloudChannel:String,id:String,init:Object,initialValue:String,inline:Boolean,modelEvents:[String,Array],plugins:[String,Array],tagName:String,toolbar:[String,Array],value:String,disabled:Boolean},b=function(){return b=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n],e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},b.apply(this,arguments)},y=m(),$=function(t,e,n){return t(n||"div",{attrs:{id:e}})},C=function(t,e){return t("textarea",{attrs:{id:e},style:{visibility:"hidden"}})},x=function(t){return function(){var e=b({},t.$props.init,{readonly:t.$props.disabled,selector:"#"+t.elementId,plugins:p(t.$props.init&&t.$props.init.plugins,t.$props.plugins),toolbar:t.$props.toolbar||t.$props.init&&t.$props.init.toolbar,inline:t.inlineEditor,setup:function(e){t.editor=e,e.on("init",(function(n){return s(n,t,e)})),t.$props.init&&"function"===typeof t.$props.init.setup&&t.$props.init.setup(e)}});u(t.element)&&(t.element.style.visibility=""),Object(v["a"])().init(e)}},k={props:g,created:function(){this.elementId=this.$props.id||c("tiny-vue"),this.inlineEditor=this.$props.init&&this.$props.init.inline||this.$props.inline},watch:{disabled:function(){this.editor.setMode(this.disabled?"readonly":"design")}},mounted:function(){if(this.element=this.$el,null!==Object(v["a"])())x(this)();else if(this.element&&this.element.ownerDocument){var t=this.element.ownerDocument,e=this.$props.cloudChannel?this.$props.cloudChannel:"5",n=this.$props.apiKey?this.$props.apiKey:"no-api-key";h(y,t,"https://cdn.tiny.cloud/1/"+n+"/tinymce/"+e+"/tinymce.min.js",x(this))}},beforeDestroy:function(){null!==Object(v["a"])()&&Object(v["a"])().remove(this.editor)},render:function(t){return this.inlineEditor?$(t,this.elementId,this.$props.tagName):C(t,this.elementId)}};e["a"]=k},dd18:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text-left"},[n("div",[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"exampleInputEmail1"}},[t._v("文章标题")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.article.title,expression:"article.title"}],staticClass:"form-control",attrs:{id:"exampleInputEmail1",type:"text",placeholder:"请输入文章标题",minlength:"5",maxlength:"100",required:""},domProps:{value:t.article.title},on:{input:function(e){e.target.composing||t.$set(t.article,"title",e.target.value)}}})]),n("div",{staticClass:"form-group"},[n("label",{staticClass:"d-block",attrs:{for:"exampleInputEmail1"}},[t._v("文章封面")]),n("img",{directives:[{name:"show",rawName:"v-show",value:!0,expression:"true"}],staticClass:"cover",attrs:{src:t.article.cover,alt:""}}),n("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"file",attrs:{type:"file",id:"customFile"},on:{change:t.imageChange}}),n("label",{staticClass:"text-info d-block cursor_p",attrs:{for:"customFile"}},[t._v("选择")])]),n("div",{staticClass:"form-group"},[n("label",{staticClass:"d-block"},[t._v("分类")]),t._l(t.cate,(function(e,i){return n("div",{key:i,staticClass:"form-check form-check-inline"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.article.cate,expression:"article.cate"}],staticClass:"form-check-input",attrs:{type:"radio",name:"cate",id:"inlineRadio"+i},domProps:{value:e.id,checked:t._q(t.article.cate,e.id)},on:{change:function(n){return t.$set(t.article,"cate",e.id)}}}),n("label",{staticClass:"form-check-label",attrs:{for:"inlineRadio"+i},domProps:{textContent:t._s(e.name)}})])}))],2)]),n("Editor",{attrs:{"api-key":"your-api-key",init:t.init},model:{value:t.article.content,callback:function(e){t.$set(t.article,"content",e)},expression:"article.content"}}),n("button",{staticClass:"btn btn-info btn-block btn-sm my-4 col-12 col-xl-2 col-lg-3 col-md-4 text-white",attrs:{disabled:!t.isRepeat},on:{click:t.submitArticle}},[t._v("提交")])],1)},o=[],a=n("ca72"),r=n("98f9"),s={name:"release",data:function(){return{cate:[],init:{language_url:"/tinymce-lang/zh_CN.js",language:"zh_CN",plugins:"link lists image code table colorpicker textcolor wordcount contextmenu",toolbar:"bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | undo redo | link unlink image table  code | removeformat",branding:!1,height:800,images_upload_handler:function(t,e,n){var i=t.blob(),o=new FileReader;o.onloadend=function(){o.result.length>1048576?alert("error"):e(o.result)},i&&o.readAsDataURL(i)}},article:{title:"",cover:"",content:"",cate:10001},isRepeat:!0}},created:function(){var t=this;this.$http("getCate",(function(e){200===e.data.code&&(t.cate=e.data.data)}))},mounted:function(){},methods:{imageChange:function(t){var e=this;this.$imageChange(t,(function(t){e.article.cover=t.target.result}))},submitArticle:function(){var t=this;if(this.isRepeat)if(""!==this.article.title&&""!==this.article.content&&""!==this.article.cate){var e=new FormData;if(e.append("title",this.article.title),e.append("cate",this.article.cate),e.append("content",this.article.content),0===this.$refs.file.files.length)return void this.$toast("请上传封面");e.append("cover",this.$refs.file.files[0]),this.isRepeat=!1,this.$http("release",{method:"post",data:e},(function(e){t.isRepeat=!0,200===e.data.code&&(t.$toast("提交成功"),t.$router.push({path:"/admin/arm"}))}))}else this.$toast("请完善表单");else this.$toast("文件上传中，请勿重复提交")}},components:{AdminSide:r["a"],Editor:a["a"]}},l=s,c=(n("a450"),n("2877")),u=Object(c["a"])(l,i,o,!1,null,"0519a700",null);e["default"]=u.exports}}]);