//信息查询
export default [
    //信息查询
    {
        path: '/Message',
        name: 'Message',
        component: resolve => void(require(['../components/message/Message.vue'], resolve))
    },
    //企业信息
    {
        path: '/CompanyRecord',
        name: 'CompanyRecord',
        component: resolve => void(require(['../components/message/CompanyRecord.vue'], resolve))
    },
    //扫码
    {
        path: '/Scan',
        name: 'Scan',
        component: resolve => void(require(['../components/message/Scan.vue'], resolve))
    },
    //一企一档
    {
        path: '/CompanyMessage/:id/:data',
        name: 'CompanyMessage',
        component: resolve => void(require(['../components/message/CompanyMessage.vue'], resolve))
    },
    //企业详细信息
    {
        path: '/CompanyDetailMessage/:id/:data',
        name: 'CompanyDetailMessage',
        component: resolve => void(require(['../components/message/CompanyDetailMessage.vue'], resolve))
    },
    //企业附件
    {
        path: '/Append/:id/:type',
        name: 'Append',
        component: resolve => void(require(['../components/message/Append.vue'], resolve))
    },
    //检查记录
    {
        path: '/CheckRecord/:id',
        name: 'CheckRecord',
        component: resolve => void(require(['../components/message/CheckRecord.vue'], resolve))
    },
    //检查详情
    {
        path: '/CheckDetail/:id/:inspVersion',
        name: 'CheckDetail',
        component: resolve => void(require(['../components/message/CheckDetail.vue'], resolve))
    },
    //清洗记录
    {
        path: '/ClearRecord/:id',
        name: 'ClearRecord',
        component: resolve => void(require(['../components/message/ClearRecord.vue'], resolve))
    },
]