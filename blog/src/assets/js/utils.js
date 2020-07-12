import axios from 'axios';
import $ from 'jquery';
let util = {
    install: Vue => {
        //线上
        // Vue.prototype.ABOUT_URL='https://www.sjlk.vip/images/about_img/about_';
        // Vue.prototype.AVATAR_URL='https://www.sjlk.vip/images/avatar_img/avatar_';
        // Vue.prototype.BG_URL='https://www.sjlk.vip/images/bg_img/bg_';
        // axios.defaults.baseURL = 'https://api.sjlk.vip';
        //线上测试
        Vue.prototype.ABOUT_URL='https://test.sjlk.vip/images/about_img/about_';
        Vue.prototype.AVATAR_URL='https://test.sjlk.vip/images/avatar_img/avatar_';
        Vue.prototype.BG_URL='https://test.sjlk.vip/images/bg_img/bg_';
        axios.defaults.baseURL = 'https://api.test.sjlk.vip/';
        //本地测试
        // Vue.prototype.ABOUT_URL='http://127.0.0.1:81/images/about_img/about_';
        // Vue.prototype.AVATAR_URL='http://127.0.0.1:81/images/avatar_img/avatar_';
        // Vue.prototype.BG_URL='http://127.0.0.1:81/images/bg_img/bg_';
        // axios.defaults.baseURL = 'http://api.sjlk.com';


        axios.defaults.withCredentials = true;
        Vue.prototype.$=$;
        Vue.prototype.$startTime=new Date('2019-11-10').getTime()
        Vue.prototype.$http = function (url, ...args) {
            var optional = [...args]
            var config = {
                url: url,
            };
            var success = null;
            var failed = null;
            if (optional.length === 0) {
                throw new Error('Missing successful callback');
            }
            if (typeof optional[0] === "function") {
                success = optional[0]
                if (optional[1] && typeof optional[1] === "function") {
                    failed = optional[1]
                }
            } else if (typeof optional[0] === "object") {
                config = { url: url, ...optional[0] }
                if (optional[1]) {
                    if (typeof optional[1] === "function") {
                        success = optional[1]
                        if (optional[2] && typeof optional[2] === "function") {
                            failed = optional[2]
                        }
                    } else {
                        throw new Error('Missing successful callback')
                    }
                } else {
                    throw new Error('Missing successful callback')
                }
            } else {
                throw new Error('The second parameter is neither object nor function');
            }

            axios(config).then(resp => {
                if (resp.status === 200) {
                    success(resp);
                }
            }).catch(error => {
                if (error.response) {
                    if (error.response.status === 401) {
                        alert('登录身份失效，需要重新登录');
                        localStorage.removeItem('user');
                        this.$router.push({path:'/adminLogin'});
                    }
                    if (error.response.status === 403) {
                        alert(error.response.data.message);
                    }
                    console.log(error.response.status,error.response.data.message);
                    // alert('发生了未知错误',error.response.status)
                    if (failed) {
                        failed(error);
                    }
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
        }
        // 格式化时间
        // 对Date的扩展，将 Date 转化为指定格式的String
        // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
        // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
        Vue.prototype.Format = function (date, fmt) { //author: meizz
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }
        Vue.prototype.setRoute = function (path) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open').css({'padding-right':'0px'});
            var arr = [
                { path: "/index", title: '时间' },
                { path: "/album", title: '时间的相册' },
                { path: "/study", title: '时间的学习笔记' },
                { path: "/life", title: '时间的随笔生活' },
                { path: "/friendChain", title: '时间的朋友们' },
                { path: "/about", title: '时间的个人信息' },
                { path: "/adminLogin", title: '站长登录' },
                { path: "/admin/system", title: '管理系统' },
                { path: "/admin/release", title: '发布文章' },
                { path: "/admin/arm", title: '管理文章' },
                { path: "/admin/edit", title: '修改文章' },
                { path: "/admin/crm", title: '用户管理' },
                { path: "/admin/cm", title: '评论管理' },
            ];
            arr.forEach((item, i) => {
                if (item.path === path) {
                    document.title = item.title
                }
            })
        }
        Vue.prototype.$imageChange = function (e, callback) {
            console.log(e)
            var file = e.target.files[0];
            if (!file) {
                return;
            }
            if (
                file.type !== "image/jpeg" &&
                file.type !== "image/jpg" &&
                file.type !== "image/png"
            ) {
                this.$toast("只能上传jpeg,jpg,png格式的图片");
                return;
            }
            if (file.size > 1048576) {
                this.$toast("只能上传1M以内的图片");
                return;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                callback(e)
            };
        }
        Vue.prototype.$toast = function (msg = '默认提示消息') {
            if (document.querySelector('#v_toast')) {
                return;
            }
            $("body").append(
                `
                <div id="b_toast" class="w-100 d-flex justify-content-center small" style="position:fixed;bottom:50%;z-index:10000 ;">
                  <div style="height: 50px;background-color:rgba(0, 0, 0, .6);" class="px-5 small d-flex justify-content-center align-items-center text-white rounded">
                    ${msg}
                  </div>
                </div>
              `
            );
            setTimeout(() => {
                $("#b_toast").remove();
            }, 2000)
        };
    }
}
export default util;
