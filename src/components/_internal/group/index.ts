import { ComponentGroupAttr, ComType, DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
} from '@/components/_models/data-source'
import { DataEventConfig } from '@/components/_models/data-event'


export interface GroupTransform3d {
  id: string
  rotate3d: {
    axis: string
    deg: number
  }
  scale3d: {
    x: number
    y: number
    lock: boolean
  }
  translate3d: {
    x: number
    y: number
    z: number
  }
}

export interface GroupConfig {
  transform3d: GroupTransform3d
}

export const createTransform3d = (com: DatavComponent): GroupTransform3d => {
  return {
    id: com.id,
    rotate3d: {
      axis: 'y',
      deg: 30,
    },
    scale3d: {
      x: 1,
      y: 1,
      lock: false,
    },
    translate3d: {
      x: 0,
      y: 0,
      z: 0,
    },
  }
}

export const createDialog = (com: DatavComponent): GroupTransform3d => {
  return {
    id: com.id,
    width: com.attr.w + 10,
    height: com.attr.h,
    header: {
      background: useChartColor({ value: '#0000', isCss: true }),
      height: 40,
    },
    title: {
      show: true,
      text: '弹窗',
      ...useFontSimple({ color: useChartColor({ value: '#fff', isText: true }) }),
    },
    close: {
      show: true,
      color: useChartColor({ value: '#fff' }),
      size: 12,
    },
  }
}

export const createGroupConfig = (com: DatavComponent) => {
  return {
    transform3d: createTransform3d(com),

  }
}

export const sortGroupConfig = (group: DatavGroup) => {
  const list = []
  group.children.forEach(com => {
    const oc = group.config.find(m => com.id === m.transform3d.id)
    list.push(oc ?? createGroupConfig(com))
  })
  group.config = list
}

/**
 * DatavGroup
 */
export class DatavGroup extends DatavComponent {
  attr: ComponentGroupAttr = {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    deg: 0,
    opacity: 1,
    filpV: false,
    filpH: false,
    apply3d: false,
    perspective: 500,
    perspectiveOrigin: {
      x: 50,
      y: 50,
    },
  }

  fold = true

  config: GroupConfig[] = []

  isDialog?: Boolean

  dialog?: {
    width: number
    height: number
    header: {
      show: Boolean
      background: any
      height: Number
    }
    title: {
      text: String
      show: Boolean
      color: any
      [key: string]: any
    }
    confirm: {
      show: Boolean
      color: any
    }
    close: {
      show: Boolean
      color: any
    }
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor(attr: Partial<ComponentGroupAttr>) {
    super('Group', attr, ComType.layer)

    this.alias = '组'
    this.icon = 'group'
    this.img = `${import.meta.env.VITE_APP_CDN}/com-thum/group-200-200.png`,
    this.attr = { ...this.attr, ...attr }
    this.scaling = {
      zoom: false,
      w: attr.w,
      h: attr.h,
      sx: 1,
      sy: 1,
    }

    this.initData()
  }

  initData() {
    this.children = []
    return this
  }

  async loadData() { }
}

export default DatavGroup
