/**
 * 自适应resize-hook
 */
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, toRefs } from 'vue'
import { debounce } from 'lodash-es'
import ResizeObserver from 'resize-observer-polyfill'

export const isServer = typeof window === 'undefined'

/* istanbul ignore next */
const resizeHandler = function (entries) {
  for (const entry of entries) {
    const listeners = entry.target.__resizeListeners__ || []
    if (listeners.length) {
      listeners.forEach(fn => {
        fn()
      })
    }
  }
}

/* istanbul ignore next */
export const addResizeListener = function (element, fn) {
  if (isServer || !element) return
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    element.__ro__ = new ResizeObserver(resizeHandler)
    element.__ro__.observe(element)
  }
  element.__resizeListeners__.push(fn)
}

/* istanbul ignore next */
export const removeResizeListener = function (element, fn) {
  if (!element || !element.__resizeListeners__) return
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect()
  }
}
/**
 * 自适应resize
 * @param afterResizeFun resize容器之后执行函数
*/
export default function useAutoResize(afterResizeFun) {
  const domRef = ref(null) // dorm容器，默认设置为domRef
  const status = reactive({
    width: 0,
    height: 0,
  })
  let __resizeHandler = null

  function resize(resize = true) {
    nextTick().then(() => {
      const dom = domRef.value
      status.width = dom ? dom.clientWidth : 0
      status.height = dom ? dom.clientHeight : 0

      if (!dom) {
        console.warn('bin-datav: Failed to get dom node, component rendering may be abnormal!')
      } else if (!status.width || !status.height) {
        console.warn('bin-datav: Component width or height is 0px, rendering abnormality may occur!')
      }

      if (typeof afterResizeFun === 'function' && resize) afterResizeFun()
    })
  }

  onMounted(() => {
    resize()
    __resizeHandler = debounce(resize, 100)
    addResizeListener(domRef.value, __resizeHandler)
  })
  onBeforeUnmount(() => {
    removeResizeListener(domRef.value, __resizeHandler)
  })

  return {
    domRef,
    ...toRefs(status),
    resize,
  }
}
