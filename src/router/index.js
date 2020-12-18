import Vue from 'vue'
import VueRouter from 'vue-router'

import Discovery from '@/views/Discovery'
import Playlists from '@/views/Playlists'
import Songs from '@/views/Songs'
import MVs from '@/views/MVs'
import NotFoundComponent from '@/views/NotFoundComponent'

import Playlist from '@/views/Playlist'
import MVComponent from '@/views/MV'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/discovery',
      component: Discovery,
    },
    {
      path: '/playlists',
      component: Playlists,
    },
    {
      path: '/songs',
      component: Songs,
    },
    {
      path: '/mvs',
      component: MVs,
    },
    {
      path: '/playlist',
      component: Playlist
    },
    {
      path: '/mv/:id',
      component: MVComponent
    },
    {
      path: '/',
      redirect: '/discovery'
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})

export default router