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
      path: '/ListContent',
      name: 'ListContent',
      component: resolve => void(require(['../components/ListContent.vue'], resolve))
    },
    {
      path: '/EnterpriseInfor',
      name: 'EnterpriseInfor',
      component: resolve => void(require(['../components/EnterpriseInfor.vue'], resolve))
    },
    {
      path: '/CleanRecord',
      name: 'CleanRecord',
      component: resolve => void(require(['../components/CleanRecord.vue'], resolve))
    },
    {
      path: '/FieldExplor',
      name: 'FieldExplor',
      component: resolve => void(require(['../components/FieldExplor.vue'], resolve))
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
    {
        path: '/CheckRecord',
        name: 'CheckRecord',
        component: resolve => void(require(['../components/CheckRecord.vue'], resolve))
    },
    {
      path: '/sweep',
      name: 'Sweep',
      component: resolve => void(require(['../components/Sweep.vue'], resolve))
    },
  ]
})
