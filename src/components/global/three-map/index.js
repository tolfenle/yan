/* eslint-disable @typescript-eslint/no-this-alias */
import * as THREE from 'three'
// import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { Base, OrbitControls, AssetsManager, Plane, getBoundingBox } from './libs/mini3d'  //State
import { Grid } from './components/grid'
import { BaseMap } from './components/map'
import { Line } from './components/line'
import { Lights } from './components/lights'
import { Wall } from './components/wall'
import { Particles } from './components/particles'
import { UpShader } from './shader/upShader/index'
import { SpreadShader } from './shader/spreadShader/index'
import { GradientShader } from './shader/gradientShader/index'
import { _, ikMitt } from 'iking-utils'
import { Label2d } from './libs/mini3d/extra/label2d'
import config from './config'
import { geoProjection, transfromGeoJSON, center, exportGLTF, exportImage } from './utils'
import { setMapEdgeLight } from './libs/mini3d/utils/set-map-lines'
import { padNumberToSixDigits } from '@/components/_utils/echarts-util'
//import { random } from './utils/utils'

export class Map3d extends Base {

  constructor(el, defConfig = {}) {
    super(el, defConfig)
    const { setUrl } = useEnvUrl()
    this.defConfig = defConfig
    const { ambientLight, map, chinaMap, rotate } = defConfig
    const { position, lookat, center, up } = defConfig.generate
    localStorage.setItem('center', JSON.stringify(center))
    this.camera.up.set(up.x, up.y, up.z)
    this.camera.position.set(position.x, position.y, position.z)
    this.camera.lookAt(lookat.x, lookat.y, lookat.z)
    //设置OrbitControls的targetr之后，camera的lookAt就不起作用了
    if (ambientLight.use) {
      let _ambientLight = new THREE.AmbientLight({
        color: setChartColor(ambientLight.color),
        intensity: ambientLight.intensity,
      })
      this.scene.add(_ambientLight)
    }
    console.log('map.data: ', map.data)

    const regex = /^\d+$/
    this.mainMap = {}
    const lodMap = [{
      name: 'china',
      type: 'file',
      path: setUrl(chinaMap.data),
    }, {
      name: 'city',
      type: 'file',
      path: setUrl(regex.test(map.data) ? `/public/mapjson/${padNumberToSixDigits(map.data)}.json` : map.data),
    }]
    const lodrotationBorder = rotate.map((ro, index) => {
      return {
        name: `rotationBorder${index + 1}`,
        type: 'texture',
        path: setUrl(ro.material.url),
      }
    })
    this.assetsManager = new AssetsManager(this, [
      ...lodMap,
      ...lodrotationBorder,
    ], {
      onProgress: (current, total) => {
      },
      onComplete: () => {
        console.info('加载完成', this.assetsManager)
        this.start()
      },
    })
  }
  start() {
    super.start()
    this.helperTools()
    this.create()
    // this.animator.add(() => {
    // })
  }
  /**
   * 开启辅助工具
   */
  helperTools() {
    // webgl帧率监测
    // let state = new State(this)
    // state.join()
    // 轨道控制器
    let orbit = new OrbitControls(this)
    //相机轨道设置-垂直旋转的角度范围设置
    this.orbitControls.minPolarAngle = 0
    this.orbitControls.maxPolarAngle = Math.PI / 2
    //相机轨道设置-放大缩小的范围限制
    this.orbitControls.minDistance = this.defConfig.global.minDistance
    this.orbitControls.maxDistance = this.defConfig.global.maxDistance

    this.orbitControls.target = new THREE.Vector3(...center(), 0)
    orbit.join()
    // 坐标轴辅助
    // let axes = new THREE.AxesHelper(100)
    // axes.position.set(...center(), 0)
    // this.scene.add(axes)
  }
  async create() {
    // 添加雾,随着距离线性增大,只能看到一个小是视野范围内的场景，地图缩小很多东西就会看不清
    //this.scene.fog = new THREE.Fog(0x191919, 30, 70)
    this.getCenterPoint()  //计算城市中心点，并将center存储到localStorage中
    this.createSpreadWave() //创建向四周扩散的蓝色波纹
    this.createChinaMap() //创建中国省份地图-加载渲染时间比较长，可以注释掉
    this.createProvinceMap() //创建省地图
    await this.createCityMap() //创建市地图
    ikMitt.emit('city-map-loaded')
    this.createGrid() //创建地图网格效果
    this.createLight() //设置点光源
    this.createBackgroud() // 设置背景
    this.createCityLabel() //城市地图上的文本标签
    this.createCityWall() //城市边界线上的半透明的围墙
    this.createBar() //城市地图上各个区县的柱状图
    this.createParticles() //三维空间的向上飞的粒子动画
    this.createRotateBorder() //城市地图上旋转的圆圈边框动画
    this.createEvent()
  }
  // 获取中心点位置
  getCenterPoint() {
    this.mainMap.center = this.defConfig?.generate?.center || [0, 0]
    localStorage.setItem('center', JSON.stringify(this.mainMap.center))
  }
  // 添加地图上的网格
  createGrid() {
    const { divisions, colorCenterLine, colorGrid, pointSize, pointColor } = this.defConfig.grid
    const { x = 5, y = 5 } = this.mainMap?.box?.size
    const size = Math.max(x, y) * 5
    let grid = new Grid(this, {
      size,
      position: new THREE.Vector3(...center(), 0),
      divisions,
      pointSize,
      colorCenterLine: setChartColor(colorCenterLine),
      colorGrid: setChartColor(colorGrid),
      pointColor: setChartColor(pointColor),
    })
    grid.gridGroup.rotateX(Math.PI / 2)
    grid.join()
  }
  //创建中国行政区地图
  createChinaMap() {
    try {
      //中国地图-三维物体
      const { topFaceMaterial, sideMaterial, depth, renderOrder, line } = this.defConfig.chinaMap
      let china = new BaseMap(this, {
        name: '中国地图',
        data: this.assetsManager.loadedItems.china,
        topFaceMaterial: new THREE.MeshBasicMaterial({
          color: setChartColor(topFaceMaterial.color),//地图正面背景颜色
          transparent: topFaceMaterial.transparent,
          opacity: topFaceMaterial.opacity,
        }),
        sideMaterial: new THREE.MeshBasicMaterial({
          color: setChartColor(sideMaterial.color),//地图正面背景颜色
          transparent: sideMaterial.transparent,
          opacity: sideMaterial.opacity,
        }),
        depth,
        renderOrder,
      })
      china.join()
      //中国地图-二维边界线
      let chinaLine = new Line(this, {
        data: this.assetsManager.loadedItems.china,
        material: new THREE.LineBasicMaterial({
          color: setChartColor(line.material.color),//地图边界线颜色
          depthTest: line.material.depthTest,
        }),
        renderOrder: line.renderOrder,
      })
      chinaLine.join()
      chinaLine.lineGroup.position.z += line.z
    } catch (error) {
      console.info(error)
    }
  }

