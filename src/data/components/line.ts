const COM_CDN = import.meta.env.VITE_APP_CDN

export const line: ComDataType = {
  type: 'line',
  name: '折线图',
  icon: 'v-icon-chart-line',
  data: [
    {
      name: 'VBasicLine',
      alias: '基本折线图',
      img: `${COM_CDN}/basic-line-332-144.png`,
      thum: `${COM_CDN}-thum/basic-line-368-208.png`,
      used: true,
    }, {
      name: 'VAreaLine',
      alias: '面积折线图',
      img: `${COM_CDN}/area-line-332-144.png`,
      thum: `${COM_CDN}-thum/area-line-368-208.png`,
      used: true,
    },
  ],
}
