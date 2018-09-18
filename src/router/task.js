//任务管理
export default [
    {
        path: '/',
        name: 'TaskController',
        component: resolve => void(require(['../components/task/TaskController.vue'], resolve))
    },
]