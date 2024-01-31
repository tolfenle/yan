import { cloneDeep } from 'lodash-es'

export const useMap3dConfig = (param = {}) => {

  return {
    show: true,
    map: '100000',
    boxWidth: 100,
    boxHeight: 10,
    boxDepth: 'auto',
    regionHeight: 6,
    environment: useChartColor({ value: '#008781' }),
    shading: 'lambert', // color  lambert realistic

    //shading === realistic
    realisticMaterial: {
      detailTexture: useChartColor({ type: COLOR_TYPE.图片, image: { value: '', repeat: 'repeat' } }),
      textureTiling: 1,
      textureOffset: 0,
      roughness: 0.5,
      metalness: 0,
      roughnessAdjust: 0.5,
      metalnessAdjust: 0.5,
      ormalTexture: useChartColor({ type: COLOR_TYPE.图片, image: { value: '', repeat: 'repeat' } }),
    },

    //shading === lambert
    lambertMaterial: {
      detailTexture: useChartColor({ type: COLOR_TYPE.图片, image: { value: '/public/uploads/___11___/50e5d482a7f7469e8720be3fbe2a21ff_背景13.jpg', repeat: 'repeat' } }),
      textureTiling: 1,
      textureOffset: 0,
    },
    //shading === color
    colorMaterial: {
      detailTexture: useChartColor({ type: COLOR_TYPE.图片, image: { value: '', repeat: 'repeat' } }),
      textureTiling: 1,
      textureOffset: 0,
    },

    light: {
      main: {
        color: useChartColor({ value: '#fff' }),
        intensity: 1,
        shadow: false,
        shadowQuality: 'medium', // 'low', 'medium', 'high', 'ultra'
        alpha: 40,
        beta: 40,
      },
      ambient: {
        color: useChartColor({ value: '#fff' }),
        intensity: 0.2,
      },
      ambientCubemap: {
        texture: useChartColor({ type: COLOR_TYPE.图片, image: { value: '', repeat: 'repeat' } }),
        diffuseIntensity: 0.5,
        specularIntensity: 0.5,
      },
    },

    postEddect: {
      enable: true,
      bloom: {
        enable: false,
        bloomIntensity: 0.1,
      },
      depthOfField: {
        enable: false,
        focalDistance: 50,
        focalRange: 20,
        fstop: 2.8,
        blurRadius: 10,
      },
      SSAO: {
        enable: false,
        quality: 'medium', // 'low', 'medium', 'high', 'ultra'
        radius: 2,
        intensity: 1,
      },
      colorCorrection: {
        enable: true,
      },
    },
    temporalSuperSampling: {
      enable: true,
    },

    viewControl: {
      projection: 'perspective', // perspective  orthographic
      autoRotate: false,
      autoRotateDirection: 'cw', // cw  ccw
      autoRotateSpeed: 10,
      rotateSensitivity: 1,
      zoomSensitivity: 1,

      distance: 100,
      minDistance: 10,
      maxDistance: 600,
      center: [0, 0, 0],
      alpha: 55,
      minAlpha: 5,
      maxAlpha: 90,
      beta: 0,
      minBeta: -80,
      maxBeta: 80,
    },

    groundPlane: {
      show: false,
      color: useChartColor({ value: '#aaa' }),
    },
    label: {
      ...useChartBaseLabel(),
      formatter: {
        type: EFormatterType.配置,
        value: '',
        function: 'return ',
      },
    },
    itemStyle: {
      color: useChartColor({ value: '#aaa' }),
      opacity: 0.6,
      borderWidth: 1,
      borderColor: useChartColor({ value: '#3e9892' }),
    },

    emphasis: {
      label: {
        ...useChartBaseLabel(),
      },
      itemStyle: {
        color: useChartColor({ value: '#aaa' }),
        opacity: 1,
        borderWidth: 0,
        borderColor: useChartColor({ value: '#333' }),
      },
    },

    instancing: false,
    zlevel: -10,
    position: {
      auto: true,
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    },
    size: {
      auto: true,
      width: 100,
      height: 100,
    },
    ...param,
  }
}


export const parse3dMapConfig = config => {
  const _config = cloneDeep(config)
  delete _config.environment
  let environment = {}
  if (config.environment.value.endsWith(', 0)') && config.environment.type !== COLOR_TYPE.图片) {
    environment = {}
  } else {
    environment = {
      environment: setChartColor(config.environment)?.image || '',
    }
  }
  return {
    ..._config,
    ...environment,
    map: config.map,
    colorMaterial: {
      ...config.colorMaterial,
      detailTexture: setChartColor(config.colorMaterial.detailTexture)?.image || '',
    },
    label: {
      ...config.label,
      ...config.label.font,
      color: setChartColor(config.label.font.color),
      formatter: parseFormatter(config.label.formatter),
    },
    itemStyle: {
      ...parseItemStyle(config.itemStyle),
      borderColor: setChartColor(config.itemStyle.borderColor),
    },
    emphasis: {
      label: {
        ...config.emphasis.label,
        ...config.emphasis.label.font,
        color: setChartColor(config.emphasis.label.font.color),
        formatter: parseFormatter(config.emphasis.label.formatter),
      },
      itemStyle: {
        ...parseItemStyle(config.emphasis.itemStyle),
        borderColor: setChartColor(config.emphasis.itemStyle.borderColor),
      },
    },
    groundPlane: {
      show: config.groundPlane.show,
      color: setChartColor(config.groundPlane.color),
    },
    lambertMaterial: {
      ...config.lambertMaterial,
      detailTexture: setChartColor(config.lambertMaterial.detailTexture)?.image || '',
    },
    light: {
      ambient: {
        intensity: config.light.ambient.intensity,
        color: setChartColor(config.light.ambient.color),
      },
      ambientCubemap: {
        diffuseIntensity: config.light.ambientCubemap.diffuseIntensity,
        specularIntensity: config.light.ambientCubemap.specularIntensity,
        color: setChartColor(config.light.ambientCubemap.texture),
      },
      main: {
        ...config.light.main,
        color: setChartColor(config.light.main.color),
      },
    },
    realisticMaterial: {
      ...config.realisticMaterial,
      detailTexture: setChartColor(config.realisticMaterial.detailTexture).image || '',
      ormalTexture: setChartColor(config.realisticMaterial.ormalTexture).image || '',
    },
  }
}
