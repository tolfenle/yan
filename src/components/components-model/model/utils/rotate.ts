/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-15 15:22:57
 * @LastEditTime : 2023-12-15 17:06:32
 */
import * as mars3d from 'mars3d'
console.clear()
let previousTime
export const useMapRotate = (map: any, spinRate = 1) => {
  function startRotate() {
    stopRotate()
    previousTime = map.clock.currentTime.secondsOfDay
    map.on(mars3d.EventType.clockTick, map_onClockTick)
  }
  function stopRotate() {
    map.off(mars3d.EventType.clockTick, map_onClockTick)
  }

  // 地球旋转
  function map_onClockTick() {
    const currentTime = map.clock.currentTime.secondsOfDay
    const delta = (currentTime - previousTime) / 1000
    previousTime = currentTime
    map.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, - spinRate * delta)
  }
}


export const usePointRotate = (map: any) => {
  let rotatePoint
  function addRotate(speed = 50) {
    rotatePoint = new mars3d.thing.RotatePoint({
      direction: false, // 方向 true逆时针，false顺时针
      time: 50, // 给定飞行一周所需时间(单位 秒)，控制速度
      // autoStopAngle: 360, //到达指定角度后自动停止
    })
    map.addThing(rotatePoint)

    // 开启旋转
    rotatePoint.start()
  }

  function startRotate(param) {
    // 获取当前视角
    const point = map.getCenter()
    rotatePoint.start(point) // 可以传指定的中心点坐标
  }

  function stopRotate() {
    rotatePoint.stop()
  }

  return {
    addRotate,
    startRotate,
    stopRotate,
  }
}
