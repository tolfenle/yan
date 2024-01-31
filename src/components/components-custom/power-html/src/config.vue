<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-26 17:08:44
 * @LastEditTime : 2024-01-26 17:59:13
-->
<template>
  <div>
    <p title="function formatter(data) {" class="fake-code --start">
      return HTML代码
      <n-popover trigger="click" placement="left" width="800">
        <template #trigger>
          <n-button quaternary text type="primary">
            查看参数信息
          </n-button>
        </template>
        <g-monaco-editor
          language="typescript"
          :code="descriptionCode"
          :height="600"
          readonly
          editor-class="formatter-editor"
        />
      </n-popover>
    </p>
    <p title="function formatter(data) {" class="fake-code --start">
      <span class="--keyword">function</span> formatter(com, data, color) {
    </p>
  </div>
  <g-monaco-editor
    language="javascript"
    :code="config.html"
    :height="600"
    :auto-format="true"
    editor-class="config-editor"
    @change="handChange"
    @blur="handBlur"
  />
  <p class="fake-code --end">}</p>
</template>

<script lang='ts' setup name="VPowerHtmlProp">
const props = defineProps({
  com: {
    type: Object,
    required: true,
    default: () => { },
  },
})

const config = toRef(props.com, 'config')

const descriptionCode = `
// 组件实例
com: any
// 请求返回的数据
data: any
// 基础配置中的颜色列表
color: string[]
// 基础配置中的文本配置
`
const code = ref(config.value.html)
const handChange = val => {
  code.value = val.value
}

const handBlur = val => {
  props.com.config.html = val.value
}
</script>
