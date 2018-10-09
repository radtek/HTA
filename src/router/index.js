import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
let myRouter = [];

//改版之前
// import old from "./old.js";
// myRouter = myRouter.concat(old);

//任务管理
import task from "./task.js";
myRouter = myRouter.concat(task);

//行政检查
import administration from "./administration.js";
myRouter = myRouter.concat(administration);

//信息查询
import message from "./message.js";
myRouter = myRouter.concat(message);

//个人中心
import personal from "./personal.js";
myRouter = myRouter.concat(personal);

export default new Router({
    routes: myRouter
});