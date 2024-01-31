/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-08 09:33:53
 * @LastEditTime : 2024-01-08 14:19:42
 */

import { defineStore } from 'pinia'
import dictApi from '@/api/dict'

type TDict = {
  id: string
  name: string
  value: string
}
interface IDictState {
  fontMamilys: TDict[]
  numberFormats: TDict[]
  dateFormats: TDict[]
}

export const useDictStore = defineStore('dict', {
  state: (): IDictState => ({
    fontMamilys: [],
    numberFormats: [],
    dateFormats: [],
  }),
  getters: {},
  actions: {
    async requestDicts() {
      const res = await dictApi.getDictTypes()
      const { setUrl } = useEnvUrl()
      if (res.code === 1000) {
        const dictRes = await dictApi.getDictValues(res.data.map(da => da.key))
        if (dictRes.code === 1000) {
          const { fontFamilys, dateFormats, numberFormats } = dictRes.data
          // FIXME DICT 注入字体文件
          fontFamilys.forEach(font => {
            const style = document.createElement('style')
            const arr = font.value.split('.')
            style.textContent = `
            @font-face{
              font-famils: '${font.name}';
              src: url('${setUrl(font.value)}') format('${arr[arr.length - 1]}');
            };
            `
            document.head.appendChild(style)
          })
          this.fontMamilys = fontFamilys
          this.numberFormats = numberFormats
          this.dateFormats = dateFormats
        }
      }
    },
  },
})
