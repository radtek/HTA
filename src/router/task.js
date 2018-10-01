//任务管理
export default [
    //任务列表
    {
        path: '/',
        name: 'TaskRecord',
        component: resolve => void(require(['../components/task/TaskRecordTest.vue'], resolve))
    },
    //任务办理
    {
        path: '/TaskDealWith/:id',
        name: 'TaskDealWith',
        component: resolve => void(require(['../components/task/TaskDealWithTest.vue'], resolve))
    },
    //任务详情
    {
        path: '/TaskInfor/:id',
        name: 'TaskInfor',
        component: resolve => void(require(['../components/task/TaskInforTest.vue'], resolve))
    },
]