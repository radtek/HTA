//任务管理
export default [
    {
        path: '/',
        name: 'TaskController',
        component: resolve => void(require(['../components/task/TaskController.vue'], resolve))
    },
    {
        path: '/TaskInfor',
        name: 'TaskInfor',
        component: resolve => void(require(['../components/task/TaskInfor.vue'], resolve))
    },
]