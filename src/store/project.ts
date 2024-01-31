import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash-es'
import { ProjectGroupType, ProjectGroup } from '@/domains/project'
import * as api from '@/api/project'
import { getSysTemplate } from '@/api/templates'
import { ikStore, ikTree } from 'iking-utils'
import { useMessage } from 'naive-ui'

const message = useMessage()

export interface IProjectState {
  allGroups: ProjectGroup[]
}

export const useProjectStore = defineStore('project', {
  state: (): IProjectState => ({
    allGroups: [],
    lists: [],
  }),
  getters: {
    group(state) {
      const list = state.allGroups
      return new ProjectGroup(-1, '全部应用', list)
    },
    ungroup(state) {
      const g = state.allGroups.find(m => m.type === ProjectGroupType.ungroup)
      return g ? g : new ProjectGroup(0, '未分组', [])
    },
    groups(state) {
      return state.allGroups
    },
  },
  actions: {
    async request() {
      try {
        // 展示全部组件示例
        // const { data } = await getSysTemplate(1)
        const res = await api.getProjects()
        if (res.code === 1000) {
          const list: ProjectGroup[] = res.data || []
          this.allGroups = ikTree.listToTree(list, { id: 'depId' })
          this.lists = cloneDeep(list)
          ikStore.session.setItem('project_id', this.allGroups[0]?.depId)
        } else {
          message.warning(res.msg)
        }
      } catch (error) {
        throw error
      }
    },
    async delete(pid: number | string, gid: number | string) {
      try {
        const res = await api.deleteProject(pid)
        if (res.code === 1000) {
          this.request()
          api.deleteProjectComs(pid)
        } else {
          message.warning(res.msg)
        }
      } catch (error) {
        throw error
      }
    },
    async updateName(id: number | string, newName: string) {
      try {
        const res = await api.updateProjectName(id, newName)
        if (res.code !== 1000) {
          message.warning(res.msg)
        }
      } catch (error) {
        throw error
      }
    },
    async move(pid: number, fromId: number, toId: number) {
      try {
        const res = await api.moveProject(pid, fromId, toId)
        if (res.code === 1000) {
          const formG = this.allGroups.find(m => m.id === fromId)
          const toG = this.allGroups.find(m => m.id === toId)
          if (formG && toG) {
            const idx = formG.children.findIndex(m => m.id === pid)
            const p = formG.children.splice(idx, 1)[0]
            p.groupId = toId
            toG.children.push(p)
          }
        } else {
          message.warning(res.msg)
        }
      } catch (error) {
        throw error
      }
    },
    async copy(pid: number | string, gid: number) {
      try {
        const res = await api.copyProject(pid)
        if (res.code === 1000) {
          this.request()
        } else {
          message.warning(res.msg)
        }
      } catch (error) {
        throw error
      }
    },
    async createGroup(name: string) {
      try {
        const { data } = await api.createProjectGroup({ name })
        if (data.code === 0) {
          const newGroup = new ProjectGroup(data.data, name, [])
          newGroup.type = ProjectGroupType.group
          this.allGroups.unshift(newGroup)
        } else {
          throw Error(data.message)
        }
      } catch (error) {
        throw error
      }
    },
    async deleteGroup(id: number) {
      try {
        const res = await api.deleteProjectGroup(id)
        if (res.data.code === 0) {
          const idx = this.allGroups.findIndex(m => m.id === id)
          const ungroup = this.allGroups.find(m => m.type === ProjectGroupType.ungroup)
          if (idx > -1 && ungroup) {
            const [group] = this.allGroups.splice(idx, 1)
            group.children.forEach(item => {
              item.groupId = ungroup.id
              ungroup.children.push(item)
            })
          }
        } else {
          throw Error(res.data.message)
        }
      } catch (error) {
        throw error
      }
    },
    async updateGroupName(id: number, newName: string) {
      try {
        const res = await api.updateProjectGroupName(id, newName)
        if (res.code !== 1000) {
          message.warning(res.msg)
        } else {
          this.request()
        }
      } catch (error) {
        throw error
      }
    },
  },
})
