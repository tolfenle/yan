<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:02
 * @LastEditTime : 2024-01-18 12:16:10
-->
<template>
  <div class="nav-main">
    <div class="nav-logo">
      <img src="@/assets/img/logo.png">
      <h2>金合可视化平台</h2>
    </div>
    <!-- <canvas id="nav-canvas" style="position: absolute; z-index: -1; left: 0;"></canvas> -->
    <div class="nav-list">
      <span v-for="nav in navs" :key="nav.id" class="nav-span">
        <a
          class="nav-link"
          :class="{ 'nav-active': activeNav === nav.id }"
          @click="toggleNav(nav)"
        >
          <n-icon class="nav-icon" :size="20">
            <IconLayer v-if="nav.key === 'MyProject'" />
            <IconMyData v-else-if="nav.key === 'MyData'" />
            <IconMyCom v-else-if="nav.key === 'MyCom'" />
            <IconTutorial v-else-if="nav.key === 'MyCase'" />
            <IconNavMedia v-else-if="nav.key === 'MyPhoto'" />
            <IconNavMap v-else-if="nav.key === 'MyMap'" />
          </n-icon>
          {{ nav.name }}
        </a>
      </span>
    </div>
    <nav-header />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import type { PropType } from 'vue'
import { useRoute } from 'vue-router'
import { debounce } from 'lodash-es'
import { IconLayer, IconMyData, IconMyCom, IconTutorial, IconNavMedia, IconNavMap } from '@/icons'
import { NavCanvas } from './nav-canvas'
import NavHeader from './nav-header.vue'

interface NavDataType {
  id: number
  key: string
  name: string
}

export default defineComponent({
  name: 'NavMain',
  components: {
    IconLayer,
    IconMyData,
    IconMyCom,
    IconTutorial,
    IconNavMedia,
    IconNavMap,
    NavHeader,
  },
  props: {
    navs: {
      type: Array as PropType<NavDataType[]>,
      required: true,
    },
  },
  emits: ['change'],
  setup(props, context) {
    const route = useRoute()
    const activeNav = ref(0)
    let nc: NavCanvas | null = null

    const toggleNav = (nav: NavDataType) => {
      activeNav.value = nav.id
      context.emit('change', nav)
      // if (nc) {
      //   activeNav.value = nav.id
      //   nc.toggle(nav.id)
      //   context.emit('change', nav)
      // }
    }

    const debNavResize = debounce(() => {
      if (nc) {
        nc.resize()
      }
    }, 500)

    onMounted(() => {
      const nav = props.navs.find(m => m.key === route.name)
      activeNav.value = nav ? nav.id : 0
      // nc = new NavCanvas('nav-canvas', '.nav-main .nav-span', activeNav.value)
      // window.addEventListener('resize', debNavResize)
    })

    onUnmounted(() => {
      // window.removeEventListener('resize',debNavResize)
    })

    return {
      toggleNav,
      activeNav,
    }
  },
})
</script>

<style lang="scss" scoped>
.nav-main {
  z-index: 10;
  display: flex;
  position: fixed;
  width: 100%;
  min-width: 1024px;
  user-select: none;
  height: 64px;
  background-image: url('@/assets/img/home/顶部bg.webp');

  .nav-list {
    display: flex;
    flex: 1;
  }

  .nav-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    margin-right: 12px;

    img {
      height: 80%;
    }

    h2 {
      font-weight: normal;
      font-size: 24px;
      color: var(--datav-gui-font-color-1);
    }
  }

  .nav-span {
    display: flex;
    align-items: center;

    .nav-link {
      display: flex;
      align-items: center;
      text-decoration: none !important;
      color: #b9c2cc;
      width: auto;
      min-width: 140px;
      height: 40px;
      font-size: 14px;
      text-align: left;
      cursor: pointer;
      padding: 0 20px;
      border-radius: 6px;
      margin: 0 8px;
      transition: background-color 0.25s ease-in-out;

      &.nav-active,
      &:hover {
        color: var(--datav-gui-font-color-1) !important;
        background-color: #2d3136;
      }
    }

    .nav-icon {
      margin-right: 5px;
    }
  }
}
</style>
