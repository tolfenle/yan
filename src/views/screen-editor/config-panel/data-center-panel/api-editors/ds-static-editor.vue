<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:03
 * @LastEditTime : 2023-11-08 15:38:15
-->
<template>
  <div class="ds-wrapper ds-static">
    <n-p>上传Excel文件</n-p>
    <n-upload
      multiple
      directory-dnd
      action=""
      :max="1"
      :show-file-list="true"
      accept=".xlsx,.xls"
      @before-upload="handBeforeUpload"
    >
      <n-upload-dragger>
        <div style="margin-bottom: 12px;">
          <n-icon size="48" :depth="3">
            <IconCloud />
          </n-icon>
        </div>
        <n-text style="font-size: 16px;">
          点击或者拖动文件到该区域来上传Excel文件
        </n-text>
        <n-p depth="3" style="margin: 8px 0 0;">
          请不要上传敏感数据
        </n-p>
      </n-upload-dragger>
    </n-upload>
  </div>
  <n-p>编写静态数据</n-p>
  <div class="ds-wrapper ds-static">
    <g-monaco-editor
      language="json"
      :auto-format="true"
      :code="apiDataConfig.config.data"
      @blur="updateData"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, inject } from 'vue'
import { NUpload, NUploadDragger, NText, NP, useMessage } from 'naive-ui'
import { sourcePanelInjectionKey } from '../../config'
import { IconCloud } from '@/icons'
import * as XLSX from 'xlsx'

export default defineComponent({
  name: 'DsStaticEditor',
  components: {
    NUpload,
    NUploadDragger,
    NText,
    NP,
    IconCloud,
  },
  setup() {
    const { apiDataConfig } = inject(sourcePanelInjectionKey)
    const message = useMessage()
    const updateData = (data: any) => {
      apiDataConfig.value.config.data = data.value
    }

    const handBeforeUpload = file => {
      // 创建一个 FileReader 对象来读取文件
      const reader = new FileReader()
      reader.onload = function (e: any) {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]

        // 处理工作表数据
        try {
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
          const header: any = jsonData[0]
          const dvData = jsonData.splice(1).map(da => {
            let obj = {}
            header.forEach((h, index) => {
              obj[h] = da[index]
            })
            return obj
          })
          apiDataConfig.value.config.data = JSON.stringify(dvData)
        } catch (error) {
          console.info('error: ', error)
          message.error(error)
        }
      }

      reader.readAsArrayBuffer(file.file.file)
    }

    return {
      apiDataConfig,
      updateData,
      handBeforeUpload,
    }
  },
})
</script>
