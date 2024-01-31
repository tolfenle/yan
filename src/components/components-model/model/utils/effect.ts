/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-15 15:35:08
 * @LastEditTime : 2023-12-15 17:11:39
 */
import * as mars3d from 'mars3d'
console.clear()
export const useMarsEffect = () => {
  // 雾
  const useFogEffect = map => {
    let fogEffect
    const addGogEffect = (param: {
      maxHeight: number
      fogByDistance: mars3d.Cesium.Cartesian4
      color: mars3d.Cesium.Color
    } = {}) => {
      fogEffect = new mars3d.effect.FogEffect({
        maxHeight: 20000, // 大于此高度后不显示
        fogByDistance: new mars3d.Cesium.Cartesian4(100, 0.0, 9000, 0.9),
        color: mars3d.Cesium.Color.WHITE,
        ...param,
      })
      map.addEffect(fogEffect)
    }

    // 是否开始雾效果
    function setFogEffect(val: boolean) {
      fogEffect.enabled = val
    }

    // 改变雾的颜色
    function setColor(color: mars3d.Cesium.Color) {
      fogEffect.color = mars3d.Cesium.Color.fromCssColorString(color)
    }

    // 修改近距离和远距离
    function setDistanceX(val: number) {
      fogEffect.fogByDistance.x = val
    }
    function setDistanceZ(val: number) {
      fogEffect.fogByDistance.z = val
    }
    return {
      addGogEffect,
      setFogEffect,
      setColor,
      setDistanceX,
      setDistanceZ,
    }
  }

  // 雨
  const useRainEffect = map => {
    let rainEffect
    // 雨效果
    function addRain(param: {
      speed?: number
      size?: number
      direction?: number
    } = {}) {
      rainEffect = new mars3d.effect.RainEffect({
        speed: 10,
        size: 20,
        direction: 10,
        ...param,
      })
      map.addEffect(rainEffect)
    }

    // 是否开启特效
    function setEffect(val: boolean) {
      rainEffect.enabled = val
    }

    // 粒子速度
    function setSpeed(value: number) {
      rainEffect.speed = value
    }

    // 粒子大小
    function setSize(value: number) {
      rainEffect.size = value
    }

    // 粒子方向
    function setDirection(value: number) {
      rainEffect.direction = value
    }

    return {
      addRain,
      setEffect,
      setSpeed,
      setSize,
      setDirection,
    }
  }

  // 雪
  const useSnowEffect = map => {
    let snowEffect
    let snowCover
    function addSnow(param: {
      speed: number
      maxHeight: number
    } = {}) {
      snowEffect = new mars3d.effect.SnowEffect({
        speed: 20,
        maxHeight: 8000, // 大于此高度后不显示
      })
      map.addEffect(snowEffect)
    }

    function addSnowTitles(param: {
      layer: mars3d.layer.TilesetLayer
      alpha: number
      maxHeight: number
    } = {}) {
      snowCover = new mars3d.effect.SnowCoverEffect({
        layer: tiles3dLayer, // 如果传值3dtiles图层，只对该模型生效
        alpha: 0.6,
        maxHeight: 8000, // 大于此高度后不显示
      })
      map.addEffect(snowCover)
    }

    // 是否开启下雪效果
    function setSnow(val) {
      snowEffect.enabled = val
    }

    // 速度
    function setSpeed(value) {
      snowEffect.speed = value
    }
    //
    function setScale(value) {
      snowEffect.scale = value
    }


    // 是否开启积雪效果
    function setCover(val) {
      snowCover.enabled = val
    }

    // 积雪厚度
    function setAlpha(value) {
      snowCover.alpha = value
    }
  }

  // 云层
  const useCloudEffect = (map: mars3d.Map, param = {}) => {
    const graphic = new mars3d.graphic.RectangleEntity({
      coordinates: mars3d.Cesium.Rectangle.fromDegrees(-180.0, -90.0, 180.0, 90.0),
      style: {
        height: 6000,
        materialType: mars3d.MaterialType.RectSlide,
        materialOptions: {
          image: 'img/tietu/cloud.png',
          color: mars3d.Cesium.Color.WHITE.withAlpha(0.6),
          speed: 0.5,
          pure: true,
        },
        distanceDisplayCondition: new mars3d.Cesium.DistanceDisplayCondition(3000000, 100000000),
      },
      ...param,
    })
    map.graphicLayer.addGraphic(graphic)

    const addCloud = () => {
      map.graphicLayer.addGraphic(graphic)
    }

    const removeCloud = () => {
      map.graphicLayer.removeGraphic(graphic)
    }

    const setStyle = param => {
      graphic.setStyle(param)
    }


    return {
      addCloud,
      removeCloud,
      setStyle,
    }
  }

  // color
  const useColorCorrection = map => {
    // 构造效果
    const colorCorrection = new mars3d.effect.ColorCorrectionEffect()
    function addColorCorr() {
      map.addEffect(colorCorrection)
    }
    // 是否开启特效
    function setDepthOfField(val: boolean) {
      colorCorrection.enabled = val
    }
    // 修改对应参数
    function setBrightness(val: number) {
      colorCorrection.brightness = val
    }
    function setContrast(val: number) {
      colorCorrection.contrast = val
    }
    function setHue(val: number) {
      colorCorrection.hue = val
    }
    function setSaturation(val: number) {
      colorCorrection.saturation = val
    }

    return {
      addColorCorr,
      setBrightness,
      setContrast,
      setHue,
      setSaturation,
    }
  }

  // bloom 泛光特效
  const useBloomEffect = map => {
    let bloomEffect
    function addBloom() {
      // 构造效果
      bloomEffect = new mars3d.effect.BloomEffect()
      map.addEffect(bloomEffect)
    }
    function setBloomEffect(val: boolean) {
      bloomEffect.enabled = val
    }

    return {
      addBloom,
      setBloomEffect,
      bloomEffect,
    }
  }

  return {
    useFogEffect,
    useRainEffect,
    useSnowEffect,
    useCloudEffect,
    useColorCorrection,
    useBloomEffect,
  }
}
