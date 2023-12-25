<script setup lang="ts">
// 导入模型解析构造函数
import { onMounted, ref } from 'vue'
import { Button, Spin, Toast } from "@kousum/semi-ui-vue"
import Spline from "spline-vue/v3";
const scene = "https://prod.spline.design/7rQ8-6iOwQFax5Gw/scene.splinecode"

const loading = ref(false)

// dom节点渲染完毕再加载
onMounted(() => {
 
})

onBeforeUnmount(() => {
})

function init3dModel() {
 
}

function handleOther() {
  Toast.success('Hi,Bytedance dance dance')
}

</script>
<template>
  <div class="model-container">
    <div class="p-5">
      <Button @click="init3dModel" class="">重新加载</Button>
      <Button @click="handleOther" class="ml-2">其他事件</Button>
    </div>
    <Spin v-if="loading"></Spin>
    <Spline :scene="scene" />
  </div>
</template>
 
 
<style scoped lang="css">
.model-container {
  height: 100vh;
  width: 100vh;
  flex-shrink: 0;
}
</style>