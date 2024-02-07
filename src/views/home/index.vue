<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:02
 * @LastEditTime : 2024-02-07 12:17:10
-->
<template>
  <div class="datav">
    <!-- <nav-header :is-fixed="isFixed" /> -->
    <nav-main
      ref="navMainRef"
      :navs="navs"
      :style="{ background: isFixed ? 'var(--datav-body-bg)' : '' }"
      @change="onNavChange"
    />
    <div class="nav-shadow"></div>
    <div class="datav-main">
      <div class="datav-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSocketStore } from '@/store/socket'
import NavMain from './nav-main.vue'

export default defineComponent({
  name: 'Home',
  components: {
    NavMain,
  },
  setup() {
    const navMainRef = ref(null)
    const isFixed = ref(false)

    const navs = ref([
      { id: 0, key: 'MyProject', name: '我的可视化' },
      { id: 1, key: 'MyData', name: '数据源' },
      { id: 2, key: 'MyCom', name: '收藏组件' },
      // { id: 3, key: 'MyFont', name: '字体' },
      { id: 3, key: 'MyPhoto', name: '媒体' },
      { id: 4, key: 'MyMap', name: '地图' },
      { id: 5, key: 'MyCase', name: '教程' },
    ])

    const router = useRouter()

    const scroll = () => {
      isFixed.value = navMainRef.value.$el.offsetTop > 200
    }

    const onNavChange = (nav: any) => {
      router.push({ name: nav.key })
    }

    // const socketStore = useSocketStore()
    // socketStore.createSocket()

    onMounted(() => {
      window.addEventListener('scroll', scroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', scroll)
    })

    return {
      navMainRef,
      isFixed,
      navs,
      onNavChange,
    }
  },
})
</script>

<style lang="scss" scoped>
.datav {
  height: 100%;
  background: #05080f;

  .nav-shadow {
    background: linear-gradient(180deg, transparent, var(--datav-body-bg));
    height: 50px;
    position: relative;
    width: 100%;
    z-index: 1;
  }

  .datav-main {
    user-select: none;
    // margin-top: 14px;
    height: calc(100% - 50px);
    background-image: url(/src/assets/img/home/bg.webp);
    background-repeat: no-repeat;
    background-position: 100% 100%;

    .datav-content {
      position: relative;
      color: var(--datav-body-bg);
      height: 100%;
      top: 14px;
      overflow-y: auto;
    }
  }
}
</style>
