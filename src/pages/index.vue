<template>
  <div class="carousel">
    <a-carousel :dots="false" ref='carouselRef' :after-change="onChange">
      <div v-for="item in data" class="item">
        {{ item.title }}
      </div>
    </a-carousel>
    <div class="carousel-page">
      <CarouselPage :total="data.length" :current="current" @goTo="handleGoTo"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CarouselPage from '~/components/CarouselPage.vue';

const current = ref(0)

const data = new Array(10).fill(0).map((_, index) => ({
  key: index + 1,
  title: `title ${index + 1}`,
  content: `content ${index + 1}`,
}))

let timer: NodeJS.Timeout | null = null

onMounted(() => {
  start()
})

onBeforeUnmount(() => {
  timer && clearInterval(timer)
})

const carouselRef = ref()

watch(current, () => {
  carouselRef?.value.goTo(current.value, true)
})

function start() {
  timer = setInterval(() => {
    current.value++
    if (current.value > data.length - 1) {
      current.value = 0
    }
  }, 2000)
}


function handleGoTo(no:number) {
  console.log(no);
  current.value = no - 1
}

function onChange() {

}
</script>

<style lang="scss" scoped>
.carousel {
  width: 600px;
  position: relative;

  .carousel-page {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 30px;
    background: #1C120E;
  }
}

.item {
  height: 300px;
  background: #364d79;
  color: white;
  font-size: 32px;
  text-align: center;
  padding-top: 100px;
}
</style>