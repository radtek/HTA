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
        {
            path: '/Append',
            name: 'Append',
            component: resolve => void(require(['../components/Append.vue'], resolve))
        },
        {
            path: '/Score/:id',
            name: 'Score',
            component: resolve => void(require(['../components/Score.vue'], resolve))
        },
        {
            path: '/ScoreRecord/:id',
            name: 'ScoreRecord',
            component: resolve => void(require(['../components/ScoreRecord.vue'], resolve))
        },
    ]
})