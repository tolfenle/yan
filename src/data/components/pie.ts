const COM_CDN = import.meta.env.VITE_APP_CDN

export const pie: ComDataType = {
  type: 'pie',
  name: '饼环图',
  icon: 'v-icon-chart-pie',
  data: [
    {
      name: 'VBasicPie',
      alias: '基本饼图',
      img: `${COM_CDN}/basic-pie-160-116.png`,
      thum: `${COM_CDN}-thum/basic-pie-368-208.png`,
      used: true,
    }, {
      name: 'VCirclePie',
      alias: '基本圆环图',
      img: `${COM_CDN}/circle-pie-160-116.png`,
      thum: `${COM_CDN}-thum/circle-pie-368-208.png`,
      used: true,
    }, {
      name: 'VRosePie',
      alias: '基本玫瑰图',
      img: `${COM_CDN}/rose-pie-160-116.png`,
      thum: `${COM_CDN}-thum/rose-pie-368-208.png`,
      used: true,
    }, {
      name: 'VCircleRosePie',
      alias: '环状玫瑰图',
      img: `${COM_CDN}/circle-rose-pie-160-116.png`,
      thum: `${COM_CDN}-thum/circle-rose-pie-368-208.png`,
      used: true,
    }, {
      name: 'VHalfPie',
      alias: '半饼图',
      img: `${COM_CDN}/half-pie-160-116.png`,
      thum: `${COM_CDN}-thum/half-pie-368-208.png`,
      used: true,
    }, {
      name: 'VHalfCirclePie',
      alias: '半环形图',
      img: `${COM_CDN}/half-circle-pie-160-116.png`,
      thum: `${COM_CDN}-thum/half-circle-pie-368-208.png`,
      used: true,
    }, {
      name: 'VPersentPie',
      alias: '占比环图',
      img: `${COM_CDN}/circle-rose-pie-160-116.png`,
      thum: `${COM_CDN}-thum/circle-rose-pie-368-208.png`,
      used: false,
    }, {
      name: 'VPieOneValue',
      alias: '指标占比饼图',
      img: `${COM_CDN}/pie-one-value-160-116.png`,
      thum: `${COM_CDN}-thum/pie-one-value-368-208.png`,
      used: false,
    },
  ],
}