  //创建省的行政区地图
  createProvinceMap() {
  }
  //创建市地图
  async createCityMap() {
    try {
      const { setUrl } = useEnvUrl()
      const { topFaceMaterial, sideMaterial, depth, renderOrder, line } = this.defConfig.map
      const textureLoader = new THREE.TextureLoader()
      let topMaterial = {}
      if (topFaceMaterial.material.use) {
        const texture = await textureLoader.load(setUrl(topFaceMaterial.material.url))
        // ClampToEdgeWrapping
        // 设置纹理的wrapS和wrapT属性为THREE.RepeatWrapping来实现平铺效果
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        // 设置重复次数
        texture.offset.set(topFaceMaterial.offset[0], topFaceMaterial.offset[1])
        texture.repeat.set(topFaceMaterial.repeat[0], topFaceMaterial.repeat[1])
        topMaterial = {
          map: texture,
        }
      } else {
        topMaterial = {
          color: setChartColor(topFaceMaterial.color),
        }
      }
      let sidMaterial = {}
      if (sideMaterial.material.use) {
        const texture = await textureLoader.load(setUrl(sideMaterial.material.url))
        // 设置纹理的wrapS和wrapT属性为THREE.RepeatWrapping来实现平铺效果
        texture.wrapS = THREE.ClampToEdgeWrapping
        texture.wrapT = THREE.ClampToEdgeWrapping
        // 设置重复次数
        texture.offset.set(sideMaterial.offset[0], sideMaterial.offset[1])
        texture.repeat.set(sideMaterial.repeat[0], sideMaterial.repeat[1])
        sidMaterial = new THREE.MeshPhongMaterial({
          map: texture,
        })
      } else {
        sidMaterial = {
          color: setChartColor(sideMaterial.color),
        }
      }
      //渐变上升动画渲染shader
      const __sideMaterial = new UpShader(this, {
        ...sideMaterial.shader,
        color: new THREE.Color(setChartColor(sideMaterial.shader.color)), // 颜色 map: texture,
        material: sidMaterial,
      })

      let data = this.assetsManager.loadedItems.city
      // 添加市地图
      //城市地图-三维物体
      let city = new BaseMap(this, {
        data: data,
        topFaceMaterial: new THREE.MeshPhongMaterial({
          // color: setChartColor(topFaceMaterial.color),//地图正面背景颜色
          ...topMaterial,
          emissive: 0x072534,
          specular: '#000000',
          transparent: topFaceMaterial.transparent,
          flatShading: true,
          wireframe: topFaceMaterial.wireframe,
          opacity: topFaceMaterial.opacity,
          combine: THREE.MixOperation,
        }),
        sideMaterial: __sideMaterial.getMaterial(),//地图边界线
        renderOrder: renderOrder,
        depth: depth,
      })
      city.mapGroup.position.z += topFaceMaterial.z
      const features = JSON.parse(city.config.data)?.features || []

      this.mainMap.coordinates = city.getCoordinates().map(ci => {
        const _city = features.find(v => v.properties
          .name === ci.name)
        return {
          ...ci,
          adcode: _city?.properties.adcode,
        }
      })
      this.mainMap.box = getBoundingBox(city.mapGroup)
      city.join()

      //城市地图-二维边界线
      let cityLine = new Line(this, {
        data: data,
        material: new THREE.LineBasicMaterial({
          color: setChartColor(line.material.color),
          depthWrite: false,
          depthTest: line.material.depthTest,
        }),
        depth: 1,
        renderOrder: line.renderOrder,
      })
      cityLine.join()
      cityLine.lineGroup.position.z = line.z
    } catch (error) {
      console.info(error)
    }
  }
  createLight() {
    const lights = new Lights(this)
    lights.join()
  }

