const COM_CDN = import.meta.env.VITE_APP_CDN
export const customChart: ComDataType = {
  type: 'custom',
  name: '自定义',
  icon: 'v-icon-chart-line',
  data: [
    {
      name: 'VPowerChart',
      alias: '通用Echarts图表',
      img: `${COM_CDN}/power-chart.png`,
      thum: `${COM_CDN}/power-chart.png`,
      used: true,
    },
  ],
}
