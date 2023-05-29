import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Login from '@/components/Login.vue'
import Profile from '@/views/Profile.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  { 
    path: '/', 
    name: 'Login', 
    component: Login 
  },
  {
  path: '/home',
  name: 'Home',
  component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router