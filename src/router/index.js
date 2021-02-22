import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
import Index from '../components/Index.vue'
import Info from '../components/Info.vue'
//定义routes路由的集合，数组类型
export const routes=[
    //单个路由均为对象类型，path代表的是路径，component代表组件
    {path:'/',component:Index},
    {path:"/info",component:Info},
]

//实例化VueRouter并将routes添加进去
export const router=new VueRouter({
    mode: 'hash',
    routes
});

//抛出这个这个实例对象方便外部读取以及访问
export default router


