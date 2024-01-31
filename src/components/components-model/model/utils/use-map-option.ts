/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-19 12:24:10
 * @LastEditTime : 2024-01-24 14:26:28
 */
import * as mars3d from 'mars3d'
console.clear()

export const setMapOptions = (map, config) => {
  const { globe, cameraController } = config
  map.setSceneOptions(config)

  if (!globe.baseMap) {
    map.basemap = undefined
  }
  // map.showBaseMap(globe.baseMap)
}

let tiles3dLayer
export const changeTitles3D = (map, config) => {
  if (tiles3dLayer) {
    map.removeLayer(tiles3dLayer, true)
    tiles3dLayer = null
  }
  if (!config.url) {
    return
  }

  tiles3dLayer = new mars3d.layer.TilesetLayer({
    type: '3dtiles',
    name: '',
    maximumScreenSpaceError: 1,
    ...config,
    // flyTo: true,
  })
  map.addLayer(tiles3dLayer)
  return tiles3dLayer
}
