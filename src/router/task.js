//任务管理
export default [
    //任务列表
    {
        path: '/',
        name: 'TaskRecord',
        component: resolve => void(require(['../components/task/TaskRecord.vue'], resolve))
    },
    //任务办理
    {
        path: '/TaskDealWith',
        name: 'TaskDealWith',
        component: resolve => void(require(['../components/task/TaskDealWith.vue'], resolve))
    },
    //任务详情
    {
        path: '/TaskInfor',
        name: 'TaskInfor',
        component: resolve => void(require(['../components/task/TaskInfor.vue'], resolve))
    },
]