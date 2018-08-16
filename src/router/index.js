import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SweepCode',
      component: resolve => void(require(['../components/SweepCode.vue'], resolve))
    },
    {
      path: '/personal',
      name: 'Personal',
      component: resolve => void(require(['../components/Personal.vue'], resolve))
    },
    {
        path: '/personInfo',
        name: 'PersonInfo',
        component: resolve => void(require(['../components/PersonInfo.vue'], resolve))
    },
    {
        path: '/resetPassword',
        name: 'ResetPassword',
        component: resolve => void(require(['../components/ResetPassword.vue'], resolve))
    },
    {
        path: '/message',
        name: 'Message',
        component: resolve => void(require(['../components/Message.vue'], resolve))
    },
  ]
})
