<script setup>
// 导入模型解析构造函数
import { Application } from '@splinetool/runtime'
import { onMounted, ref } from 'vue'
 
// 初始化3d模型
const ref3d = ref(null)
const init3dModel = () => {
  // 实例化解析器实例
  let spline = new Application(ref3d.value)
  // 拉取模型
  spline.load('https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode').then(() => {
  // spline.load('./scene.splinecode').then(() => {
    console.log('3D模型加载并渲染完毕')
    spline.setZoom(1)
    spline.addEventListener('scroll', (e) => {
      console.log('I have been mousewheel!');
		});
  })
}
// dom节点渲染完毕再加载
onMounted(() => {
  init3dModel()
})
 
</script>
 
<template>
  <div class="model-container">
    <!-- 准备3D渲染节点 -->
    <canvas class="canvas-3d" ref="ref3d" />
  </div>
</template>
 
 
<style scoped lang="css">
.model-container {
  height: 100vh;
  background-color: black;
  width: 100vh;
  flex-shrink: 0;
}
</style>