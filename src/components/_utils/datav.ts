/* eslint-disable @typescript-eslint/no-this-alias */
/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-13 14:06:38
 * @LastEditTime : 2023-12-06 13:36:03
 */
import { DatavComponent } from '../_models/datav-component'

export function debounce(delay, callback) {
  let lastTime

  return function (...argus) {
    clearTimeout(lastTime)
    const that: any = this
    const args = argus

    lastTime = setTimeout(() => {
      callback.apply(that, args)
    }, delay)
  }
}


export function observerDomResize(dom, callback) {
  const MutationObserver = window.MutationObserver || (window as any).WebKitMutationObserver || (window as any).MozMutationObserver

  const observer = new MutationObserver(callback)

  observer.observe(dom, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })

  return observer
}

export function getPointDistance(pointOne, pointTwo) {
  const minusX = Math.abs(pointOne[0] - pointTwo[0])

  const minusY = Math.abs(pointOne[1] - pointTwo[1])

  return Math.sqrt(minusX * minusX + minusY * minusY)
}

export function uuid(hasHyphen) {
  return (hasHyphen ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx').replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export const findMaxOrder = (coms: DatavComponent[]) => {
  let order = 0
  coms.forEach(com => {
    if (com.sortOrder > order) {
      order = com.sortOrder
    }
    if (com.children) {
      order = findMaxOrder(com.children)
    }
  })
  return order
}

export const findMinOrder = coms => {
  let order = 0
  coms.forEach(com => {
    if (com.sortOrder < order) {
      order = com.sortOrder
    }
    if (com.children) {
      order = findMinOrder(com.children)
    }
  })
  return order
}


