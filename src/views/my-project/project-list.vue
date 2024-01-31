<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:02
 * @LastEditTime : 2024-01-31 09:29:00
-->
<template>
  <div>
    <!-- <div class="new-projects-title">选择下面的方式进行创建</div> -->
    <div class="project-template">
      <div class="title">
        <p>精选资源</p>
        <router-link
          :to="{ name: 'CreateScreen' }"
          target="_blank"
        >
          更多精选资源
        </router-link>
      </div>
      <div class="template-list">
        <div v-for="(temp, index) in templatesList" :key="temp.id" class="template-item">
          <img class="temp-snap" :src="temp.isSystem ? sysLogo : publicLogo">
          <img :src="temp.snapshot" alt="" class="preview-image">
          <p class="template-name">{{ temp.name }}</p>

          <div class="template-mask">
            <n-button
              type="primary"
              :focusable="false"
              class="create-btn"
              @click="handCreateByTemplate(temp, index)"
            >
              创建
            </n-button>
          </div>
        </div>
      </div>
    </div>
    <div class="project-header">
      <div class="project-title">
        <h2>{{ group ? group.name : '' }}<span class="datav-tip-font">({{ proScreens.length || '暂无' }})</span></h2>
      </div>
      <div class="header-manager">
        <n-button secondary type="info" @click="handCheckScreen">构建部署包</n-button>
        <n-button type="info" secondary @click="handBuildList">构建记录</n-button>
        <div class="search">
          <input
            v-model.trim="searchText"
            clearable
            class="search-input"
            placeholder="搜索"
          >
        </div>
        <n-icon class="icon-search">
          <IconSearch @click="getProjectScreen" />
        </n-icon>

        <n-dropdown
          :options="sortOpts"
          :show-arrow="true"
          @select="handleSortChange"
        >
          <div class="sort-type">
            <span class="sort-text" :title="sorts[sort]">
              {{ sorts[sort] }}
            </span>
            <n-icon class="icon-arrow">
              <IconArrowDown />
            </n-icon>
          </div>
        </n-dropdown>
      </div>
    </div>
    <n-spin :show="showLoading">
      <div class="main-screen">
        <div class="new-projects">
          <div class="create-new-project" @click="handCreateNew">
            <img src="@/assets/img/home/位图(1).webp">
            <span class="project-type ellipsis">创建空白项目</span>
          </div>
        </div>
          <div
            v-for="screen in proScreens"
            :key="screen?.id"
            class="screen-item"
          >
            <my-screen :screen="screen" />
          </div>
      </div>
    </n-spin>
    <publish-screen v-model="visiblePublish" :screen-id="publishAppId" />
    <ScreenRlease v-model="showRelease" :project-id="group?.depId" :screen="group" />
    <CreateEmptyScreen v-model="showNewScreen" :project-id="group?.depId" @request="getProjectScreen" />
    <CreateTempScreen
      v-model="showTempScreen"
      :use-template="useTemplate"
      :project-id="group?.depId"
      :templates="templatesList"
      @request="getProjectScreen"
    />
  </div>
</template>

<script lang='ts'>
import {
  defineComponent, ref, PropType,
  watch, toRef, provide,
} from 'vue'
import { NButton, NCheckboxGroup, NCheckbox, useMessage, NSpin } from 'naive-ui'
import { ProjectGroup, ProjectTemplate } from '@/domains/project'
import { IconSearch, IconArrowDown } from '@/icons'
import MyScreen from './my-screen.vue'
import PublishScreen from './publish-screen.vue'
import { projectListInjectionKey } from './config'
import { getScreenByProject } from '@/api/screen'
import { getSysTemplates } from '@/api/templates'
import sysLogo from '@/assets/img/home/sys.webp'
import publicLogo from '@/assets/img/home/public.webp'
import ScreenRlease from './export-screen.vue'
import CreateEmptyScreen from './create-empty-screen.vue'
import CreateTempScreen from './create-temp-screen.vue'

const cdn = import.meta.env.VITE_APP_CDN

export default defineComponent({
  name: 'ProjectList',
  components: {
    MyScreen,
    PublishScreen,
    IconSearch,
    IconArrowDown,
    NButton,
    ScreenRlease,
    CreateEmptyScreen,
    CreateTempScreen,
    NSpin,
  },
  props: {
    group: Object as PropType<ProjectGroup>,
  },
  setup(props) {
    const nMessage = useMessage()
    const searchText = ref('')
    const sort = ref('createTime')
    const sorts = {
      name: '按名称排序',
      createTime: '按创建时间排序',
      updateTime: '按修改时间排序',
    }
    const sortOpts = Object.entries(sorts).map(([key, label]) => ({ key, label }))
    const visiblePublish = ref(false)
    const publishAppId = ref('')

    const handleSortChange = (key: string) => {
      sort.value = key
      getProjectScreen()
    }

    const proScreens = ref([])
    const showLoading = ref(false)
    const getProjectScreen = async () => {
      try {
        const res = await getScreenByProject({
          id: props.group?.depId,
          name: searchText.value,
          order: sort.value,
        })
        showLoading.value = true
        if (res.code === 1000)
          proScreens.value = res.data
        else
          nMessage.error(res.message)
      } catch (error) {
        showLoading.value = false
      }
      showLoading.value = false
    }
    watch(() => props.group, val => {
      if (val) {
        getProjectScreen()
      }
    }, { deep: true })

    provide(projectListInjectionKey, {
      publish(appId: number | string) {
        visiblePublish.value = true
        publishAppId.value = appId as any
      },
    })

    const templatesList = ref([])
    const { setUrl } = useEnvUrl()
    const getSystemTemplate = async () => {
      const res = await getSysTemplates()
      if (res.code === 1000)
        templatesList.value = res.data?.list.map(v => {
          return {
            ...v,
            snapshot: setUrl(v.snapshot),
          }
        })
      else {
        templatesList.value = []
      }
    }
    getSystemTemplate()

    //======================= 构建部署包 ===================================
    // 选择需要构建的应用
    const handCheckScreen = () => {
      nMessage.warning('单/多应用独立部署暂未开源,如有需要可在右下角意见反馈中留下您的联系方式', {
        duration: 0,
        closable: true,
        showIcon: false,
      })
    }
    const showRelease = ref(false)
    const handBuildList = () => {
      showRelease.value = true
    }

    //======================= 新建空白应用 ===================================
    const showNewScreen = ref(false)
    const handCreateNew = () => {
      showNewScreen.value = true
    }

    const useTemplate = ref()
    const showTempScreen = ref(false)
    const handCreateByTemplate = (tpl: ProjectTemplate, idx: number) => {
      showTempScreen.value = true
      useTemplate.value = tpl
    }

    return {
      cdn,
      searchText,
      sort,
      sorts,
      sortOpts,
      visiblePublish,
      publishAppId,
      proScreens,
      templatesList,
      sysLogo,
      publicLogo,
      showRelease,
      handleSortChange,
      handCheckScreen,
      handBuildList,
      handCreateNew,
      getProjectScreen,
      showNewScreen,
      showTempScreen,
      handCreateByTemplate,
      useTemplate,
      showLoading,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './project-list.scss';
</style>
