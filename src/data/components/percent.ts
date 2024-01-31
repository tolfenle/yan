const COM_CDN = import.meta.env.VITE_APP_CDN

export const percent: ComDataType = {
  type: 'percent',
  name: '进度图',
  icon: 'v-icon-relation',
  data: [
    {
      name: 'VBasicPercent',
      alias: '圆环进度图',
      img: `${COM_CDN}/circle-percent-160-116.png`,
      thum: `${COM_CDN}/circle-percent-160-116.png`,
      used: true,
    }, {
      name: 'VDamPercent',
      alias: '动画圆环进度图',
      img: `${COM_CDN}/tree.png`,
      thum: `${COM_CDN}/tree.png`,
      used: true,
    },
  ],
}
