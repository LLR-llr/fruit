import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mains',
    component: () => import( '../views/main/Mains.vue'),meta:{title:"fruit后台管理系统",auth:true},
    children:[
      {path:'cateadd',component:()=>import('../views/category/Add.vue'),name:'cateadd',meta:{title:"添加分类",auth:true}},
      {path:'catequery',component:()=>import('../views/category/Query.vue'),name:'catequery',meta:{title:"查看分类",auth:true}},
      {path:'cateedit',component:()=>import('../views/category/Edit.vue'),name:'cateedit',meta:{title:"编辑分类",auth:true}},
        {path:'goodsadd',component:()=>import('../views/goods/Add.vue'),name:'goodsadd',meta:{title:"添加商品",auth:true}},
        {path:'goodsquery',component:()=>import('../views/goods/Query.vue'),name:'goodsquery',meta:{title:"查看商品",auth:true}},
        {path:'goodsedit',component:()=>import('../views/goods/Edit.vue'),name:'goodsedit',meta:{title:"编辑商品",auth:true}}
      ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/Login.vue')
  },

];

const router = new VueRouter({
  routes
});

router.beforeEach((to,from,next)=>{
    let title=to.meta.title||'fruit后台管理系统';
    document.title=title;
    if(to.meta.auth){
        let token=sessionStorage.getItem('token');
        if(token&&(token!=='')){
            next();
        }else{
            next('/login?redirect='+to.name)
        }
    }else{
    next();
    }
});












export default router
