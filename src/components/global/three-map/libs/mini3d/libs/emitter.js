/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-20 09:40:47
 * @LastEditTime : 2023-12-20 10:36:53
 */
import { ikMitt } from 'iking-utils'

export default {
  $on: (...args) => ikMitt.on(...args),
  $once: (...args) => ikMitt.once(...args),
  $off: (...args) => ikMitt.off(...args),
  $emit: (...args) => ikMitt.emit(...args),
}
