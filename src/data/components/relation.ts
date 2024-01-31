const COM_CDN = import.meta.env.VITE_APP_CDN

export const relation: ComDataType = {
  type: 'relation',
  name: '关系图',
  icon: 'v-icon-relation',
  data: [
    {
      name: 'VTree',
      alias: '树图',
      img: `${COM_CDN}/tree.png`,
      thum: `${COM_CDN}/tree.png`,
      used: false,
    },
  ],
}
