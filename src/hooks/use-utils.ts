
export const useNumberToPx = <T>(item: T, suffix = 'px'): T => {
  return (Array.isArray(item)) ? item.map(i => `${i}${suffix}`) : `${item}${suffix}`
}


// 左右布局方式
export const glLrOpt = {
  'icon-left': 'row',
  'icon-right': 'row-reverse',
  'icon-top': 'column',
  'icon-bottom': 'column-reverse',
}

// 上下布局方式
export const glLabelOpt = {
  'label-top': 'column',
  'label-bottom': 'column-reverse',
}


export const glThemeList = [
  ['#85A5FF', '#597EF7', '#2F54EB', '#1D39C4', '#10239E', '#061178', '#030852'],
  ['#5CDBD3', '#36CFC9', '#13C2C2', '#08979C', '#006D75', '#00474F', '#002329'],
  ['#B37FEB', '#9254DE', '#722ED1', '#531DAB', '#391085', '#22075E', '#120338'],
  ['#1C81FF', '#50BA58', '#FF6A00', '#3DFFDC', '#FBE947', '#1DCFFF', '#725CFA'],
  ['#0E79D9', '#73AD10', '#F89712', '#FC4646', '#16B4D1', '#8BC922', '#D62B6D', '#0E74CF', '#6FA70F', '#F99911', '#FD4646', '#16B4D2'],
  ['#67B8F3', '#7AE296', '#FBD485', '#FC9E90', '#7FDCD5', '#9A9BB6', '#7C9CE8', '#F3AB69', '#F2E48A', '#A08DD7', '#68BBF6', '#7CE599'],
  ['#55D299', '#27D4E1', '#3A8EFE', '#A07CF6', '#F66271', '#FAB942', '#FBE967', '#F77D78', '#00A2B8', '#024D53', '#0784D5', '#7B5305'],
  ['#3AD181', '#E2B234', '#884EB9', '#9ACF59', '#656C9D', '#E63985', '#38cb7d', '#ddae33', '#844bb3', '#93c555', '#5f6694', '#df3881'],
  ['#78B84A', '#9ABD46', '#CDD53B', '#F5EE2C', '#EEB327', '#EE8B2D', '#E4622C', '#D42727', '#B22127', '#77B84A', '#9EC147', '#CED63B'],
  ['#F7486A', '#FDDF5E', '#D62F90', '#03E7E9', '#D55E7F', '#C163B7', '#443F7F', '#F77D78', '#00A5BB', '#025056', '#0786D9', '#7B5305'],
]
