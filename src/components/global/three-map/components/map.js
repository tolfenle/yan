/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-20 09:40:08
 * @LastEditTime : 2024-01-30 12:25:43
 */
import * as THREE from 'three'
import { Component } from '../libs/mini3d'
import { geoProjection, transfromGeoJSON } from '../utils'
// import config from '../config'
export class BaseMap extends Component {
  constructor(base, config = {}) {
    super(base)
    this.mapGroup = new THREE.Group()
    this.mapGroup.name = config.name
    this.coordinates = []
    this.config = Object.assign(
      {
        name: '',
        data: '',
        renderOrder: 1,
        topFaceMaterial: new THREE.MeshBasicMaterial({
          color: 0x18263b,//地图正面背景颜色
          transparent: true,
          opacity: 1,
        }),
        sideMaterial: new THREE.MeshBasicMaterial({
          color: 0x07152b,//地图侧面颜色
          transparent: true,
          opacity: 1,
        }),
        depth: 0.1,
      },
      config,
    )
    let mapData = transfromGeoJSON(this.config.data)
    this.create(mapData)
  }
  create(mapData) {
    mapData.features.forEach(feature => {
      const group = new THREE.Object3D()
      // let { name, center, centroid } = feature.properties
      let { name, center = [], centroid = [] } = feature.properties
      this.coordinates.push({ name, center, centroid })
      // if (name === config.provinceName) {
      //   return false
      // }
      feature.geometry.coordinates.forEach(multiPolygon => {
        multiPolygon.forEach(polygon => {
          // 绘制shape
          const shape = new THREE.Shape()
          for (let i = 0; i < polygon.length; i++) {
            if (!polygon[i][0] || !polygon[i][1]) {
              return false
            }
            const [x, y] = geoProjection(polygon[i])
            if (i === 0) {
              shape.moveTo(x, -y)
            }
            shape.lineTo(x, -y)
          }
          // 拉伸设置
          const extrudeSettings = {
            depth: this.config.depth,
            bevelEnabled: true,
            bevelSegments: 1,
            bevelThickness: 0.1,
          }
          const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
          geometry.translate(0, 0, this.config.depth)
          const mesh = new THREE.Mesh(geometry, [this.config.topFaceMaterial.clone(), this.config.sideMaterial])
          mesh.renderOrder = this.config.renderOrder
          group.add(mesh)
        })
      })
      this.mapGroup.add(group)
    })
  }
  getCoordinates() {
    return this.coordinates
  }
  join() {
    this.base.scene.add(this.mapGroup)
  }
}
