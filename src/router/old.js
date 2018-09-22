//改版之前的
export default [
    // {
    //     path: '/SweepCode',
    //     name: 'SweepCode',
    //     component: resolve => void(require(['../components/old/SweepCode.vue'], resolve))
    // },
    // {
    //     path: '/Personal',
    //     name: 'Personal',
    //     component: resolve => void(require(['../components/old/Personal.vue'], resolve))
    // },
    // {
    //     path: '/ListContent/:id',
    //     name: 'ListContent',
    //     component: resolve => void(require(['../components/old/ListContent.vue'], resolve))
    // },
    // {
    //     path: '/EnterpriseInfo/:id',
    //     name: 'EnterpriseInfo',
    //     component: resolve => void(require(['../components/old/EnterpriseInfo.vue'], resolve))
    // },
    // {
    //     path: '/CleanRecord/:id',
    //     name: 'CleanRecord',
    //     component: resolve => void(require(['../components/old/CleanRecord.vue'], resolve))
    // },
    // {
    //     path: '/FieldExplor/:id',
    //     name: 'FieldExplor',
    //     component: resolve => void(require(['../components/old/FieldExplor.vue'], resolve))
    // },
    {
        path: '/PersonInfo',
        name: 'PersonInfo',
        component: resolve => void(require(['../components/old/PersonInfo.vue'], resolve))
    },
    // {
    //     path: '/ResetPassword',
    //     name: 'ResetPassword',
    //     component: resolve => void(require(['../components/old/ResetPassword.vue'], resolve))
    // },
    // {
    //     path: '/Message',
    //     name: 'Message',
    //     component: resolve => void(require(['../components/old/Message.vue'], resolve))
    // },
    // {
    //     path: '/CheckRecord/:id',
    //     name: 'CheckRecord',
    //     component: resolve => void(require(['../components/old/CheckRecord.vue'], resolve))
    // },
    // {
    //     path: '/CheckDetail/:id/:inspVersion',
    //     name: 'CheckDetail',
    //     component: resolve => void(require(['../components/old/CheckDetail.vue'], resolve))
    // },
    // {
    //     path: '/Sweep',
    //     name: 'Sweep',
    //     component: resolve => void(require(['../components/old/Sweep.vue'], resolve))
    // },
    // {
    //     path: '/Append',
    //     name: 'Append',
    //     component: resolve => void(require(['../components/old/Append.vue'], resolve))
    // },
    {
        path: '/test',
        name: 'test',
        component: resolve => void(require(['../components/administration/test.vue'], resolve))
    },
]