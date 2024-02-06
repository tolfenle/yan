const COM_CDN = import.meta.env.VITE_APP_CDN

export const list: ComDataType = {
  type: 'list',
  name: '列表',
  icon: 'v-icon-view-list',
  data: [
    {
      name: 'VCarouselTable',
      alias: '基础轮播表格',
      img: `${COM_CDN}/carousel-table-332-144.png`,
      thum: `${COM_CDN}-thum/carousel-table-370-208.png`,
      used: true,
    }, {
      name: 'VScrollTable',
      alias: '轮播表格(可配置列)',
      img: `${COM_CDN}/scroll-table-332-144.png`,
      thum: `${COM_CDN}/scroll-table-332-144.png`,
      used: true,
    }, {
      name: 'VPageTable',
      alias: '分页表格',
      img: `${COM_CDN}/page-table-332-144.jpg`,
      thum: `${COM_CDN}/page-table-332-144.jpg`,
      used: true,
    },
  ],
}
