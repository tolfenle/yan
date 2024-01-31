const COM_CDN = import.meta.env.VITE_APP_CDN

export const water: ComDataType = {
  type: 'water',
  name: '水球图',
  icon: 'v-icon-other',
  data: [
    {
      name: 'VWaterBall',
      alias: '基础水球图',
      img: `${COM_CDN}/water-ball-160-116.png`,
      thum: `${COM_CDN}/water-ball-160-116.png`,
      used: true,
    },
    {
      name: 'VWaterSvg',
      alias: 'SVG水球图',
      img: `${COM_CDN}/water-svg-160-116.png`,
      thum: `${COM_CDN}/water-svg-160-116.png`,
      used: true,
    },
  ],
}
