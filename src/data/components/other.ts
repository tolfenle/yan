const COM_CDN = import.meta.env.VITE_APP_CDN

export const other: ComDataType = {
  type: 'other',
  name: '其他',
  icon: 'v-icon-other',
  data: [
    {
      name: 'VDatePicker',
      alias: '日期选择器',
      img: `${COM_CDN}/date-picker.jpg`,
      thum: `${COM_CDN}-thum/time-selector.jpg`,
      used: true,
    },
  ],
}
