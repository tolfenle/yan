import { defineStore } from 'pinia'
import { PageVariable } from '@/domains/editor'
import { getTextParams } from '@/utils/util'
import { useBlueprintStore } from '@/store/blueprint'
import { useComStore } from './com'
import { useEditorStore } from './editor'
import { ikMitt } from 'iking-utils'

export interface IEventState {
  componentsView: PageVariable['componentsView']
  publishersView: PageVariable['publishersView']
  subscribersView: PageVariable['subscribersView']
  variables: Record<string, any>
}

export const useEventStore = defineStore('event', {
  state: (): IEventState => ({
    componentsView: {},
    publishersView: {},
    subscribersView: {},
    variables: {},
  }),
  actions: {
    setPublishersView(id: string, keys: string[], enable: boolean) {
      const pv = this.publishersView
      const pvkeys = Object.keys(pv)
      const allKeys = new Set([...keys, ...pvkeys])
      allKeys.forEach(key => {
        if (enable) {
          if (!pvkeys.includes(key)) {
            pv[key] = [id]
          } else if (!pv[key].includes(id)) {
            pv[key].push(id)
          } else if (!keys.includes(key)) {
            pv[key] = pv[key].filter(m => m !== id)
          }
        } else {
          if (pvkeys.includes(key)) {
            pv[key] = pv[key].filter(m => m !== id)
          }
        }

        if (pv[key].length === 0) {
          delete pv[key]
        }
      })
    },
    setSubscribersView(id: string, data: string) {
      const sv = this.subscribersView
      const keys = getTextParams(data).map(m => m.substring(1))
      const svkeys = Object.keys(sv)
      const allKeys = new Set([...keys, ...svkeys])
      for (const key of allKeys) {
        if (keys.length > 0) {
          if (!svkeys.includes(key)) {
            sv[key] = [id]
          } else if (!sv[key].includes(id)) {
            sv[key].push(id)
          } else if (!keys.includes(key)) {
            sv[key] = sv[key].filter(m => m !== id)
          }
        } else {
          if (svkeys.includes(key)) {
            sv[key] = sv[key].filter(m => m !== id)
          }
        }

        if (sv[key].length === 0) {
          delete sv[key]
        }
      }
    },
    async setVariables(fields: Record<string, string>, data: Record<string, any>) {
      const res = Object.create(null)
      for (const key of Object.keys(fields)) {
        const alias = fields[key] || key
        res[alias] = data[key]
      }

      this.variables = {
        ...this.variables,
        ...res,
      }
    },
    // 订阅的变量发生变化时刷新
    // DATAV_EVENT 事件处理中心
    handleSubVariablesChange(com: any, eventName: string, data: Record<string, any>) {
      const comStore = useComStore()
      const coms = comStore.flatComs?.[0]
      try {
        const events = com?.events?.[eventName]?.events
        if (!events || !events.length)
          return
        for (const ev of events) {
          if (!ev.enable) continue
          // =============================================组件配置事件处理=============================================
          if (ev.type === EVENT_TYPE.组件事件) {
            const targetComs = coms.filter(co => ev.target.includes(co.id))
            switch (ev.actions) {
              case EVENT_COM_ACTION.重新请求:
                try {
                  targetComs.forEach(c => {
                    if (ev?.reRequest?.fields?.length) {
                      const inserData = {}
                      ev.reRequest.fields.forEach(fe => {
                        if (fe.map)
                          inserData[fe.map] = data?.[fe.name]
                        else
                          inserData[fe.name] = data?.[fe.name]
                      })

                      c.apiData.source.config.apiBody = JSON.stringify({
                        ...JSON.parse(c.apiData.source?.config?.apiBody || '{}'),
                        ...inserData,
                      })
                      if (ev.reRequest.func) {
                        const func = new Function('param', ev.reRequest.func)
                        func(c)
                      }
                    }
                    // 手动触发请求
                    // setComponentDataSimple(c)
                  })
                } catch (error) {
                  console.error('error: ', error)
                }
                break
              case EVENT_COM_ACTION.更新数据:
                const fun = new Function('data', ev.updateData.func)
                targetComs.forEach(c => {
                  const comData = fun({ com: c, data })
                  c.apiData.source.config.data = JSON.stringify(comData)
                })
                break
              case EVENT_COM_ACTION.显示:
              case EVENT_COM_ACTION.隐藏:
              case EVENT_COM_ACTION.切换显隐:
                const cusFields = ev?.updateHiddle?.fields?.filter(v => v.custom)

                targetComs.forEach(tarCom => {
                  // 未配置条件时
                  if (!cusFields?.length) {
                    if (ev.actions === EVENT_COM_ACTION.显示)
                      tarCom.hided = false
                    if (ev.actions === EVENT_COM_ACTION.显示)
                      tarCom.hided = true
                    else if (ev.actions === EVENT_COM_ACTION.切换显隐)
                      tarCom.hided = !tarCom.hided
                  } else {
                    // 配置条件时
                    const flag = false
                    for (const v of cusFields) {
                      if (checkOperator(data[v.name], v.operator, v.checkValue)) {
                        tarCom.hided = v.map === 'hidden' ? true : false
                        // 当有一个条件满足时退出循环
                      }
                    }
                  }

                  if (tarCom?.isDialog) {
                    ikMitt.emit('dv-dialog', tarCom)
                  }
                })
              default:
                break
            }
            // =============================================系统事件处理=============================================
          } else if (ev.type === EVENT_TYPE.系统事件) {
            try {
              switch (ev.actions) {
                case EVENT_SYS_ACTION.跳转链接:
                  const link = ev.link
                  if (!ev.link) return
                  const insertData = {}
                  const linkSplit = link.split('?')
                  const equlArr = linkSplit[1].split('&')
                  let relLink = `${linkSplit[0]}?`
                  equlArr.forEach((v, index) => {
                    const keys = v.split('=')
                    relLink += `${keys[0]}=${data?.[keys[1]]}${index === equlArr.length - 1 ? '' : '&'}`
                  })
                  window.open(relLink, ev.linkBlank ? '_blank' : '_self')
                  break
                case EVENT_SYS_ACTION.切换子屏:
                  const editorStore = useEditorStore()
                  for (const cus of ev.sysUpScreen?.fields) {
                    if (checkOperator(data[cus.name], cus.operator, cus.checkValue)) {
                      editorStore.setSelectPage(cus.screenId)
                      // 找到第一个满足条件时 退出循环
                      return
                    }
                  }
                  break
                default:
                  break
              }
            } catch (error) {
              console.error(error)
            }
          }
          // =============================================自定义事件处理=============================================
          else if (ev.type === EVENT_TYPE.自定义事件) {
            try {
              const fun = new Function('com, eventName, data, coms', ev.customEvent.func)
              fun(com, eventName, data, coms)
            } catch (error) {
              console.error(error)
            }
          }
        }
      } catch (error) {
        console.error(error)
      }

      // if (!eventItem || !eventItem.enable) {
      //   return
      // }

      // this.setVariables(eventItem.fields, data)

      // const blueprintStore = useBlueprintStore()
      // const sv = this.subscribersView
      // for (const fname of Object.keys(eventItem.fields)) {
      //   const key = eventItem.fields[fname] || fname
      //   sv[key]?.forEach(comId => {
      //     blueprintStore.events[comId]?.requestData()
      //   })
      // }
    },
  },
})
