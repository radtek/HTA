//个人中心
export default [
    //个人中心
    {
        path: '/Personal',
        name: 'Personal',
        component: resolve => void(require(['../components/personal/Personal.vue'], resolve))
    },
    //个人信息
    {
        path: '/PersonalInfo',
        name: 'PersonalInfo',
        component: resolve => void(require(['../components/personal/PersonalInfo.vue'], resolve))
    },
    //消息提醒
    {
        path: '/PersonalMessage',
        name: 'PersonalMessage',
        component: resolve => void(require(['../components/personal/Message.vue'], resolve))
    },
    //消息提醒
    {
        path: '/Config',
        name: 'Config',
        component: resolve => void(require(['../components/personal/Config.vue'], resolve))
    },
]