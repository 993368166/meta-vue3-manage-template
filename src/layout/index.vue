<script setup>
import { ref, reactive, computed } from 'vue'
import { Avatar } from '@element-plus/icons-vue'
import { useRoutesStore, useUserStore } from '@/store/index.js'
import { storeToRefs } from 'pinia';
import SubMenuRender from '@/layout/components/SubMenuRender/index.vue'
import { useRoute, useRouter } from 'vue-router'

const isCollapse = ref(false);

const routesStore = useRoutesStore();
const userStore = useUserStore();

const { userInfo } = storeToRefs(userStore);
const { routesList, historyRoutesList } = storeToRefs(routesStore);

const font = reactive({
  color: 'rgba(0, 0, 0, .08)',
})
const route = useRoute();
const router = useRouter();
const breadcrumbList = computed(() => {
  return route.matched
})

const asideWidth = computed(() => {
  return isCollapse.value ? '60px' : '200px'
})

const content = computed(() => {
  return `${userInfo.value.userName}`
})

const handleClickHistoryTag = (path) => {
  router.push({
    path
  })
}

const editPwd = () => {
  ElMessageBox.prompt('请输入新密码', '修改密码', {
    confirmButtonText: '提交',
    cancelButtonText: '取消',
    inputValidator: value => !!value,
    inputErrorMessage: '请输入新密码',
  })
    .then( async ({ value }) => {
      ElMessage.success('修改成功！');
    })
}

const signOut = () => {
  ElMessageBox.confirm(
    '确认退出？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      ElMessage({
        type: 'success',
        message: '退出登录！',
      })
      await router.replace('/login');
    })
}

const handleCommand = async (command) => {
  switch (command) {
    case 'editPwd':
      editPwd();
      break;
    case 'signOut':
      signOut();
      break;
    default:
      break;
  }
}

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="asideWidth">
        <el-scrollbar>
          <div class='icon-wrap'>
            <img :style='{ marginRight: isCollapse ? "0" : "16px" }' src='../static/logo.png' alt='' />
            <h1 v-show='!isCollapse'>玛特宇宙管理</h1>
          </div>
          <el-menu
            router
            :default-active='route.path'
            class="el-menu-vertical"
            active-text-color="rgb(64, 158, 255)"
            background-color="#304156"
            text-color='#ffffff'
            :collapse="isCollapse"
          >
            <sub-menu-render :data='routesList' />
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header height='100px'>
          <div class='header-top'>
            <div class='header-top-left'>
              <el-icon size='20px' @click='isCollapse = !isCollapse'>
                <Fold v-show='!isCollapse' />
                <Expand v-show='isCollapse' />
              </el-icon>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
                  {{ item.name }}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class='header-top-right'>
              <el-dropdown @command="handleCommand">
                <el-link type="primary" :icon="Avatar">{{ userInfo.userName }}</el-link>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command='editPwd'>修改密码</el-dropdown-item>
                    <el-dropdown-item command='signOut'>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
          <div class='history-tags-wrap'>
            <el-tag
              v-for='({ name, path }, index) in historyRoutesList'
              :key='path'
              :type="path === route.path ? 'primary' : 'info'"
              :closable='historyRoutesList.length > 1'
              @click='handleClickHistoryTag(path)'
              @close='routesStore.deleteHistoryRoutesList(path, index)'
            >
              {{ name }}
            </el-tag>
          </div>
        </el-header>
          <el-main>
            <el-watermark style='height: 100%;' :font="font" :content='content'>
              <div class='main'>
                <!--  必须在component外层包裹div，否则过渡会失效  -->
                <router-view v-slot="{ Component }">
                  <transition name="fade" mode="out-in" appear>
                    <keep-alive>
                      <div style='height: 100%' :key="Component">
                        <component :is="Component" />
                      </div>
                    </keep-alive>
                  </transition>
                </router-view>
              </div>
            </el-watermark>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang='scss'>
@import "index.module";
</style>
