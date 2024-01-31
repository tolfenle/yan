/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-14 10:31:27
 * @LastEditTime : 2023-12-14 11:25:34
 */
import * as mars3d from 'mars3d'

// 取区域内的随机点
function randomPoint(lon, lat, blur = 1000) {
  const jd = random(lon[0] * blur, lon[1] * blur) / blur
  const wd = random(lat[0] * blur, lat[1] * blur) / blur
  return new mars3d.LngLatPoint(jd, wd, 100)
}

// 取随机数字
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


export const useMarsLineFlow = (map, num = 100, lon, lat, blur = 1000,
  style = {
    width: 1,
    materialType: mars3d.MaterialType.LineFlowColor,
    materialOptions: {
      color: 'rgb(141,172,172)',
      speed: random(5, 10),
      startTime: random(1000, 3000),
      percent: 0.1,
      alpha: 0.01,
    },
  }) => {
  // 创建矢量数据图层
  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  const arrData = []
  for (let j = 0; j < num; ++j) {
    const startPt = randomPoint(lon, lat, 1000)

    const endPt = startPt.clone()
    endPt.alt = random(0, 1000)

    arrData.push({
      positions: [startPt, endPt],
      style,
    })
  }

  // 多个线对象的合并渲染。
  const graphic = new mars3d.graphic.PolylineCombine({
    instances: arrData,
  })
  graphicLayer.addGraphic(graphic)

  return graphicLayer
}
