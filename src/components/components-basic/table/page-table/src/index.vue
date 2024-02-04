<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-31 14:54:34
 * @LastEditTime : 2024-02-02 17:44:37
-->
<template>
  <div class="datav-wrapper page-table" :style="wrapperStyle">
    <el-table
      :data="tableData"
      style="width: 100%;"
      :max-height="attr.h - 40"
      :show-overflow-tooltip="config.table.showOverflowTooltip"
      tooltip-effect="dark"
      :header-row-style="handHeaderStyle"
      :row-style="handRowStyle"
      :show-header="config.table.showHeader"
      :border="config.table.border"
    >
      <el-table-column
        v-for="item in config.series"
        :key="item.columns.field"
        :prop="item.columns.field"
        :label="item.columns.label"
        :width="item.columns.width || undefined"
        :min-width="item.columns.minWidth || undefined"
      />
    </el-table>
    <div :style="pageStyle">
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="rows"
        :layout="config.page.layout.join(',')"
        :total="total"
        :hide-on-single-page="config.page.hideOnSinglePage"
        :page-sizes="config.page.pageSize"
        :default-page-size="rows"
        :background="config.page.background"
        @current-change="handleCurrent"
      />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed, ref, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { ElTable, ElTableColumn, ElPagination } from 'element-plus'
import { PageTable } from './page-table'

const props = defineProps<{
  com: PageTable
}>()

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? {}
})

const dv_field = computed(() => {
  return getFieldMap(props.com.apis.source.fields)
})

const tableData = computed(() => dv_data.value?.[dv_field.value?.data] || [])
const total = computed(() => dv_data.value?.[dv_field.value?.total] || 0)
const page = ref(1)
const rows = ref(10)

const wrapperStyle = computed(() => {
  const textStyle = config.value.generate.textStyle
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
    ...textStyle,
    fontSize: useNumberToPx(textStyle.fontSize),
  }
})

const pageStyle = computed(() => {
  const { position, marginTop } = config.value.page
  return {
    display: 'flex',
    justifyContent: position,
    marginTop: useNumberToPx(marginTop),
  }
})
const handleCurrent = currPage => {
  setTableApiPage(currPage)
}
const handHeaderStyle = () => {
  const { height, background, color, fontSize } = config.value.table.header
  return {
    ...config.value.table.header,
    height: useNumberToPx(height),
    ...setChartColor(background) as any,
    color: setChartColor(color),
    fontSize: useNumberToPx(fontSize),
    backgroundSize: '100% 100%',
  }
}
const handRowStyle = ({ rowIndex }) => {
  const { height, background, color, fontSize } = config.value.table.body
  const { odd, even } = config.value.table.body
  const obj = (rowIndex + 1) % 2 ? odd.enable ? {
    ...setChartColor(odd.background) as any,
    color: setChartColor(odd.color),
  } : {} : even.enable ? {
    ...setChartColor(even.background) as any,
    color: setChartColor(even.color),
  } : {}
  return {
    ...config.value.table.header,
    height: useNumberToPx(height),
    ...setChartColor(background) as any,
    color: setChartColor(color),
    fontSize: useNumberToPx(fontSize),
    backgroundSize: '100% 100%',
    ...obj,
  }
}

const borderBottom = computed(() => {
  const { borderColor, borderWidth, borderType } = config.value.table.borderBottomStyle
  return config.value.table.borderBottom
    ? `${borderWidth}px ${borderType} ${setChartColor(borderColor)}`
    : 'none'
})
const borderRight = computed(() => {
  const { borderColor, borderWidth, borderType } = config.value.table.borderStyle
  return config.value.table.border
    ? `${borderWidth}px ${borderType} ${setChartColor(borderColor)}`
    : 'none'
})
const setTableApiPage = (currPage = 1) => {
  const { page, rows: rowsKey } = config.value.page
  const obj = {
    ...JSON.parse(props.com.apiData.source?.config?.apiBody || '{}'),
    [page]: currPage,
    [rowsKey]: rows.value,
  }
  props.com.apiData.source.config.apiBody = JSON.stringify(obj)
}
// 首次请求设置分页参数
setTableApiPage()
const apiStore = useApiStore()
useDataCenter(props.com)

watchEffect(() => {
  setTableApiPage()
})

const pageActiveBackground = computed(() => setChartColor(config.value.page.activeBg))
const pageActiveColor = computed(() => setChartColor(config.value.page.activeColor))
const pageBackground = computed(() => setChartColor(config.value.page.backgroundColor))
const pageColor = computed(() => setChartColor(config.value.page.color))
const pageDisableColor = computed(() => setChartColor(config.value.page.disableColor))
const pageDisableBg = computed(() => setChartColor(config.value.page.disableBg))

</script>

<style lang="scss" scoped>
.datav-wrapper.page-table {
  :deep(.el-table) {
    tr,
    th.el-table__cell {
      background-color: transparent;
    }

    td.el-table__cell {
      border-bottom: v-bind('borderBottom');
    }

    .cell {
      line-height: unset;
    }

    &.el-table--border .el-table__cell {
      border-right: v-bind('borderRight');
    }
  }

  :deep(.el-pagination) {
    &.is-background .el-pager li {
      background-color: v-bind('pageBackground');
      color: v-bind('pageColor');
      transition: all 0.25s ease-in-out;

      &:hover {
        background-color: v-bind('pageActiveBackground');
        color: v-bind('pageActiveColor');
      }

      &.is-active {
        background-color: v-bind('pageActiveBackground');
        color: v-bind('pageActiveColor');
      }
    }

    &.is-background {
      .btn-next,
      .btn-prev {
        transition: all 0.25s ease-in-out;
        color: v-bind('pageColor');
        background-color: v-bind('pageBackground');

        &:hover {
          color: v-bind('pageActiveColor');
          background-color: v-bind('pageActiveBackground');
        }
      }

      .btn-prev:disabled,
      .btn-next:disabled {
        color: v-bind('pageDisableColor');
        background-color: v-bind('pageDisableBg');
      }
    }
  }
}

</style>
