/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:02
 * @LastEditTime : 2023-11-10 18:48:18
 */
export interface BorderImage {
  id: string
  name: string
  src: string
  width?: number
  height?: number
  preview?: string
  border?: {
    width: string
    outset: string
    slice: string
    repeat: string
  }
}

export interface IBorder {
  color: any
  borderColor: any
  borderWidth: number
  borderType: string
  borderDashOffset: number
  borderCap: string
  borderJoin: string
  shadowBlur: number
  shadowColor: any
  shadowOffsetX: number
  shadowOffsetY: number
  opacity: number
}
