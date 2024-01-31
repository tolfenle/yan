/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2023-11-23 16:10:41
 */
const def_title_config = {
  color: useChartColor({ value: '#333' }),
  fontStyle: 'normal',
  fontWeight: 'bolder',
  fontFamily: 'sans-serif',
  fontSize: 18,
  overflow: 'break',
  ellipsis: '...',
}
export const useTitleConfig = (option = {}) => {

  const sub = {
    subtext: '',
    sublink: '',
    subtarget: 'blank',
    subtextStyle: {
      color: useChartColor({ value: '#ECECED' }),
      fontStyle: 'normal',
      fontWeight: 'bolder',
      fontFamily: 'sans-serif',
      fontSize: 16,
      overflow: 'break',
      ellipsis: '...',
    },
    subtextSuffix: '',
    preffix: '',
  }

  return {
    show: false,
    customPosition: false,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    target: 'blank', // 'blank' 新窗口打开   'self' 当前窗口打开
    textAlign: 'auto', // auto 'left'、'right'、'center',
    textVerticalAlign: 'auto',// 'auto'、'top'、'bottom'、'middle'。
    padding: [5, 5, 5, 5],
    itemGap: 10, // 主副标题之间的间距
    text: '',
    link: '',
    textSuffix: '%',
    textStyle: {
      color: useChartColor({ value: '#fff' }),
      fontStyle: 'normal',
      fontWeight: 'bolder',
      fontFamily: 'sans-serif',
      fontSize: 50,
      overflow: 'break',
      ellipsis: '...',
    },
    textSuffixStyle: {
      color: useChartColor({ value: '#fff' }),
      fontWeight: 'bolder',
      fontSize: 16,
    },
    ...sub,
    ...option,
  }
}


export const ETITLE_CONFIG = useTitleConfig()

export const parseTitlePosition = (config: any) => {
  const { left, right, top, bottom, customPosition } = config

  return customPosition ? {
    left,
    right,
    top,
    bottom,
  } : {
    left: 'center',
    top: 'center',
  }
}

//   < g - field label = "字段内容" tooltip = "从数据中匹配对应的字段值显示" >
//     <g-field v-for= "(item,index) in config.rich" : key = "index" : label = "`字段${index + 1}`" >
//       <g-input - number
// v - model="item.param.line"
//             : min = "1"
// suffix = "行"
// label = "占据行数"
//   />
//   <g-input v - model="item.param.key" label = "字段名" />
//     <GChartFontConfig : config = "item.param.style" />
//       <g-input v - model="item.suffix.value" label = "后缀" />
//         <GChartFontConfig v -if= "item.suffix.value" : config = "item.suffix.style" />
//           </g-field>
//           < /g-field>
