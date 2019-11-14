import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mains',
    component: () => import('../views/main/Mains.vue'),
    children:[
      {
        path:'categoryAdd',name:'categoryAdd',meta:{title: '商品分类添加',auth:true},
        component: () => import(/* webpackChunkName: "about" */ '../views/cate/Add.vue'),
      },
      {
        path:'categoryQuery',name:'categoryQuery',meta:{title: '商品分类查看',auth:true},
        component: () => import(/* webpackChunkName: "about" */ '../views/cate/Query.vue'),
      },
      {
        path:'categoryEdit',name:'categoryEdit',meta:{title: '商品分类编辑',auth:true},
        component: () => import(/* webpackChunkName: "about" */ '../views/cate/Edit.vue'),
      },
      {
        path:'goodsinsert',name:'goodsinsert',meta:{title: '添加商品',auth:true},
        component: () => import(/* webpackChunkName: "about" */ '../views/goods/Insert.vue'),
      },
      {
        path:'goodsQuery',name:'goodsQuery',meta:{title: '商品查询',auth:true},
        component: () => import(/* webpackChunkName: "about" */ '../views/goods/Query.vue'),
      },
      {
        path:'goodsEdit',name:'goodsEdit',meta:{title: '编辑商品',auth:true},
        component: () => import(/* webpackChunkName: "about" */ '../views/goods/Edit.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
