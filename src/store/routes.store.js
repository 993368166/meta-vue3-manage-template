import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from '@/store/user.store.js'
import Layout from '@/layout/index.vue'
import { useRoute, useRouter } from 'vue-router'

export const useRoutesStore = defineStore(
  'routesStore',
  () => {
    const userStore = useUserStore()
    const { userInfo } = storeToRefs(userStore)

    const route = useRoute()
    const router = useRouter()
    // vite获取组件
    const Module = import.meta.glob(['@/views/**/*.vue', '@/views/*/index.vue'])

    // 用户所拥有的所有路由列表
    const routesList = ref([])

    // 用户历史使用过的路由记录
    const historyRoutesList = ref([])

    // 历史路由记录中忽略的路由
    const ignoreRoute = {
      '/login': '登录',
      '/404': '404',
      '/': 'index'
    }

    // 更新历史路由记录
    const setHistoryRoutesList = (routeConfig) => {
      // 忽略掉这些影响交互体验的路由
      if (Object.keys(ignoreRoute).includes(routeConfig.path)) {
        return
      }
      const inHistoryIndex = historyRoutesList.value.findIndex(
        (item) => item.path === routeConfig.path
      )
      if (inHistoryIndex < 0) {
        historyRoutesList.value.push(routeConfig)
      }
    }

    //移除历史路由
    const deleteHistoryRoutesList = (path, index) => {
      historyRoutesList.value.splice(index, 1)
      // 如果移除的路由是当前页面
      if (path === route.path) {
        router.replace({
          // 当前页面处于历史路由数组第0项时，页面跳转到删除后的第0项的地址
          // 不是第0项时，页面跳转到前一项的地址
          path: historyRoutesList.value[index > 0 ? index - 1 : index].path
        })
      }
    }

    // 更新路由列表
    const setRoutesList = (_routesList) => {
      // 递归处理路由
      const arrayToTree = (list, root) => {
        return list
          .filter((menu) => menu.parentId === root)
          .map((routeConfig) => {
            return {
              ...routeConfig,
              path: routeConfig.menuUrl,
              name: routeConfig.menuName,
              children: arrayToTree(list, routeConfig.id),
              component: Module[`/src/views/${routeConfig.component}/index.vue`]
            }
          })
      }
      routesList.value = arrayToTree(_routesList, 0)
      return {
        path: '/',
        name: '首页',
        component: Layout,
        children: routesList.value
      }
    }

    // 获取路由列表
    const getUserRoutesList = async () => {
      return setRoutesList([])
    }

    return {
      routesList,
      historyRoutesList,
      getUserRoutesList,
      setHistoryRoutesList,
      deleteHistoryRoutesList
    }
  },
  {
    persist: true
  }
)
