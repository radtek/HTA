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
      path: '/Personal',
      name: 'Personal',
      component: resolve => void(require(['../components/Personal.vue'], resolve))
    },
    {
      path: '/ListContent/:id',
      name: 'ListContent',
      component: resolve => void(require(['../components/ListContent.vue'], resolve))
    },
    {
      path: '/EnterpriseInfo/:id',
      name: 'EnterpriseInfo',
      component: resolve => void(require(['../components/EnterpriseInfo.vue'], resolve))
    },
    {
      path: '/CleanRecord/:id',
      name: 'CleanRecord',
      component: resolve => void(require(['../components/CleanRecord.vue'], resolve))
    },
    {
      path: '/FieldExplor/:id',
      name: 'FieldExplor',
      component: resolve => void(require(['../components/FieldExplor.vue'], resolve))
    },
    {
        path: '/PersonInfo',
        name: 'PersonInfo',
        component: resolve => void(require(['../components/PersonInfo.vue'], resolve))
    },
    {
        path: '/ResetPassword',
        name: 'ResetPassword',
        component: resolve => void(require(['../components/ResetPassword.vue'], resolve))
    },
    {
        path: '/Message',
        name: 'Message',
        component: resolve => void(require(['../components/Message.vue'], resolve))
    },
    {
        path: '/CheckRecord/:id',
        name: 'CheckRecord',
        component: resolve => void(require(['../components/CheckRecord.vue'], resolve))
    },
    {
        path: '/CheckDetail/:id/:inspVersion',
        name: 'CheckDetail',
        component: resolve => void(require(['../components/CheckDetail.vue'], resolve))
    },
    {
      path: '/Sweep',
      name: 'Sweep',
      component: resolve => void(require(['../components/Sweep.vue'], resolve))
    },
    // 商户app列表路径
    {
      path: '/sh/ComListContent',
      name: 'ComListContent',
      component: resolve => void(require(['../components/shanghu/ComListContent.vue'], resolve))
    },
    // 商户app消息提醒路径
    {
        path: '/sh/ComMessage',
        name: 'ComMessage',
        component: resolve => void(require(['../components/shanghu/ComMessage.vue'], resolve))
    },
    //商户app企业信息路径
    {
      path: '/sh/ComEnterpriseInfo',
      name: 'ComEnterpriseInfo',
      component: resolve => void(require(['../components/shanghu/ComEnterpriseInfo.vue'], resolve))
    },
    //商户app清洗记录路径
    {
      path: '/sh/ComCleanRecord',
      name: 'ComCleanRecord',
      component: resolve => void(require(['../components/shanghu/ComCleanRecord.vue'], resolve))
    },
    //商户app修改负责人路径
    {
      path: '/sh/ComModifyLeader',
      name: 'ComModifyLeader',
      component: resolve => void(require(['../components/shanghu/ComModifyLeader.vue'], resolve))
    },
    //商户app我要上报路径
    {
      path: '/sh/ComReport',
      name: 'ComReport',
      component: resolve => void(require(['../components/shanghu/ComReport.vue'], resolve))
    },
  ]
})
