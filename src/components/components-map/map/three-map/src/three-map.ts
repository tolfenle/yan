/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-20 10:27:16
 * @LastEditTime : 2024-01-30 12:11:40
 */
import { DatavEChartsComponent, DatavChartSeries } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'
import { EChartEasing } from '@/components/_models/echarts-animation'
import { cloneDeep } from 'lodash-es'
import { loadSubComs } from '@/components/_utils/component-util'

export class ThreeMapSeries extends DatavChartSeries {
  public config
  constructor(name: string) {
    super('bar', name)
  }
}

/**
 * ThreeMap
 */
export class ThreeMap extends DatavEChartsComponent {
  config = {
    generate: {
      configType: 'basic',
      center: [108.797426, 34.10671],
      position: {
        x: 2.684569589161866,
        y: -29.2106376044581,
        z: 30.995484874222058,
      },
      lookat: {
        x: -100,
        y: -100,
        z: -100,
      },
      up: {
        x: 0,
        y: 0,
        z: 1,
      },
    },
    render: {
      // 是否执行抗锯齿。默认为false.
      antialias: true,
      // 是否保留缓直到手动清除或被覆盖。 默认false.
      preserveDrawingBuffer: true,
      // 透明
      alpha: true,
      bg: {
        color: useChartColor({ value: '#010101' }),
        alpha: 1.0, // 0.0 - 1.0的浮点数
      },
    },
    global: {
      maxDistance: 50,
      minDistance: 10,
      scale: 1,
      camera: {
        fov: 45,
        aspect: {
          auto: true,
          value: 0.75,
          near: 0.1,
          far: 1500,
        },
      },
    },
    ambientLight: {
      use: true,
      color: useChartColor({ value: '#404040', isDefault: true }),
      intensity: 1,
    },
    chinaMap: {
      show: true,
      // 地图数据
      data: 'public/uploads/mapjson/100000.json',
      // 地图正面
      topFaceMaterial: {
        color: useChartColor({ value: '#18263b', isDefault: true }),
        transparent: true,
        opacity: 0.2,
        offset: [0, 0],
        repeat: [0.5, 0.5],
        material: {
          use: false,
          url: '',
        },
      },
      // 地图侧面
      sideMaterial: {
        // color: '#000000',//地图侧面颜色
        color: useChartColor({ value: '#000000', isDefault: true }),
        transparent: true,
        opacity: 1,
        offset: [0, 0],
        repeat: [0.5, 0.5],
        material: {
          use: false,
          url: '',
        },
      },
      // 高度
      depth: 0.1,
      renderOrder: 2,
      line: {
        data: '',
        material: {
          color: useChartColor({ value: '#6393bd', isDefault: true }),//地图边界线颜色
          depthTest: false,
        },
        z: 0.31,
        renderOrder: 5,
      },
    },
    // 地图
    map: {
      // 地图数据
      data: 'public/uploads/mapjson/610000.json',
      // 地图正面
      topFaceMaterial: {
        color: useChartColor({ value: '#18263b', isDefault: true }),
        transparent: true,
        wireframe: false,
        opacity: 1,
        offset: [0, 0],
        repeat: [0.5, 0.5],
        z: 0.1,
        material: {
          use: true,
          url: 'public/images/blue2.png',
        },
      },
      // 地图侧面
      sideMaterial: {
        // color: '#000000',//地图侧面颜色
        color: useChartColor({ value: '#000000', isDefault: true }),
        transparent: true,
        opacity: 1,
        offset: [0, 0],
        repeat: [0.5, 0.5],
        material: {
          use: true,
          url: 'public/images/test.png',
        },
        shader: {
          start: 0, // 开始点
          end: 1, // 结束点
          height: 0.4, // 光环高度
          maxTime: 2, // 最大时间
          speed: 1,
          color: '#00FEF2',
        },
      },
      // 高度
      depth: 1,
      renderOrder: 2,
      line: {
        material: {
          color: useChartColor({ value: '#6393bd', isDefault: true }),//地图边界线颜色
          depthTest: true,
        },
        z: 2.31,
        renderOrder: 20,
      },
      label: {
        show: true,
        style: {
          ...chartFont,
        },
      },
      wall: {
        show: true,
        height: 0.5,
        renderOrder: 10,
        z: 0.4,
        material: {
          color: useChartColor({ value: '#007199', isDefault: true }),
          side: 2,
          transparent: true,
          depthTest: true,
          opacity: 0.2,
        },
      },
    },
    // 网格
    grid: {
      show: true,
      size: 100,
      divisions: 80,
      colorCenterLine: useChartColor({ value: '#98abbf', isDefault: true }),
      colorGrid: useChartColor({ value: '#98abbf', isDefault: true }),
      pointSize: 0.05,
      pointColor: useChartColor({ value: '#354658', isDefault: true }),
    },
    // 扩散波纹
    spread: [{
      show: true,
      size: [500, 500],
      radius: 0.0,
      width: 1.2,//光环的粗细
      maxTime: 4.0,
      speed: 40.0,
      renderOrder: -5,
      color: useChartColor({ value: '#91FBF6', isDefault: true }),
      material: {
        color: useChartColor({ value: '#011d4d', isDefault: true }),
        transparent: true,
        depthWrite: false,
      },
    }, {
      show: true,
      size: [500, 500],
      radius: 0.0,
      width: 1.2,//光环的粗细
      maxTime: 2.0,
      speed: 30.0,
      renderOrder: -5,
      color: useChartColor({ value: '#7A7A7A', isDefault: true }),
      material: {
        color: useChartColor({ value: '#011d4d', isDefault: true }),
        transparent: true,
        depthWrite: false,
      },
    }],
    // 旋转的圆圈边框动画
    rotate: [{
      show: true,
      width: 6,
      needRotate: true,
      rotateSpeed: 0.003,
      z: 0.33,
      renderOrder: 6,
      material: {
        url: 'public/images/rotationBorder1.png',
        transparent: true,
        opacity: 1,
        side: 2,
        depthWrite: false,
      },
    }, {
      show: true,
      width: 6,
      needRotate: true,
      rotateSpeed: -0.008,
      z: 0.33,
      renderOrder: 6,
      material: {
        url: 'public/images/rotationBorder2.png',
        transparent: true,
        opacity: 1,
        side: 2,
        depthWrite: false,
      },
    }],
    // 粒子动画
    particles: {
      show: true,
      num: 100, // 粒子数量
      range: 30, // 范围
      renderOrder: 99,
      material: {
        map: useChartColor({ value: '#00eeee', isDefault: true }),
        size: 0.5,
        color: useChartColor({ value: '#00eeee', isDefault: true }),
        transparent: true,
        opacity: 1.0,
        depthTest: false,
        depthWrite: false,
        vertexColors: true,
        blending: 2,
        sizeAttenuation: true,
      },
    },
    wall: {
      show: true,
      height: 0.5, //高度
      renderOrder: 10,
      material: {
        color: useChartColor({ value: '#007199', isDefault: true }),
        side: 2,
        transparent: true,
        depthTest: false,
        opacity: 0.2,
      },
    },
    // 背景图
    background: {
      show: true,
      width: 100,
      height: 100,
      image: '',
    },
    // global: useThreeMapConfig(),
    series: [],
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>
  disActions?: string[]
  constructor() {
    super('ThreeMap', { w: 1920, h: 1080 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '类目' }),
      createField('y', { description: '值' }),
      createField('s', { description: '系列' }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
      description: '3D地图接口',
    })

    setApiData(this)

    this.events = {
      click: {
        description: '当点击数据项时',
        fields: Object.assign({}, ...fields),
      },
    }
    this.actions = {}
    this.config.series.push(new ThreeMapSeries(''), new ThreeMapSeries(''), new ThreeMapSeries(''))

    return this
  }

  async loadData() {
    try {
      this.apiData.source.config.data = JSON.stringify({})
    } catch (error) {
      throw error
    }
  }

}

export default ThreeMap
