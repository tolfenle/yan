import { useMarsEffect } from './effect'
import { usePointRotate, useMapRotate } from './rotate'

const {
  useFogEffect,
  useRainEffect,
  useSnowEffect,
  useCloudEffect,
  useColorCorrection,
  useBloomEffect,
} = useMarsEffect()

export const setModel = (map, config) => {
  const { addBloom } = useBloomEffect(map)
  const { addRotate, startRotate, stopRotate } = usePointRotate(map)


  const setEffectBlom = () => {
    const { contrast, brightness, delta } = config.effect.bloom
    map.effects.bloom.contrast = contrast
    map.effects.bloom.brightness = brightness
    map.effects.bloom.delta = delta
  }
  // 泛光
  if (config.effect.bloom.show) {
    if (!map?.effects?.bloom) {
      addBloom()
    }
    else {
      map.effects.bloom.enabled = true
    }
    setEffectBlom()
  } else {
    if (map?.effects?.bloom) {
      map.effects.bloom.enabled = false
      setEffectBlom()
    }
  }


  // 旋转
  if (config.autoRotate.use) {
    if (!map.thing.rotatePoint)
      addRotate()
    else
      startRotate()
  } else {
    if (map.thing.rotatePoint)
      stopRotate()
  }
}
