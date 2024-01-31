/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-19 10:09:50
 * @LastEditTime : 2023-11-02 15:08:08
 */
import { _ } from 'iking-utils'
import { setChartColor } from './../public/chartFont'

export const chartLegendConfig = {
  show: false,
  position: {
    auto: true,
    left: 'right', // 'left', 'center', 'right'
    top: 'top', // 'top', 'middle', 'bottom'
    value: ['', '', '', ''],
  },
  width: {
    auto: true,
    value: 200,
  },
  height: {
    auto: true,
    value: 200,
  },
  orient: 'horizontal', // horizontal vertical
  align: 'auto', // auto left right
  type: 'plain', // plain scroll
  icon: {
    type: 'default', // image svg
    value: 'rect', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
    image: '',
    svg: '',
  },
  padding: [5, 5, 5, 5],
  itemGap: 10,
  itemWidth: 25,
  itemHeight: 14,
  scroll: {
    pageButtonItemGap: 5, // 图例控制块中，按钮和页信息之间的间隔。
    pageButtonGap: 5, // 图例控制块和图例项之间的间隔。
    pageButtonPosition: 'start', //'start' end 图例控制块的位置
    pageIcons: {
      horizontal: {
        type: 'svg', // svg  image
        value: ['M0,0L12,-10L12,10z', 'M0,0L-12,-10L-12,10z'],
        image: '',
      },
      vertical: {
        type: 'svg',
        value: ['M0,0L20,0L10,-20z', 'M0,0L20,0L10,20z'],
        image: '',
      },
    },
    pageIconColor: '#2f4554',
    pageIconInactiveColor: '#aaaaaa',
    pageIconSize: 15,
  },
  textStyle: _.cloneDeep(chartFont),
}

export const parseLegendConfig = (config: typeof chartLegendConfig) => {
  const { setUrl } = useEnvUrl()
  let position = {}
  if (config.position.auto) {
    position = {
      left: config.position.left,
      top: config.position.top,
    }
  } else {
    position = {
      top: config.position.value[0],
      bottom: config.position.value[1],
      left: config.position.value[2],
      right: config.position.value[3],
    }
  }

  let icon = ''
  if (config.icon.type === 'default') {
    icon = config.icon.value
  }else if(config.icon.type === 'image'){
    icon = `image://${setUrl(config.icon.image)}`
  } else {
    icon = config.icon.svg
  }

  return {
    ...config,
    ...position,
    icon,
    textStyle: {
      ...config.textStyle,
      color: setChartColor(config.textStyle.color),
    },
  }
}