  // 创建背景
  createBackgroud() {
    const geometry = new THREE.PlaneGeometry(100, 100)
    const texture = new THREE.TextureLoader().load('http://192.168.2.144:8001/public/uploads/0101/d2b0b08b16fe4fbe8a48cbda0dedeb2f__底图.png')
    const bumpTexture = new THREE.TextureLoader().load('http://192.168.2.144:8001/public/uploads/0101/d2b0b08b16fe4fbe8a48cbda0dedeb2f__底图.png')
    const material = new THREE.MeshPhongMaterial({
      map: texture,  // 贴图
      bumpMap: bumpTexture,
      bumpScale: 0.05,
      specularMap: texture,
      // specular: 0xffffff,
      // shininess: 1,
      // color: "#000000",
      side: THREE.FrontSide,
    },
    )
    const earthPlane = new THREE.Mesh(geometry, material)
    this.scene.add(earthPlane)
  }
  //创建动态旋转的圆形轮廓
  createRotateBorder() {
    let { size } = this.mainMap.box
    let width = size.x > size.y ? size.x : size.y

    const keys = Object.keys(this.assetsManager.loadedItems).filter(ke => ke.startsWith('rotationBorder'))
    const planes = {}
    const { rotate } = this.defConfig
    keys.forEach((plKey, index) => {
      const ro = rotate[index]
      planes[index] = new Plane(this, {
        width: width + ro.width, //26,
        needRotate: ro.needRotate,
        rotateSpeed: ro.rotateSpeed,
        material: new THREE.MeshBasicMaterial({
          ...ro.material,
          map: this.assetsManager.loadedItems[plKey],
        }),
        position: new THREE.Vector3(...center(), ro.z),
      })
      planes[index].mesh.renderOrder = 6
      planes[index].join()
    })
  }
  // 创建城市标签
  createCityLabel() {
    if (!this.defConfig.map.label.show) return
    this.label2d = new Label2d(this)
    //遍历城市坐标，生成城市标签
    this.mainMap.coordinates.forEach(item => {
      if (!item.centroid || !item.center) {
        return false
      }
      let [x, y] = geoProjection(item.center || item.centroid)
      this.createLabelItem(item.name, new THREE.Vector3(x, -y, 2.2), 'mapLabel', this.defConfig.map?.label?.style || {})
    })
  }
  createLabelItem(name, position, className = 'mapLabel', style = {}) {
    const label = this.label2d.create(name, className, style)
    label.show(style?.innerHTML ? '' : name, position)
    this.scene.add(label)
  }
  //在city轮廓上绘制半透明的围墙
  createCityWall() {
    const { show, height, renderOrder, z, material } = this.defConfig.map.wall
    if (!show) return

    let fzData = JSON.parse(this.assetsManager.loadedItems.city)
    let coordinates = []
    // const lightCoords = []
    fzData.features.forEach(fz => {
      fz.geometry.coordinates[0].map(coords => {
        coords.map(cood => {
          let [x, y] = geoProjection(cood)
          coordinates.push(x, -y)
          // lightCoords.push(x, -y, this.defConfig.map.depth + 5)
        })
      })
    })

    let wall = new Wall(this, {
      coordinates: coordinates,
      height: height, //高度
      renderOrder: renderOrder,
      material: new THREE.MeshBasicMaterial({
        ...material,
        color: setChartColor(material.color),
      }),
    })
    wall.mesh.position.z += z
    wall.join()

    // const { opacityPointsMesh, mapLineAnimitor } = setMapEdgeLight(lightCoords)
    // this.scene.add(opacityPointsMesh)

    // this.animator.add(mapLineAnimitor)
    // console.log('setMapEdgeLight(coordinates: ', setMapEdgeLight(coordinates))
  }
  // 创建向四周扩散波纹shader
  createSpreadWave() {
    const shaderMaterial = {}
    this.defConfig.spread.forEach((shad, index) => {
      const { size, radius, width, maxTime, speed, renderOrder, color, material } = shad
      shaderMaterial[index] = new SpreadShader(this, {
        radius,
        center: new THREE.Vector3(...center(), 0),
        width,//光环的粗细
        maxTime,
        speed,
        color: new THREE.Color(setChartColor(color)),
        material: new THREE.MeshLambertMaterial({
          color: setChartColor(material.color),
          transparent: material.transparent,
          depthWrite: material.depthWrite,
        }),
      })
      const geo = new THREE.PlaneGeometry(size[0], size[1])
      const mesh = new THREE.Mesh(geo, shaderMaterial[index].getMaterial())
      // mesh.position.z += 0.2
      mesh.renderOrder = renderOrder
      this.scene.add(mesh)
    })
  }

