import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'hoempage',
      component: () => import('../views/homepage')
    },
    {
      path: '/girl',
      name: 'girl',
      component: () => import('../views/girl')
    }
  ]
})
