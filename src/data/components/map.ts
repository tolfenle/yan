const COM_CDN = import.meta.env.VITE_APP_CDN

export const map: ComDataType = {
  type: 'map',
  name: '地图',
  icon: 'v-icon-map',
  data: [
    {
      name: 'VChina2d',
      alias: '基础平面中国地图',
      img: `${COM_CDN}/2d-china-332-144.png`,
      thum: `${COM_CDN}-thum/2d-china-368-208.png`,
      used: true,
      full: true,
      children: [
        {
          name: 'VChina2dArea',
          alias: '区域热力层',
          img: `${COM_CDN}/2d-china-area-180-180.png`,
          thum: `${COM_CDN}/2d-china-area-180-180.png`,
          used: true,
        },
        {
          name: 'VChina2dBubbles',
          alias: '呼吸气泡层',
          img: `${COM_CDN}/2d-china-bubbles-180-180.png`,
          thum: `${COM_CDN}/2d-china-bubbles-180-180.png`,
          used: true,
        }, {
          name: 'VChina2dFlyingline',
          alias: '飞线层',
          img: `${COM_CDN}/2d-china-flyingline-180-180.png`,
          thum: `${COM_CDN}/2d-china-flyingline-180-180.png`,
          used: true,
        },
      ],
    }, {
      name: 'VMap2d',
      alias: '基础平面地图',
      img: `${COM_CDN}/2d-map-664-288.jpg`,
      thum: `${COM_CDN}/2d-map-664-288.jpg`,
      used: false,
      full: true,
    }, {
      name: 'VThreeMap',
      alias: '3D地图',
      img: `${COM_CDN}/3d-map-three-664-288.jpg`,
      thum: `${COM_CDN}/3d-map-three-664-288.jpg`,
      used: true,
      vip: true,
      full: true,
      children: [{
        name: 'VThreeBar',
        alias: '柱状图图层',
        img: `${COM_CDN}/2d-china-area-180-180.png`,
        thum: `${COM_CDN}/2d-china-area-180-180.png`,
        used: true,
      }, {
        name: 'VThreePoint',
        alias: '点标记层',
        img: `${COM_CDN}/2d-china-flyingline-180-180.png`,
        thum: `${COM_CDN}/2d-china-flyingline-180-180.png`,
        used: true,
      }, {
        name: 'VThreeLine',
        alias: '飞线层',
        img: `${COM_CDN}/2d-china-flyingline-180-180.png`,
        thum: `${COM_CDN}/2d-china-flyingline-180-180.png`,
        used: true,
      },
      {
        name: 'VThreeBubbles',
        alias: '呼吸气泡层',
        img: `${COM_CDN}/2d-china-bubbles-180-180.png`,
        thum: `${COM_CDN}/2d-china-bubbles-180-180.png`,
        used: true,
      },
      ],
    }, {
      name: 'VMap3d',
      alias: '3D平面地图',
      img: `${COM_CDN}/3d-map-664-288.jpg`,
      thum: `${COM_CDN}/3d-map-664-288.jpg`,
      used: true,
      full: true,
      children: [{
        name: 'VMap3dBar',
        alias: '柱状图图层',
        img: `${COM_CDN}/2d-china-area-180-180.png`,
        thum: `${COM_CDN}/2d-china-area-180-180.png`,
        used: true,
      }, {
        name: 'VMap3dFlyingline',
        alias: '飞线层',
        img: `${COM_CDN}/2d-china-flyingline-180-180.png`,
        thum: `${COM_CDN}/2d-china-flyingline-180-180.png`,
        used: true,
      },
      {
        name: 'VMap3dBubbles',
        alias: '呼吸气泡层',
        img: `${COM_CDN}/2d-china-bubbles-180-180.png`,
        thum: `${COM_CDN}/2d-china-bubbles-180-180.png`,
        used: true,
      },
      ],
    }, {
      name: 'VEarth3d',
      full: true,
      alias: '3D地球',
      img: `${COM_CDN}/3d-earth-664-288.jpg`,
      thum: `${COM_CDN}/3d-earth-664-288.jpg`,
      used: false,
    },
  ],
}
