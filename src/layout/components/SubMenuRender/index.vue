<script setup>
const props = defineProps(['data']);
defineOptions({
  name: 'SubMenuRender'
})
</script>

<template>
  <template v-for='routeConfig in props.data'>
    <el-sub-menu
      v-if='routeConfig.children && routeConfig.children.length > 0'
      :index='routeConfig.path'
      :key='routeConfig.path'
    >
      <template #title>
        <el-icon><component :is='routeConfig.icon' /></el-icon>
        <span>{{ routeConfig.name }}</span>
      </template>
      <sub-menu-render :data='routeConfig.children' />
    </el-sub-menu>
    <el-menu-item
      v-else
      :index='routeConfig.path'
      :key='routeConfig.path'
    >
      <el-icon><component :is='routeConfig.icon' /></el-icon>
      <template #title>
        <span>{{ routeConfig.name }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<style scoped lang='scss'>

</style>
