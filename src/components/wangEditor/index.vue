<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { shallowRef, defineEmits, computed, onBeforeMount, ref } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { upload } from '@/api/index.js'
const props = defineProps({
  mode: {
    type: String,
    default: () => 'default'
  },
  modelValue: {
    type: String,
    default: () => ''
  },
  defaultEditorConfig: {
    type: Object,
    default: () => {
      return { placeholder: "请输入内容..." };
    },
  },
  defaultToolbarConfig: {
    type: Object,
    default: () => {
      return {
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        // excludeKeys: [ /* 隐藏哪些菜单 */ ],
      };
    },
  },
})

const editorConfig = ref({});

const toolbarConfig = ref({});

const emits = defineEmits(['update:modelValue']);

const valueHtml = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val);
  }
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

/**
 * 设置富文本配置项
 * */
const updateEditorConfig = () => {
  editorConfig.value = {
    ...props.defaultEditorConfig,
    MENU_CONF: {
      uploadImage: {
        customUpload: async (file, insertFn) => {
          const url = await upload({
            file,
            fileName: file.name
          });
          insertFn(url, file.name);
        }
      },
      uploadVideo: {
        customUpload: async (file, insertFn) => {
          const url = await upload({
            file,
            fileName: file.name
          });
          insertFn(url, `${url}?vframe/jpg/offset/0`);
        }
      }
    }
  }
}

/**
 * 设置工具栏配置项
 * */
const updateToolbarConfig = () => {
  toolbarConfig.value = {
    ...props.defaultToolbarConfig
  };
}

onBeforeMount(() => {
  updateEditorConfig();
  updateToolbarConfig();
})

</script>

<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="props.mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden;"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="props.mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<style scoped lang='scss'>

</style>
