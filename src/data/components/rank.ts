const COM_CDN = import.meta.env.VITE_APP_CDN

export const rank: ComDataType = {
  type: 'rank',
  name: '排行',
  icon: 'v-icon-relation',
  data: [
    {
      name: 'VScrollRank',
      alias: '基础排行',
      img: `${COM_CDN}/scroll-rank-332-144.png`,
      thum: `${COM_CDN}/scroll-rank-332-144.png`,
      used: true,
    }, {
      name: 'VScrollRankBar',
      alias: '排行条形图',
      img: `${COM_CDN}/scroll-rank-bar-332-144.png`,
      thum: `${COM_CDN}/scroll-rank-bar-332-144.png`,
      used: true,
    }, {
      name: 'VTableBar',
      alias: '轮播列表柱状图',
      img: `${COM_CDN}/table-bar-332-144.png`,
      thum: `${COM_CDN}-thum/table-bar-370-208.png`,
      used: true,
    }, {
      name: 'VRankBoard',
      alias: '轮播条形图',
      img: `${COM_CDN}/rank-board-332-144.png`,
      thum: `${COM_CDN}/rank-board-332-144.png`,
      used: true,
    },
  ],
}
