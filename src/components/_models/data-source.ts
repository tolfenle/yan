import { capitalize } from 'lodash-es'
import { generateId } from '@/utils/util'
import { FilterConfig } from '@/components/_models/data-filter'
import { FieldConfig } from '@/components/_models/data-field'
import { DatavComponent } from './datav-component'

export enum ApiType {
  /**
   * 静态数据
   */
  static = 'static',
  /**
   * api
   */
  api = 'api',
  // sql
  sql = 'sql',
  // socket
  socket = 'socket',
  // global
  global = 'global'
}

export enum ApiStatus {
  loading = 'loading',
  success = 'success',
  failed = 'failed',
  completed='completed',
  incomplete='incomplete'
}

export enum FieldStatus {
  loading = 'loading',
  success = 'success',
  failed = 'failed',
  optional = 'optional',
}

export enum ApiRequestMethod {
  GET = 'GET',
  POST = 'POST',
}

// ************************ ApiConfig ************************
export interface ApiConfig {
  fields: Record<string, FieldConfig>
  /**
   * 执行指定的处理函数，默认值是 render
   */
  handler: string
  description: string
  useAutoUpdate: boolean
  autoUpdate: number
}

export interface ApiConfigMap {
  source: ApiConfig
  [key: string]: ApiConfig
}

// ************************ ApiDataConfig ************************
export interface ApiDataConfig {
  id: string
  comId: string
  type: ApiType
  config: {
    useFilter?: boolean
    data?: string
    api?: string
    apiMethod?: ApiRequestMethod
    apiHeaders?: string
    apiBody?: string
    apiHost?: string
    local?: boolean
    cookie?: boolean
    fields?: [{
      key: string
      map?: string
    }]
    // 数据源
    database?: string
    // 数据库
    datatable?: string
    // 数据表
    datalist?: string
    // sql语句
    sql?: string

    // 全局属性
    global?: string

    // socket地址
    socket?: string
    // 频道
    socketChannel?: string
  }
  pageFilters: FilterConfig[]
}

export interface ApiDataConfigMap {
  source: ApiDataConfig
  [key: string]: ApiDataConfig
}

export type ApiKeyName = keyof ApiConfigMap

/**
 * 设置数据接口配置
 */
export function setApiConfig(com: DatavComponent, options?: Partial<ApiConfig>, name: ApiKeyName = 'source') {
  if (!com.apis) {
    com.apis = {}
  }
  com.apis[name] = {
    fields: {},
    description: '',
    useAutoUpdate: false,
    autoUpdate: 1,
    ...options,
    handler: name === 'source' ? 'render' : `set${capitalize(name as string)}`,
  }
}

/**
 * 设置源数据
 */
export function setApiData(com: DatavComponent, options?: Partial<ApiDataConfig>, name: ApiKeyName = 'source') {
  if (!com.apiData) {
    com.apiData = {}
  }
  com.apiData[name] = {
    id: generateId(),
    type: ApiType.static,
    pageFilters: [],
    config: {
      useFilter: false,
      data: '',
      fields: [{
        key: '',
        map: '',
      }],
    },
    ...options,
    comId: com.id,
  }
}

export const initApiConfig = setApiConfig
export const initApiData = setApiData

export function createDataSources() {
  return {
    [ApiType.static]: '静态数据',
    [ApiType.api]: 'API接口',
    [ApiType.sql]: 'SQL语句',
    [ApiType.socket]: 'SOCKET连接',
    [ApiType.global]: '全局属性',
  }
}

export function createDataConfigForApiSql(config: ApiDataConfig['config']) {
  if (config.api === undefined) {
    Object.assign(config, {
      api: '',
      apiMethod: ApiRequestMethod.GET,
      apiHeaders: '{}',
      apiBody: '{}',
      cookie: false,
      apiHost: '',
      local: true,
      // 数据源
      database: null,
      // 数据库
      datatable: null,
      // 数据表
      datalist: null,
      // sql语句
      sql: '',
      // 全局属性
      global: '',
      // socket地址
      socket: '',
      // 频道
      socketChannel: '',
      fields: [{
        key: '',
        map: '',
      }],
    })
  }
}

