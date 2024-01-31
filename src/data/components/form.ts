const COM_CDN = import.meta.env.VITE_APP_CDN

// export const dialog: ComDataType = {
//   type: 'dialog',
//   name: '弹窗',
//   icon: 'v-icon-interact',
//   data: [
//     {
//       name: 'VDialog',
//       alias: '弹窗',
//       img: `${COM_CDN}/tab-list-332-144.png`,
//       thum: `${COM_CDN}-thum/tab-list-368-208.png`,
//       used: true,
//     },
//   ],
// }
export const select: ComDataType = {
  type: 'select',
  name: '选择类',
  icon: 'v-icon-interact',
  data: [
    {
      name: 'VTabList',
      alias: 'Tab列表',
      img: `${COM_CDN}/tab-list-332-144.png`,
      thum: `${COM_CDN}-thum/tab-list-368-208.png`,
      used: false,
    },
  ],
}

export const button: ComDataType = {
  type: 'button',
  name: '按钮类',
  icon: 'v-icon-interact',
  data: [
    {
      name: 'VBtnGroup',
      alias: '按钮组',
      img: `${COM_CDN}/btn-group-332-144.png`,
      thum: `${COM_CDN}-thum/btn-group-368-208.png`,
      used: true,
    },
    {
      name: 'VFullScreen',
      alias: '全屏切换',
      img: `${COM_CDN}/full-screen-332-144.png`,
      thum: `${COM_CDN}-thum/full-screen-368-208.png`,
      used: true,
    },
  ],
}
