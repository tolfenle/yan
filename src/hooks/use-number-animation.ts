/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-11 16:54:24
 * @LastEditTime : 2024-01-26 10:06:08
 */
export const useNumberAnimation = () => {
  return {
    active: true,
    duration: 3000,
    precision: 0,
    showSeparator: true,
    loop: true,
    loopTime: 6000,
  }
}

let timerMap = new Map()
export const useLoopAnimation = (config, el: any) => {
  let timer = null

  if (!config || !el) return
  const { loop, loopTime } = config
  if (loop) {
    if (timer !== null) {
      timerMap.delete(timer)
      window.clearInterval(timer)
      timer = null
    }
    timer = window.setInterval(() => {
      if (Array.isArray(el)) {
        for (const item of el) {
          item.play()
        }
      } else {
        el.play()
      }
    }, loopTime)
    timerMap.set(timer, true)
  } else {
    if (timer !== null) {
      timerMap.delete(timer)
      window.clearInterval(timer)
      timer = null
    }
  }
}

onUnmounted(() => {
  timerMap.forEach((_, key) => {
    window.clearInterval(key)
  })
  timerMap = new Map()
})
