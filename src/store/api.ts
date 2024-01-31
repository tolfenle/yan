/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:02
 * @LastEditTime : 2024-01-16 10:24:36
 */
import { defineStore } from 'pinia'
import { set } from 'lodash-es'
import {
  ApiKeyName,
  ApiConfig,
  ApiDataConfig,
  ApiType,
  ApiRequestMethod,
} from '@/components/_models/data-source'
import { isUrl, toJson, replaceTextParams } from '@/utils/util'
import requestUtil from '@/components/_utils/request-util'
import { useEventStore } from './event'
import { netPost } from '@/utils/request'
import { useRoute } from 'vue-router'
import { paramType } from 'iking-utils'
export interface IApiState {
  dataMap: {
    [k: string]: {
      [k in ApiKeyName]?: any
    }
  }
}

export const useApiStore = defineStore('api', {
  state: (): IApiState => ({
    dataMap: {},
  }),
  actions: {
    async setData(comId: string, apiKey: ApiKeyName, data: any) {
      set(this.dataMap, `${comId}.${apiKey}`, data)
    },
    // ALWAYS
    async requestData(
      comId: string,
      aConfig: ApiConfig,
      adConfig: ApiDataConfig,
    ) {
      const eventStore = useEventStore()
      const { type, config } = adConfig
      const route = useRoute()

      const { baseUrl } = useEnvUrl()
      let res: unknown
      // 静态数据
      if (type === ApiType.static) {
        res = config.data
        // API请求
      } else if (type === ApiType.api) {

        if (!config.api) {
          return []
        }

        if (!config.apiHost && !isUrl(config.api)) {
          throw Error('url must contains protocol field, like http:')
        }

        let fixHeader = {}
        try {
          const __header = route.query.header
          if (__header) {
            const header = JSON.parse(__header)
            if (!paramType.isObject(header))
              throw Error('header参数必须是对象，通过URL传递时需要通过JSON.stringify序列化')
            else
              fixHeader = {
                ...header,
              }
          }
        } catch (error) {
          fixHeader = {}
        }

        let fixQuery = {}
        try {
          const __query = route.query.query
          if (__query) {
            const query = JSON.parse(__query)
            if (!paramType.isObject(query))
              throw Error('query参数必须是对象，通过URL传递时需要通过JSON.stringify序列化')
            else
              fixQuery = {
                ...query,
              }
          }
        } catch (error) {
          fixQuery = {}
        }

        try {
          const conf = {
            headers: {
              ...toJson(config.apiHeaders),
              ...fixHeader,
            },
            withCredentials: config.cookie,
          }
          const apiUrl = `${config.apiHost ?? ''}${config.api}`
          const url = replaceTextParams(apiUrl, eventStore.variables)

          // 服务器代理请求
          if (config.local) {
            const param = {
              ...toJson(config.apiBody),
              ...fixQuery,
              ik_datav_proxy_api: apiUrl,
              ik_datav_proxy_method: config.apiMethod,
            }
            res = await requestUtil.post(`${baseUrl}/proxy/proxy`, param, conf)
          } else {
            if (config.apiMethod === ApiRequestMethod.GET) {
              res = await requestUtil.get(url, conf)
            } else {
              res = await requestUtil.post(
                url,
                toJson(config.apiBody, {}),
                conf,
              )
            }
          }
        } catch {
          throw Error('connectFailed')
        }

      }
      // SQL语句
      else if (type === ApiType.sql) {
        if (!config.sql && !config.datalist) {
          return []
        }
        try {
          res = await netPost(`/app/database/base/execute/sql`, {
            base: config.database,
            table: config.datatable,
            sql: config.datalist ? `SELECT * FROM ${config.datalist}` : config.sql,
          })
        } catch (error) {
          console.info('error: ', error)
        }
        // 全局属性
      } else if (type === ApiType.global) {
        if (!config.global)
          return
        const func = new Function(config.global)
        res = func()
      }

      return toJson(res, [])
    },
  },
})