  createBarWave(x, y, z) {
    const { setUrl } = useEnvUrl()
    const cityGeometry = new THREE.PlaneGeometry(1, 1) //默认在XOY平面上
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(setUrl('public/images/wave.png'))
    const cityWaveMaterial = new THREE.MeshBasicMaterial({
      color: '#ede619',  // 0x22ffcc
      map: texture,
      transparent: true, //使用背景透明的png贴图，注意开启透明计算
      opacity: 1.0,
      side: THREE.FrontSide, //双面可见
      depthWrite: false, //禁止写入深度缓冲区数据
      blending: THREE.AdditiveBlending,
    })
    let cityWaveMesh = new THREE.Mesh(cityGeometry, cityWaveMaterial)
    cityWaveMesh.position.set(x, y, z)
    cityWaveMesh.position.z += 0.1
    cityWaveMesh.size = 0
    return cityWaveMesh
  }
  //创建地图上的柱状图
  createBar(data) {
    try {
      const barScene = this.scene.children.filter(v => v.name === '柱状图')
      if (barScene.length) {
        barScene.forEach(bar => {
          // bar.clear()
          // this.scene.remove(bar)
        })
      }
    } catch (error) {
      console.info('error: ', error)
    }

    const barGroup = new THREE.Group()
    // 最大高度
    const factor = 0.5
    const height = 4.0 * 1
    let config = this.defConfig?.barConfig?.config
    if (!config) {
      return
    }
    // 渐变材质
    const material = new GradientShader(this, {
      height: height,
      color1: new THREE.Color(setChartColor(config.bottomColor)),
      color2: new THREE.Color(setChartColor(config.topColor)),
      material: new THREE.ShaderMaterial({
        ...config.material,
      }),
    }).getMaterial()
    const pollutionArr = []
    // 给城市的坐标数据中，添加value，value用于后面生成柱状图
    data?.forEach(city => {
      const item = this.mainMap.coordinates?.find(v => city.adcode === v.adcode)
      if (item && city.adcode === item.adcode)
        pollutionArr.push({
          ...item,
          ...city,
        })
      else if (city.lonlat) {
        pollutionArr.push({
          ...city,
          center: city.lonlat,
        })
      }
    })
    // 获取z轴的位置
    let { z } = this.mainMap?.box?.box3?.max
    // value最大值
    let cityArea = _.orderBy(pollutionArr || [], ['value'], ['desc'])
    let max = _.maxBy(pollutionArr || [], function (o) {
      return o?.value || 0
    })?.value || 0
    if (cityArea?.length) this.label2d = new Label2d(this)
    // 循环创建bar
    const citeWave = []
    cityArea.map(item => {
      if (!item.center || !item.centroid) {
        return false
      }
      //创建柱子几何体
      let geoHeight = height * (item.value / max)
      if (!geoHeight) return
      const geo = new THREE.CylinderGeometry(config.topRadius * factor, config.bottomRadius * factor, geoHeight, 20)
      geo.rotateX(Math.PI / 2)
      // 上移
      geo.translate(0, 0, geoHeight / 2)
      const mesh = new THREE.Mesh(geo, material)
      let areaBar = mesh
      let [x, y] = geoProjection(item.center || item.centroid)
      areaBar.position.set(x, -y, z)

      const waveMater = this.createBarWave(x, -y, z)
      citeWave.push(waveMater)
      barGroup.add(waveMater)

      const HEIGHT = z + geoHeight + 0.3 * factor + config.label.z
      barGroup.add(areaBar)
      if (config.label.show) {
        let innerHTML = ''
        if (config.label?.innerHTML) {
          const func = new Function('data', config.label.innerHTML)
          innerHTML = func(item)
        }

        this.createLabelItem(
          `${item.name} ${item.value}`,
          new THREE.Vector3(x, -y, HEIGHT),
          'barLabel',
          config?.label?.style ? {
            ...config?.label?.style,
            innerHTML,
          } : {},
        )
      }
    })
    barGroup.name = '柱状图'
    this.scene.add(barGroup)

    this.animator.add(() => {
      citeWave.forEach(mesh => {
        // console.log(mesh);
        mesh.size += 0.015  // Math.random() / 100 / 2
        let scale = mesh.size / 1
        mesh.scale.set(scale, scale, scale)
        if (mesh.size <= 0.5) {
          mesh.material.opacity = 1
        } else if (mesh.size > 0.5 && mesh.size <= 1) {
          mesh.material.opacity = 1.0 - mesh.size * 0.2 // 0.5以后开始加透明度直到0
        } else if (mesh.size > 1) {
          mesh.size = 0
        }
      })
    })
    // this.scene.add(circleGroup)
  }
  //空气中漂浮上升的粒子
  createParticles() {
    const { num, range, renderOrder, material } = this.defConfig.particles
    const particles = new Particles(this, {
      num,
      range, // 范围
      renderOrder,
      material: new THREE.PointsMaterial({
        map: Particles.createTexture(),
        size: material.size,
        color: setChartColor(material.color),
        transparent: material.transparent,
        opacity: material.opacity,
        depthTest: material.depthTest,
        depthWrite: material.depthWrite,
        vertexColors: material.vertexColors,
        blending: material.blending,
        sizeAttenuation: material.sizeAttenuation,
      }),
    })
    particles.instance.position.set(0, 0, 15)
    particles.join()
  }
  // 导出模型
  exportModel() {
    exportGLTF(this.scene)
  }
  // 导出图片
  exportImage() {
    exportImage(this.renderer, 'map')
  }

  createEvent() {
    const that = this
    const raycaster = new THREE.Raycaster() // 创建Raycaster对象
    const mouse = new THREE.Vector2() // 创建二维平面坐标对象
    function onMouseClick(event) {
      event.preventDefault()

      // 将鼠标点击位置的屏幕坐标转换成threejs的标准化设备坐标
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      // 通过鼠标点的二维坐标射出一条射线
      raycaster.setFromCamera(mouse, that.camera)
      // 计算射线和物体的交点
      const intersects = raycaster.intersectObjects(that.scene.children)

      if (intersects.length > 0) {
        console.log('Clicked object', intersects[0].object)
      }
    }
    this.container.addEventListener('click', onMouseClick, false)
  }
}
