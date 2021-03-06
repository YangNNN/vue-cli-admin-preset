import Layout from '@/frame/layout'
import moduleRouters from '@/router/modules/pages'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

/* Router Modules */
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/frame/pages/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/frame/pages/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/frame/pages/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/frame/pages/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/homepage',
    children: [
      {
        path: 'homepage',
        component: () => import('@/frame/pages/homepage'),
        hidden: true
      },
      {
        path: 'dashboard',
        component: () => import('@/frame/pages/dashboard'),
        name: 'Dashboard',
        meta: { title: '首页', affix: true }
      },
      {
        path: 'test',
        component: () => import('@/frame/pages/test'),
        name: 'test',
        meta: { title: '测试页面' }
      },
      {
        path: '/System/ModuleManagement',
        component: () => import('@/frame/pages/menu'),
        name: 'menu',
        meta: { title: '菜单管理' }
      },
      {
        path: '/System/RollManage',
        component: () => import('@/frame/pages/role'),
        name: 'Role',
        meta: { title: '员工管理' }
      }
    ]
  }
]

export const routes: Array<RouteConfig> = constantRoutes.concat(moduleRouters)

const createRouter: any = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: routes
})

const router = createRouter()


export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
