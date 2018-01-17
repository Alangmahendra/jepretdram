import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Detailpost from '@/components/Detailpost'
import Myprofile from '@/components/Myprofile'
import Otherprofile from '@/components/Otherprofile'
import Myfeed from '@/components/Myfeed'
import Updatepost from '@/components/Updatepost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path:'/login',
      name:'Login',
      component : Login
    },
    {
      path:'/profile/oranglain/:id',
      name : 'Otherprofile',
      component : Otherprofile,
      
    },
    {
      path:'/profile',
      name:'Myprofile',
      component : Myprofile
    },
    {
      path : '/post/:id',
      name : 'Detailpost',
      component:Detailpost
    },
    {
      path : '/myfeed',
      name : 'Myfeed',
      component : Myfeed
    },
    {
      path : '/update/post/:id',
      name : 'Updatepost',
      component : Updatepost
    }
  ]
})
