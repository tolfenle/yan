
export const tooltipConfig = {
  show: true,
  trigger: 'axis', // item 'axis' 'none'
  triggerOn: 'mousemove', // 'mousemove'  'click' 'mousemove|click' 'none'
  alwaysShowContent: false,
  enterable: true,
  confine: false, // 是否将 tooltip 框限制在图表的区域内。
  appendToBody: true,
  position: [20, 20],
  backgroundColor: 'rgba(255,255,255,0.9)',
  borderColor: '#a9a9a9',
  borderWidth: 0,
  padding: [16, 16, 16, 16],
  order: 'seriesAsc', // 'seriesAsc'
  formatter: {
    type: 'text', // text function
    text: '',
    tip: '{a}（系列名称），{b}（类目值），{c}（数值）',
    textOption: {
      a: {
        name: '系列名称',
        show: true,
        oneLine: true,
        style: {
          ...useFontSimple({ color: '#333333' }),
        },
      },
      b: {
        name: '类目值',
        show: true,
        oneLine: false,
        style: {
          ...useFontSimple({ color: '#333333' }),
        },
      },
      c: {
        name: '数值',
        show: true,
        oneLine: false,
        suffix: '',
        style: {
          ...useFontSimple({ color: '#333333' }),
          fontSize: 18,
          fontWeight: 600,
        },
      },
      d: {
        name: '空/百分比',
        show: true,
        oneLine: false,
        suffix: '',
        style: {
          ...useFontSimple({ color: '#333333' }),
        },
      },
    },
    function: ``,
  },
  textStyle: {
    ...chartFont,
  },
  axisPointer: {
    type: 'shadow',

  },
  animation: {
    ...useChartAnimationConfig(),
  },
}


export const parseTooltipConfig = (tooltip: typeof tooltipConfig) => {
  const { formatter } = tooltip
  let forStr: any = null
  if (formatter.type === 'text') {
    // const { a, b, c, d } = formatter.textOption
    // let astyle = ''
    // for (const i in a.style) {
    //   astyle += `${i}: ${a.style[i]}${i === 'fontSize' ? 'px' : ''}${ i === 'color' ? setChartColor(a.style[i]) : ''};`
    // }


    // const aStr = a.show ? `<p style="${astyle};display: ${a.oneLine ? 'block;' : 'inline-block;'}">{a}</p>` : ''

    // const bStr = b.show ? `<p style="${b.style};display: ${b.oneLine ? 'block;' : 'inline-block;'}">{b}</p>` : ''

    // const cStr = c.show ? ` <p style="${c.style};display: ${c.oneLine ? 'block;' : 'inline-block;'}">{c}</p>` : ''

    // const dStr = d.show ? `<p style="${d.style};display: ${d.oneLine ? 'block;': 'inline-block;'}">{d}</p>` : ''
    // forStr = `<div>
    //   ${aStr}  ${bStr}  ${cStr}  ${dStr}
    // </div>`
  } else {
    forStr = () => {
      return ``
    }
  }

  if (tooltip.hasOwnProperty('showDelay')) delete tooltip.showDelay
  if (tooltip.hasOwnProperty('hideDelay')) delete tooltip.hideDelay
  return {
    ...tooltip,
    formatter: forStr,
    position: point => {
      return [point[0] + tooltip.position[0], point[1] + tooltip.position[1]]
    },
    textStyle: {
      ...tooltip.textStyle,
      color: setChartColor(tooltip.textStyle.color),
    },
  }
}
