<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:02
 * @LastEditTime : 2024-02-06 11:35:31
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
          <img v-lazy="temp.isSystem ? sysLogo : publicLogo" class="temp-snap">
          <img v-lazy="temp.snapshot" alt="" class="preview-image">
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
        <h2>{{ group ? group.name : '' }}<span class="datav-tip-font">({{ page.total || '暂无' }})</span></h2>
      </div>
      <div class="header-manager">
        <div class="search-wrapper">
          <n-pagination
            :item-count="page.total"
            :page-sizes="[20, 30, 40, 50, 60]"
            show-size-picker
            :page-slot="8"
            :page="page.page"
            @update:page="handlePageChange"
            @update:page-size="handlePageSizeChange"
          />
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
import { NButton, useMessage, NSpin, NPagination } from 'naive-ui'
import { ProjectGroup, ProjectTemplate } from '@/domains/project'
import { IconSearch, IconArrowDown } from '@/icons'
import MyScreen from './my-screen.vue'
import PublishScreen from './publish-screen.vue'
import { projectListInjectionKey } from './config'
import { getScreenPage } from '@/api/screen'
import { getSysTemplates } from '@/api/templates'
import sysLogo from '@/assets/img/home/sys.webp'
import publicLogo from '@/assets/img/home/public.webp'
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
    CreateEmptyScreen,
    CreateTempScreen,
    NSpin,
    NPagination,
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
    const page = ref({
      page: 1,
      size: 20,
      total: 0,
    })
    const getProjectScreen = async () => {
      try {
        const res = await getScreenPage({
          page: page.value.page,
          size: page.value.size,
          groupId: props.group?.depId,
          name: searchText.value,
          order: sort.value,
        })

        showLoading.value = true
        if (res.code === 1000) {
          proScreens.value = res.data?.list
          page.value.total = res.data?.pagination?.total || 0
        }
        else {
          nMessage.error(res.message)
          page.value.total = 0
          proScreens.value = []
        }
      } catch (error) {
        showLoading.value = false
      }
      showLoading.value = false
    }
    watch(() => props.group, val => {
      if (val) {
        page.value.page = 1
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

    // UN_PUBLISH ======================= 构建部署包 ===================================
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

    const handlePageSizeChange = (size: number) => {
      page.value.size = size
      getProjectScreen()
    }
    const handlePageChange = (cur_page: number) => {
      console.log('cur_page: ', cur_page)
      page.value.page = cur_page
      getProjectScreen()
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
      showNewScreen,
      showTempScreen,
      useTemplate,
      showLoading,
      page,
      handCreateByTemplate,
      handlePageSizeChange,
      handlePageChange,
      handleSortChange,
      handCreateNew,
      getProjectScreen,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './project-list.scss';
</style>
