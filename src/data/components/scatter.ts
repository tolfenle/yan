const COM_CDN = import.meta.env.VITE_APP_CDN

export const scatter: ComDataType = {
  type: 'scatter',
  name: '散点图',
  icon: 'v-icon-chart-pie',
  data: [
    {
      name: 'VBasicScatter',
      alias: '基础散点图',
      img: `${COM_CDN}/basic-scatter-332-144.jpg`,
      thum: `${COM_CDN}/basic-scatter-332-144.jpg`,
      used: true,
    },
    {
      name: 'VBasicScatters',
      alias: '多Y轴散点图',
      img: `${COM_CDN}/basic-scatters-332-144.jpg`,
      thum: `${COM_CDN}/basic-scatters-332-144.jpg`,
      used: true,
    },
  ],
}
