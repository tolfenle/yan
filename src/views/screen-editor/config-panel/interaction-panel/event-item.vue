<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-10 18:32:30
 * @LastEditTime : 2024-01-12 12:21:21
-->
<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:03
 * @LastEditTime : 2024-01-12 11:32:04
-->
<template>
  <div class="event">
    <div class="events-title">
      <n-icon :class="visible ? 'events-down' : 'events-up'" @click="visible = !visible">
        <IconArrowRight />
      </n-icon>
      <div class="event-text" @click="visible = !visible">{{ item.description }}</div>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-icon class="event-add" @click="handAddEvent">
            <IconPlus />
          </n-icon>
        </template>
        添加组件事件
      </n-tooltip>

      <!-- <n-checkbox
        v-model:checked="isEnabled"
        class="enable-checkbox"
        @update:checked="onEnableChange"
        @click.stop
      >
        启用
      </n-checkbox> -->
    </div>
    <div v-if="visible" class="variables">
      <div v-for="(eve, index) in com.events[item.name]?.events" :key="index">
        <p :style="{ color: getEventColor(eve.type) }">{{ getEvenType(eve.type) }}</p>
        <n-input v-model:value="eve.name" size="small" clearable />
        <div class="event-item-icon">
          <n-icon class="event-icon" @click="handEditEvent(com.events[item.name]?.events, index)">
            <IconEdit />
          </n-icon>
          <n-popconfirm
            size="small"
            @positive-click="handDeleteEvent(com.events[item.name]?.events, index)"
          >
            <template #trigger>
              <n-icon class="event-icon">
                <IconDelete />
              </n-icon>
            </template>
            是否删除 [ {{ getEvenType(eve.type) }} - {{ eve.name }} ]
          </n-popconfirm>
        </div>
        <n-checkbox v-model:checked="eve.enable" class="enable-checkbox" @click.stop>
          启用
        </n-checkbox>
      </div>
    </div>
  </div>

  <n-drawer
    v-model:show="showEventDrawer"
    :show-mask="false"
    resizable
    :width="500"
    :max-width="1200"
    :min-width="400"
    class="com-event-draw"
    @update:show="toggleShow"
  >
    <n-drawer-content :title="eventTitle" closable>
      <g-field label-span="5" label="事件名称">
        <g-input v-model="editEvent.name" clearable />
      </g-field>
      <g-field label-span="5" label="事件类别">
        <n-radio-group v-model:value="editEvent.type" @change="editEvent.actions = null">
          <n-radio-button v-for="ev in eventTypes" :key="ev.id" :value="ev.id">
            {{ ev.value }}
          </n-radio-button>
        </n-radio-group>
      </g-field>
      <!-- ++++++++++++++++++++ 组件事件 ++++++++++++++++++++ -->
      <template v-if="editEvent.type === EVENT_TYPE.组件事件">
        <g-field label-span="5" label="事件目标组件">
          <n-tree-select
            v-model:value="editEvent.target"
            multiple
            checkable
            filterable
            clearable
            :clear-filter-after-select="false"
            :options="eventTree"
            label-field="alias"
            key-field="id"
            :to="false"
          />
        </g-field>
        <g-field label-span="5" label="事件执行动作">
          <g-select v-model="editEvent.actions" :data="actionOptions" size="medium" />
        </g-field>
        <template v-if="editEvent.actions === EVENT_COM_ACTION.重新请求">
          <n-data-table size="small" :columns="showReColumns" :data="editEvent.reRequest.fields" />
          <div class="add-variable">
            <n-button
              :focusable="false"
              type="default"
              size="tiny"
              @click="addField(editEvent.reRequest.fields)"
            >
              <template #icon>
                <n-icon :size="12">
                  <IconPlus />
                </n-icon>
              </template>
              新建一个条件
            </n-button>
          </div>
          <g-field label-span="5" label="自定义函数" />
          <p class="fake-code --start">
            <span class="--keyword">function</span>
            func(param) { // param:组件实例，包含组件的全部属性及请求配置
          </p>
          <g-monaco-editor
            style="width: 100%;"
            language="javascript"
            :code="editEvent.reRequest.func"
            :height="300"
            @blur="handCodeBlur($event, editEvent.reRequest)"
          />
          <p class="fake-code --end">}</p>
        </template>
        <template v-else-if="editEvent.actions === EVENT_COM_ACTION.更新数据">
          <n-popover
            placement="left-start"
            :width="400"
            class="editor-popover"
            :style="{
              '--n-color': '#0000',
            }"
          >
            <template #trigger>
              <div class="ds-response-btn">
                <n-icon class="refresh-btn">
                  <IconSearch />
                </n-icon>
                预览组件当前静态数据
              </div>
            </template>
            <div class="ds-preview-content">
              <g-monaco-editor
                language="json"
                :read-only="true"
                :auto-format="true"
                :height="500"
                :code="com.apiData.source.config.data"
              />
            </div>
          </n-popover>
          <p class="fake-code --start">
            <span class="--keyword">function</span>
            func(param) {
          </p>
          <p class="fake-code --start">param: {com, data}中包含组件实例(com)和点击事件传递的参数(data)</p>
          <p class="fake-code --start">需要return回图表数据</p>
          <g-monaco-editor
            style="width: 100%;"
            language="javascript"
            :code="editEvent.updateData.func"
            :height="500"
            auto-format
            @blur="handCodeBlur($event, editEvent.updateData)"
          />
          <p class="fake-code --end">}</p>
        </template>
        <template v-else-if="[EVENT_COM_ACTION.显示,EVENT_COM_ACTION.隐藏, EVENT_COM_ACTION.切换显隐].includes(editEvent.actions)">
          <g-field label-span="5" tooltip="" label="条件设置" />
          <n-data-table
            empty="未配置条件"
            size="small"
            :columns="showColumns"
            :data="editEvent.updateHiddle.fields"
          />
          <div class="add-variable">
            <n-button
              :focusable="false"
              type="default"
              size="tiny"
              @click="addField(editEvent.updateHiddle.fields)"
            >
              <template #icon>
                <n-icon :size="12">
                  <IconPlus />
                </n-icon>
              </template>
              新建一个条件
            </n-button>
          </div>
        </template>
      </template>
      <!-- ++++++++++++++++++++ 系统事件 ++++++++++++++++++++ -->
      <template v-else-if="editEvent.type === EVENT_TYPE.系统事件">
        <g-field label-span="5" label="事件执行动作">
          <g-select v-model="editEvent.actions" :data="eventSysTypes" />
        </g-field>
        <template v-if="editEvent.actions === EVENT_SYS_ACTION.跳转链接">
          <g-field label-span="5" tooltip="支持拼接参数，如：https://www.baidu.com?name=x&count=y" label="链接地址">
            <g-input
              v-model="editEvent.link"
              clearable
              placeholder="https://www.baidu.com?name=x&count=y"
              label="请输入完整的链接地址，支持拼接参数"
            />
          </g-field>
          <g-field label-span="5" label="打开方式">
            <n-checkbox v-model:checked="editEvent.linkBlank" class="enable-checkbox" @click.stop>
              新窗口打开
            </n-checkbox>
          </g-field>
        </template>
        <template v-else-if="editEvent.actions === EVENT_SYS_ACTION.切换子屏">
          <g-field label-span="5" tooltip="" label="参数设置" />
          <n-data-table
            empty="未配置条件"
            size="small"
            :columns="screenColumns"
            :data="editEvent.sysUpScreen.fields"
          />
          <div class="add-variable">
            <n-button
              :focusable="false"
              type="default"
              size="tiny"
              @click="addField(editEvent.sysUpScreen.fields)"
            >
              <template #icon>
                <n-icon :size="12">
                  <IconPlus />
                </n-icon>
              </template>
              新建一个条件
            </n-button>
          </div>
        </template>
        <template v-else-if="editEvent.actions === EVENT_SYS_ACTION.定时器">
          <g-field label-span="5" label="定时时间">
            <g-input-number v-model="editEvent.timers.timer" suffix="秒" label="请根据实际情况设定时间，间隔过小可能导致性能下将" />
          </g-field>
          <g-field label-span="5" label="循环执行" tooltip="开启循环执行时，每隔设定的定时时间间隔就会再次执行，否则只执行一次">
            <n-checkbox v-model:checked="editEvent.timers.loop" class="enable-checkbox" @click.stop>
              循环执行
            </n-checkbox>
          </g-field>
          <g-field label-span="5" label="定时器内容" />
          <p class="fake-code --start">
            <span class="--keyword">function</span>
            func(param) { // param:组件实例，包含组件的全部属性及请求配置
          </p>
          <g-monaco-editor
            style="width: 100%;"
            language="javascript"
            :code="editEvent.timers.func"
            :height="300"
            @blur="handCodeBlur($event, editEvent.timers)"
          />
          <p class="fake-code --end">}</p>
        </template>
      </template>
      <!-- ++++++++++++++++++++ 自定义 ++++++++++++++++++++ -->
      <template v-else-if="editEvent.type === EVENT_TYPE.自定义事件">
        <p class="fake-code --start">
          <span class="--keyword">function</span>
          func(com, eventName, data, coms) {
        </p>
        <p class="fake-code --start">
          com:当前组件; eventName: 事件名称; data: 数据; coms当前大屏所有组件
        </p>
        <g-monaco-editor
          style="width: 100%;"
          language="javascript"
          :code="editEvent.customEvent.func"
          :height="600"
          @blur="handCodeBlur($event, editEvent.customEvent)"
        />
        <p class="fake-code --end">}</p>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<!-- TODO  根据组件本身disActions响应事件列表 -->
