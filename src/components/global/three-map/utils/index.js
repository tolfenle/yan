/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-20 09:40:09
 * @LastEditTime : 2024-01-30 12:16:37
 */
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
import { geoMercator } from 'd3-geo'

export const geoProjection = args => {
  let center = JSON.parse(localStorage.getItem('center'))
  return geoMercator().center(center).scale(600).translate([0, 0])(args)
}
export const center = () => {
  let center = JSON.parse(localStorage.getItem('center'))
  return geoProjection(center)
}
export const transfromGeoJSON = data => {
  let worldData = JSON.parse(data)
  let features = worldData.features
  const len = features?.length || 0
  for (let i = 0; i < len; i++) {
    const element = features[i]
    if (element.geometry.type === 'Polygon') {
      element.geometry.coordinates = [element.geometry.coordinates]
    }
  }
  return worldData
}

// 导出gltf
export function exportGLTF(input) {
  var gltfExporter = new GLTFExporter()
  var options = {
    trs: false,
    onlyVisible: true,
    truncateDrawRange: true,
    binary: false, //是否导出.gltf的二进制格式.glb  控制导出.gltf还是.glb
    forceIndices: false,
    forcePowerOfTwoTextures: false,
  }
  gltfExporter.parse(
    input,
    function (result) {
      if (result instanceof ArrayBuffer) {
        save(new Blob([result], { type: 'application/octet-stream' }), 'scene.glb')
      } else {
        var output = JSON.stringify(result, null, 2)
        save(new Blob([output], { type: 'text/plain' }), 'scene.gltf')
      }
    },
    options,
  )
}

// 下载模型
export function save(blob, filename) {
  var link = document.createElement('a')
  link.style.display = 'none'
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}
// 下载贴图
export const exportImage = (renderer, name) => {
  // 创建一个a标签
  var a = document.createElement('a')
  // 获取canvas对象
  var canvas = renderer.domElement
  // 链接
  a.href = canvas.toDataURL('image/png')
  // 新窗口打开
  a.target = '_blank'
  // 下载文件名
  a.download = `${name  }.png`
  a.click()
}
