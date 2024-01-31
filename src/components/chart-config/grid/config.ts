/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-19 10:09:50
 * @LastEditTime : 2023-10-30 14:48:31
 */
export const chartGridConfig = {
  show: false,
  isPercentage: false,
  left: 20,
  right: 20,
  top: 20,
  bottom: 20,
  containLabel: true,
  leftAuto: true,
}

export const setGridConfig = (grid: typeof chartGridConfig) => {
  return {
    ...grid,
    left: grid.leftAuto ? 'left' : grid?.isPercentage ? `${grid.left}%` : grid.left,
    right: grid?.isPercentage ? `${grid.right}%` : grid.right,
    top: grid?.isPercentage ? `${grid.top}%` : grid.top,
    bottom: grid?.isPercentage ? `${grid.bottom}%` : grid.bottom,
    containLabel: grid.containLabel,
  }
}