<script lang='ts'>
import { defineComponent, ref, PropType } from 'vue'
import { IconArrowRight, IconDelete, IconPlus, IconSearch, IconEdit } from '@/icons'
import { EventItemConfig, DataEventConfig } from '@/components/_models/data-event'
import { useEditorStore } from '@/store/editor'
import { useComStore } from '@/store/com'
import { NTreeSelect, NPopover, NInput, NSelect, NDataTable, NIcon } from 'naive-ui'

export default defineComponent({
  name: 'EventItem',
  components: {
    IconArrowRight,
    IconDelete,
    IconPlus,
    NTreeSelect,
    IconEdit,
    IconSearch,
    NPopover,
    NInput,
    NDataTable,
    NIcon,
  },
  props: {
    item: {
      type: Object as PropType<EventItemConfig>,
      required: true,
    },
    com: {
      type: Object,
      required: true,
    },
  },
  setup(props) {

    const editorStore = useEditorStore()
    const comStore = useComStore()
    const pages = computed(() => editorStore.pageConfig.pages)
    const screens = computed(() => pages.value?.map(p => ({
      id: p.name,
      value: p.name,
    })))

    const defaultExpendKeys = computed(() => {
      return screens.value.map(sc => sc.id)
    })

    const visible = ref(true)
    const isEnabled = ref(props.item.enable)
    const showEventDrawer = ref(false)
    const eventTitle = ref('')
    const editEvent: Ref<DataEventConfig['events'][0]> = ref()

    const eventTree = computed(() => {
      const pages = editorStore.pageConfig.pages
      const coms = comStore.coms
      const tree = []
      pages.forEach((page: any) => {
        tree.push({
          alias: page.name,
          id: page.id,
          children: coms.filter(com => page.children.includes(com.id)),
        })
      })
      return tree
    })

    const codeValue = ref('')
    // 新增事件
    const handAddEvent = () => {
      const editFields = Object.entries(props.com.events[props.item.name].fields).map(([key, value]) => {
        return {
          name: key,
          ...value as any,
          operator: null,
          checkValue: '',
          screenId: null,
        }
      })
      editEvent.value = useEventConfig(editFields)

      codeValue.value = editEvent.value.customFunc
      props.com.events[props.item.name].events.push(editEvent.value)
      eventTitle.value = props.item.description
      showEventDrawer.value = true
    }

    const onEnableChange = (enable: boolean) => {
      props.item.enable = enable
    }

    const addField = (fields: any[]) => {
      fields.push({
        type: 'string',
        name: '',
        map: '',
        description: '',
        custom: true,
        optional: false,
      })
    }

    const handCodeBlur = (code, param) => {
      param.func = code.value
      editEvent.value.customFunc = codeValue.value
    }

    const eventTypeMap = {
      [EVENT_TYPE.组件事件]: '组件事件',
      [EVENT_TYPE.系统事件]: '系统事件',
      [EVENT_TYPE.自定义事件]: '自定义事件',
    }
    const eventColorMap = {
      [EVENT_TYPE.组件事件]: 'var(--el-color-success)',
      [EVENT_TYPE.系统事件]: 'var(--el-color-primary)',
      [EVENT_TYPE.自定义事件]: 'var(--el-border-color-light)',
    }

    const handDeleteEvent = (events, index) => {
      events.splice(index, 1)
    }

    const handEditEvent = (events, index) => {
      editEvent.value = events[index]
      codeValue.value = editEvent.value.customFunc
      eventTitle.value = props.item.description
      showEventDrawer.value = true
    }


    // const staticCode = ref(props.com.apiData.source.config.data)
    // const handUpdateStaticData = val => {
    //   editEvent.value.customFunc = val.value
    // }

    // const handUpdateStaticDataChange = val => {
    //   staticCode.value = val.value
    // }

    const toggleShow = (bool: boolean) => {
      if (!bool) {
        editEvent.value.customFunc = codeValue.value
        codeValue.value = ''
      }
    }
    const operators = [{
      id: '==',
      value: '等于',
    },{
      id: '>',
      value: '大于',
    },{
      id: '<',
      value: '小于',
    },{
      id: '>=',
      value: '大于等于',
    },{
      id: '<=',
      value: '小于等于',
    },{
      id: '!=',
      value: '不等于',
    },{
      id: 'includes',
      value: '包含',
    }]
    const showHiddens = [{
      id: EVENT_SHOW_HIDDEN.显示,
      value: '显示',
    }, {
      id: EVENT_SHOW_HIDDEN.隐藏,
      value: '隐藏',
    }]
    const showColumns = [{
      title: '字段名',
      key: 'name',
      width: 80,
      render (row, index) {
        return h(NInput, {
          value: row.name,
          onUpdateValue (v) {
            editEvent.value.updateHiddle.fields[index].name = v
          },
        })
      },
    },{
      title: '运算符',
      key: 'operator',
      width: 120,
      render (row, index) {
        return h(NSelect, {
          value: row.operator,
          options: operators,
          labelField: 'value',
          valueField: 'id',
          onUpdateValue (v) {
            editEvent.value.updateHiddle.fields[index].operator = v
          },
        })
      },
    },{
      title: '值',
      key: 'checkValue',
      render (row, index) {
        return h(NInput, {
          value: row.checkValue,
          onUpdateValue (v) {
            editEvent.value.updateHiddle.fields[index].checkValue = v
          },
        })
      },
    },{
      title: '状态',
      key: 'map',
      width: 100,
      render (row, index) {
        return h(NSelect, {
          value: row.map,
          options: showHiddens,
          labelField: 'value',
          valueField: 'id',
          onUpdateValue (v) {
            editEvent.value.updateHiddle.fields[index].map = v
          },
        })
      },
    },{
      title: '',
      key: '',
      width: 50,
      render (row, index) {
        return h(NIcon, {
          onClick (v) {
            editEvent.value.updateHiddle.fields.splice(index, 1)
          },
        },{
          default: () => h(IconDelete),
        })
      },
    }]
    const showReColumns = [{
      title: '字段名',
      key: 'name',
      width: 80,
      render (row, index) {
        return h(NInput, {
          value: row.name,
          onUpdateValue (v) {
            editEvent.value.reRequest.fields[index].name = v
          },
        })
      },
    },{
      title: '映射字段名',
      key: 'map',
      width: 120,
      render(row, index) {
        return h(NInput, {
          value: row.map,
          onUpdateValue (v) {
            editEvent.value.reRequest.fields[index].map = v
          },
        })
      },
    },{
      title: '说明',
      key: 'description',
      width: 120,
      render(row, index) {
        return h(NInput, {
          disabled: true,
          value: row.description || '暂无',
        })
      },
    },{
      title: '',
      key: '',
      width: 50,
      render (row, index) {
        return h(NIcon, {
          onClick (v) {
            editEvent.value.reRequest.fields.splice(index, 1)
          },
        },{
          default: () => h(IconDelete),
        })
      },
    }]
    const screenColumns = [{
      title: '字段名',
      key: 'name',
      width: 80,
      render (row, index) {
        return h(NInput, {
          value: row.name,
          onUpdateValue (v) {
            editEvent.value.sysUpScreen.fields[index].name = v
          },
        })
      },
    },{
      title: '运算符',
      key: 'operator',
      width: 120,
      render (row, index) {
        return h(NSelect, {
          value: row.operator,
          options: operators,
          labelField: 'value',
          valueField: 'id',
          onUpdateValue (v) {
            editEvent.value.sysUpScreen.fields[index].operator = v
          },
        })
      },
    },{
      title: '目标值',
      key: 'checkValue',
      width: 100,
      render (row, index) {
        return h(NInput, {
          value: row.checkValue,
          onUpdateValue (v) {
            editEvent.value.sysUpScreen.fields[index].checkValue = v
          },
        })
      },
    },{
      title: '子屏',
      key: 'screenId',
      render (row, index) {
        return h(NSelect, {
          value: row.screenId,
          options: screens.value,
          labelField: 'value',
          valueField: 'id',
          onUpdateValue (v) {
            editEvent.value.sysUpScreen.fields[index].screenId = v
          },
        })
      },
    },{
      title: '',
      key: '',
      width: 50,
      render (row, index) {
        return h(NIcon, {
          onClick (v) {
            editEvent.value.sysUpScreen.fields.splice(index, 1)
          },
        },{
          default: () => h(IconDelete),
        })
      },
    }]
    return {
      handDeleteEvent,
      handEditEvent,
      toggleShow,
      codeValue,
      screens,
      handCodeBlur,
      addField,
      eventTree,
      editEvent,
      visible,
      isEnabled,
      eventTitle,
      showEventDrawer,
      showColumns,
      showReColumns,
      screenColumns,
      onEnableChange,
      handAddEvent,
      pages,
      EVENT_TYPE: EVENT_TYPE,
      getEvenType: type => eventTypeMap[type],
      getEventColor: type => eventColorMap[type],
      actionOptions: Object.entries(EVENT_COM_ACTION).map(([key, value]) => ({ id: value, value: key })),
      EVENT_SYS_ACTION: EVENT_SYS_ACTION,
      EVENT_COM_ACTION: EVENT_COM_ACTION,
      // handUpdateStaticData,
      // handUpdateStaticDataChange,
      eventTypes: [{
        id: 'com-event',
        value: '组件事件',
      }, {
        id: 'sys-event',
        value: '系统事件',
      }, {
        id: 'custom-event',
        value: '自定义事件',
      }],
      eventSysTypes: [{
        id: EVENT_SYS_ACTION.切换子屏,
        value: '切换子屏',
      },{
        id: EVENT_SYS_ACTION.跳转链接,
        value: '跳转链接',
      }, {
        id: EVENT_SYS_ACTION.定时器,
        value: '定时器',
      }],
      operators,
      showHiddens,
      defaultExpendKeys,
    }
  },
})
</script>
