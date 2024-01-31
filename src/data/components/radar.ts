const COM_CDN = import.meta.env.VITE_APP_CDN

export const radar: ComDataType = {
  type: 'radar',
  name: '雷达图',
  icon: 'v-icon-chart-pie',
  data: [
    {
      name: 'VBasicRadar',
      alias: '基础雷达图',
      img: `${COM_CDN}/radar-160-116.png`,
      thum: `${COM_CDN}/radar-160-116.png`,
      used: true,
    },
  ],
}
