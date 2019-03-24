import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

import shangping from './pages/shangping/Shangpin'

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
          path:'/',
          name:'shangping',
          component:shangping
      },
      {path:'/pingjia',name:'pingjia',component:()=>import('./pages/pingjia/Pingjia.vue')},
      {path:'/shangjia',name:'pingjia',component:()=>import('./pages/shangjia/Shangjia.vue')},

  ]
})
