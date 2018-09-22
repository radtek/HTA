//行政检查
export default [
    //行政检查
    {
        path: '/Administration',
        name: 'Administration',
        component: resolve => void(require(['../components/administration/Administration.vue'], resolve))
    },
    //日常检查、专项检查
    {
        path: '/Check/:type',
            name: 'Check',
        component: resolve => void(require(['../components/administration/Check.vue'], resolve))
    },
    //现场检查
    {
        path: '/SceneCheck/:objId/:jointly/:time/:items',
        name: 'SceneCheck',
        component: resolve => void(require(['../components/administration/SceneCheck.vue'], resolve))
    },
    //已完成检查/检查记录
    {
        path: '/AdminCheckRecord',
        name: 'AdminCheckRecord',
        component: resolve => void(require(['../components/administration/CheckRecord.vue'], resolve))
    },
    //整改记录
    {
        path: '/RectifyRecord',
        name: 'RectifyRecord',
        component: resolve => void(require(['../components/administration/RectifyRecord.vue'], resolve))
    },
    //下达限期整改
    {
        path: '/Reform',
        name: 'Reform',
        component: resolve => void(require(['../components/administration/Reform.vue'], resolve))
    },
    //整改明细
    {
        path: '/ReformDetail',
        name: 'ReformDetail',
        component: resolve => void(require(['../components/administration/ReformDetail.vue'], resolve))
    },
    //后督察
    {
        path: '/Supervise',
        name: 'Supervise',
        component: resolve => void(require(['../components/administration/Supervise.vue'], resolve))
    },
    //新增执法对象
    {
        path: '/AddObj',
        name: 'AddObj',
        component: resolve => void(require(['../components/administration/AddObj.vue'], resolve))
    },
]