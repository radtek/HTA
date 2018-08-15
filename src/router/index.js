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
      path: '/personal',
      name: 'Personal',
      component: resolve => void(require(['../components/Personal.vue'], resolve))
    },
  ]
})
