import { tr } from 'element-plus/es/locale'

export const useMarsConfig = (param = {}, center = { lat: 0, lng: 0, alt: 17036414, heading: 0, pitch: -90 }) => {
  return {
    scene: {
      //默认视角参数
      center: center,
      shadows: false, //是否启用日照阴影
      removeDblClick: true, //是否移除Cesium默认的双击事件

      //以下是Cesium.Viewer所支持的options【控件相关的写在另外的control属性中】
      sceneMode: 3, //3等价于Cesium.SceneMode.SCENE3D,

      //以下是Cesium.Scene对象相关参数
      highDynamicRange: true, // 高动态渲染
      showSun: false, //是否显示太阳
      showMoon: false, //是否显示月亮
      showSkyBox: true, //是否显示天空盒
      showSkyAtmosphere: true, //是否显示地球大气层外光圈
      fog: false, //是否启用雾化效果
      fxaa: true, //是否启用抗锯齿
      // 空间背景色
      backgroundColor: '#000000',

      //以下是Cesium.Globe对象相关参数
      globe: {
        baseMap: true,
        depthTestAgainstTerrain: false, //是否启用深度监测
        baseColor: '#546a53', //地球默认背景色
        showGroundAtmosphere: true, //是否在地球上绘制的地面大气
        enableLighting: false, //是否显示昼夜区域
        terrainExaggeration: 1, // 地形夸张倍数
      },
      //以下是Cesium.ScreenSpaceCameraController对象相关参数
      cameraController: {
        zoomFactor: 3.0, //鼠标滚轮放大的步长参数
        minimumZoomDistance: 1, //地球放大的最小值（以米为单位）
        maximumZoomDistance: 50000000, //地球缩小的最大值（以米为单位）
        enableRotate: true, //2D和3D视图下，是否允许用户旋转相机
        enableTranslate: true, //2D和哥伦布视图下，是否允许用户平移地图
        enableTilt: true, // 3D和哥伦布视图下，是否允许用户倾斜相机
        enableZoom: true, // 是否允许 用户放大和缩小视图
        enableCollisionDetection: true, //是否允许 地形相机的碰撞检测
      },
    },
    control: {
      //以下是Cesium.Viewer所支持的控件相关的options
      baseLayerPicker: false, //basemaps底图切换按钮，图层选择器，选择要显示的地图服务和地形服务
      homeButton: false, //视角复位按钮
      sceneModePicker: false, //二三维切换按钮， 选择投影模式,有三种：3D,2D,哥伦布视图
      navigationHelpButton: false, //帮助按钮，显示默认的地图控制帮助
      infoBox: false, //信息框
      selectionIndicator: false, //选择框
      vrButton: false, //vr模式按钮
      fullscreenButton: false, //全屏按钮
      animation: false, //动画部件按钮（左下角），控制视图动画的播放速度
      timeline: false, //时间线（下侧）,指示当前时间，并允许用户跳到特定的时间
      geocoder: false, //POI查询按钮
      geocoderConfig: { key: ['ae29a37307840c7ae4a785ac905927e0'] }, //POI查询按钮参数配置

      //以下是mars3d.control定义的控件
      contextmenu: { hasDefault: true },
      mouseDownView: false,
      zoom: false,
      locationBar: false,
      // {
      //   show: false,
      //   insertIndex: 1,
      // },
      compass: false,
      // { bottom: 'toolbar', left: '5px' },
      distanceLegend: { left: '100px', bottom: '2px' },
    },
    terrain: {
      url: 'http://data.mars3d.cn/terrain',
      show: false,
    },
    basemaps: [
      {
        name: '黑色底图',
        icon: 'basemaps/bd-c-dark.png',
        type: 'tencent',
        layer: 'custom',
        style: '4',
        show: true,
      },
      {
        pid: 10,
        name: '高德影像',
        type: 'group',
        icon: 'basemaps/gaode_img.png',
        layers: [
          {
            name: '底图',
            type: 'gaode',
            layer: 'img_d',
          },
          {
            name: '注记',
            type: 'gaode',
            layer: 'img_z',
          },
        ],
      },
      {
        pid: 10,
        name: '高德电子',
        type: 'gaode',
        icon: 'basemaps/gaode_vec.png',
        layer: 'vec',
      },
      {
        pid: 10,
        name: '百度影像',
        type: 'group',
        icon: 'basemaps/bd-img.png',
        layers: [
          {
            name: '底图',
            type: 'baidu',
            layer: 'img_d',
          },
          {
            name: '注记',
            type: 'baidu',
            layer: 'img_z',
          },
        ],
      },
      {
        pid: 10,
        name: '百度电子',
        icon: 'basemaps/bd-vec.png',
        type: 'baidu',
        layer: 'vec',
      },
    ],
    mask: {
      show: false,
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 999,
      backgroundImage: useChartColor({ type: 'liner', liner: 'radial-gradient(0deg, rgba(139, 138, 138, 0.219) 50%, rgba(17, 16, 16, 1) 100%)' }),
    },
    effect: {
      bloom: {
        show: true,
        contrast: 0,
        brightness: 0,
        delta: 2,
      },
      brightn: {
        show: false,
        brightness: 1,
      },
    },
    autoRotate: {
      use: false,
      speed: 50,
      direction: false,
    },
    point: {
      loop: false,
      maxHeight: 200,
      minHeight: 80,
      radius: null,
      scale: 1.2,
      duration: 5,
      complete: `return {}`,
    },
    ...param,
  }
}
