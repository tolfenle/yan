/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:02
 * @LastEditTime : 2023-11-03 19:49:43
 */
export enum ProjectGroupType {
  ungroup = 0,
  group = 1,
}

export interface Project {
  id: number | string
  name: string
  sharePassword?: string
  shareTime?: string
  shareUrl?: string
  shared?: boolean
  thumbnail?: string
  groupId?: number
  createAt?: string
  updateAt?: string
  config?: any
  screenshot?: string
}

export class ProjectGroup {
  id: number
  depId?: string
  name: string
  type: ProjectGroupType
  children: Project[]

  editing?: boolean

  constructor(id = 0, name = '', children: Project[] = []) {
    this.id = id
    this.name = name
    this.children = children
    this.type = ProjectGroupType.ungroup
  }
}

export interface ProjectTemplate {
  id: number
  name: string
  description: string
  size: String[]
  snapshot: string
  thumbnail: string
  config: any
}
