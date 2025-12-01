import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/HomePage.vue';        // 导入你的页面组件
import Research from '@/NavbarMenu/ResearchPage.vue';
import Team from '@/NavbarMenu/TeamPage.vue';
import Publications from '@/NavbarMenu/PublicationsPage.vue';
import Contact from '@/NavbarMenu/ContactPage.vue';
import PI from './components/PI.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home
  },
  {
    path: '/research',
    name: 'ResearchPage',
    component: Research
  },
  {
    path: '/team',
    name: 'TeamPage',
    component: Team
  },
  {
    path: '/team/pi',
    name: 'PI',
    component: PI
  },
  {
    path: '/publications',
    name: 'PublicationsPage',
    component: Publications
  },
  {
    path: '/contact',
    name: 'ContactPage',
    component: Contact
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router