import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/views/Layout/index.vue"
import LayoutMain from "@/views/Layout/components/LayoutMain.vue"
import Login from "@/views/Login/index.vue"
import Register from "@/views/Register/index.vue"
import Chat from "@/views/Chat/index.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children:[
        {
          path:'/',
          component:LayoutMain,
        },
        {
          path:'/chat',
          component:Chat
        }
      ]
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/register',
      component:Register
    }
  ]
})

export default router
