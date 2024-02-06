import { useDialog } from 'naive-ui'
export const useSeries = (config, comClass) => {
  const activeTab = ref(0)

  const dialog = useDialog()

  const handleAddSeriesItem = () => {
    const len = config.value.series.length
    config.value.series.push(new comClass(`系列${len + 1}`))
    activeTab.value = len
  }

  const handRemoveSeriesItem = index => {
    dialog.warning({
      title: '警告',
      showIcon: false,
      content: '请确认删除该系列,删除后无法恢复.',
      positiveText: '确定',
      negativeText: '取消',
      class: 'remove-series',
      onPositiveClick: () => {
        config.value.series.splice(index, 1)
        activeTab.value = index ? index - 1 : 0
      },
      onNegativeClick: () => {
      },
    })
  }

  return {
    activeTab,
    handleAddSeriesItem,
    handRemoveSeriesItem,
  }
}
