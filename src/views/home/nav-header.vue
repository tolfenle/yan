<template>
  <div class="datav-hearder" :style="{ background: isFixed ? '#171b22' : '' }">
    <!-- TODO 公告 -->
    <!-- <div class="logo">
      <div class="top-tip">
        <strong class="tip-strong">公告</strong>
        <div class="datav-marquee">
          <span class="content">
            <template v-for="n in 2" :key="n">
              1. 金合可视化平台 仅支持谷歌 Chrome 浏览器版本 62 以上。2. 金合可视化平台 基于 Vue 3.x 开发。3. 项目地址：<a href="https://github.com/pengxiaotian/datav-vue" target="_blank" class="project-href">https://github.com/pengxiaotian/datav-vue</a>
              <span class="content-space"></span>
            </template>
          </span>
        </div>
      </div>
    </div> -->
    <div class="user">
      <div class="header-item">
        <n-dropdown
          :options="profileOpts"
          placement="bottom-end"
          :show-arrow="true"
          @select="handleProfileSelect"
        >
          <span class="user-link-wrap">
            <n-avatar
              round
              :size="20"
              :src="avatar + '?imageView2/1/w/80/h/80'"
            />
            <span class="user-link">
              {{ userName }}
            </span>
            <n-icon :size="14">
              <IconArrowDown />
            </n-icon>
          </span>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { h, defineComponent, computed } from 'vue'
import { NCarousel, NIcon } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { IconLogout, IconArrowDown, IconDocument } from '@/icons'
import { getHomeImage } from '@/api/user'

const cdn = import.meta.env.VITE_APP_CDN

export default defineComponent({
  name: 'NavHeader',
  components: {
    IconArrowDown,
    NCarousel,
  },
  props: {
    isFixed: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const userStore = useUserStore()
    const router = useRouter()

    const profileOpts = [
      {
        label: '帮助文档',
        key: 'doc',
        icon: () => h(NIcon, null, { default: () => h(IconDocument) }),
      },
      {
        type: 'divider',
        key: 'd1',
      },
      {
        label: '退出',
        key: 'logout',
        icon: () => h(NIcon, null, { default: () => h(IconLogout) }),
      },
    ]

    const logout = async () => {
      await userStore.logout()
      router.push({ name: 'Login' })
    }

    const handleProfileSelect = (key: string) => {
      if (key === 'logout') {
        logout()
      }
    }

    const homeBg = ref([])
    const { setUrl } = useEnvUrl()
    const getImages = async () => {
      const res = await getHomeImage()
      if (res.code === 1000) {
        homeBg.value = res.data?.data?.split(',').map(item => setUrl(item))
      }
    }
    getImages()

    return {
      homeBg,
      cdn,
      userName: computed(() => userStore.name),
      avatar: computed(() => userStore.avatar),
      profileOpts,
      handleProfileSelect,
    }
  },
})
</script>

<style lang="scss">
@import '@/styles/mixins/function';

.datav-hearder {
  display: flex;
  justify-content: flex-end;
  z-index: 999;
  width: 200px;

  .logo {
    display: flex;
    flex: 1;
    align-items: center;
    padding-left: 18px;
  }

  .user {
    display: flex;
    justify-content: flex-end;
    padding-right: 15px;
    align-items: center;
    font-size: 14px;
    z-index: 9;

    .header-item {
      margin: 0 5px;
      padding: 0 10px;
      cursor: pointer;
      user-select: none;
      color: var(--datav-font-color);
      line-height: 20px;
      height: 20px;
    }

    .user-link-wrap {
      display: flex;
      align-items: center;
    }

    .user-link {
      display: inline-block;
      vertical-align: middle;
      margin: 0 4px;
      line-height: 20px;
      height: 20px;
      color: var(--datav-font-color);
    }
  }
}

.top-tip {
  padding: 6px 0;
  font-size: 12px;
  color: var(--datav-font-color);
  display: flex;
  right: 0;
  height: 30px;
  margin-right: 24px;
  width: 600px;

  .tip-strong {
    white-space: nowrap;
    padding-right: 8px;
  }
}

.datav-marquee {
  display: block;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;
  position: relative;

  .content {
    display: inline-block;
    position: relative;
    padding-right: 0;
    white-space: nowrap;
    animation: marque-animation 20s infinite linear;
    z-index: 0;

    &:hover {
      animation-play-state: paused;
    }
  }

  .content-space {
    display: inline-block;
    width: 5em;
  }

  .project-href {
    color: var(--datav-font-color);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

@keyframes marque-animation {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.datav-nav {
  display: flex;
  position: absolute;
  top: 0;
  flex-direction: column;
  background: var(--datav-body-bg);
  width: 100%;
  height: 64px;

  .header-img {
    opacity: 1;
    z-index: 1;
  }

  .nav-img-text {
    z-index: 1;
    transform-origin: 0 0;
    transform: scale(0.5);
    top: 80px;
    left: 40px;
    position: absolute;
    user-select: none;
    cursor: pointer;
    height: 115px;
  }

  .nav-img,
  .nav-img-bg {
    position: absolute;
    width: 100%;
    height: 290px;
    background-size: cover;
    background-position: center;

    .carousel-img {
      width: 100%;
      height: 242px;
      float: right;
    }
  }

  .nav-img-bg {
    background-image: linear-gradient(90deg, #0c0c0c 7%, #1a191900);
  }
}
</style>
