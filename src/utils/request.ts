/*
 * @Author: wfl
 * @LastEditors: fj
 * @description:
 * @updateInfo:
 * @Date: 2022-04-02 09:33:55
 * @LastEditTime: 2023-05-16 12:55:55
 */
import axios from 'axios'
interface IMsg {
  code: number
  data: any
  message: string
}

const instance = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_APP_BASE_API
    : import.meta.env.VITE_APP_BASE_API,
  timeout: 400000,
  // 表示跨域请求时是否需要使用凭证
  withCredentials: true,
  // 设置参数自动获取
  xsrfCookieName: 'csrfToken',
  xsrfHeaderName: 'x-csrf-token',
})

// request interceptor
instance.interceptors.request.use(
  config => {
    config.headers.Accept = 'application/json'
    config.headers['Content-Type'] = 'application/json'
    if (localStorage.getItem(import.meta.env.VITE_DATAV_TOKEN_KEY as string)) {
      config.headers[import.meta.env.VITE_DATAV_TOKEN_KEY as string] =
        localStorage.getItem(import.meta.env.VITE_DATAV_TOKEN_KEY as string)
    }
    return {
      ...config,
    }
  },
  error => {
    return Promise.reject(error)
  },
)

export const netPost = async (url: string, param?: any, config?: {}) => {
  // if (param && Object.prototype.toString.call(param) !== '[object Object]') {
  //   throw new Error('param must be object')
  // }
  const response = await instance({
    method: 'post',
    url,
    data: param,
    headers: {
      ...config,
    },
  })
  return response.data as IMsg
}

export const netGet = async (url = '', param?: any) => {
  let queryStr = ''
  if (Object.prototype.toString.call(param) === '[object Object]') {
    Reflect.ownKeys(param).forEach(key => {
      queryStr += `${String(key)}=${param[key]}&`
    })
  }
  const response = await instance.get(`${url}?${queryStr}`)
  return response.data as IMsg
}
export const netPostFile = async (
  url: string,
  param: object,
  fileNameStr: string,
) => {
  const apiUrl = `${/^http(s)?:\/{2}?/.test(url) ? url : url}`
  try {
    const res = await instance({
      method: 'post',
      url: apiUrl,
      data: param,
    })
    const blob = new Blob([res.data]) //application/vnd.ms-excel这里表示xls类型文件
    const contentDisposition = res.headers['content-disposition'] //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
    const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
    const result = patt.exec(contentDisposition)
    const filename = result ? result[1] : fileNameStr
    const downloadElement = document.createElement('a')
    const href = window.URL.createObjectURL(blob) //创建下载的链接
    const reg = /^["](.*)["]$/g
    downloadElement.style.display = 'none'
    downloadElement.href = href
    downloadElement.download = decodeURI(filename.replace(reg, '$1')) //下载后文件名
    document.body.appendChild(downloadElement)
    downloadElement.click() //点击下载
    document.body.removeChild(downloadElement) //下载完成移除元素
    window.URL.revokeObjectURL(href) //释放掉blob对象
    return res
  } catch (err) {
    console.info('ERROE', err)
    return
  }
}

// response interceptor
instance.interceptors.response.use(
  response => {
    const res = response.data

    // 如果自定义code不为0，则将其判断为错误。
    if (res.code !== undefined && res.code !== 1000 && res.code !== 1001) {
      // TODO

      // 50008: 非法的token; 50012: 其他客户端登录了; 50014: Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // TODO
      }

      return Promise.reject(new Error(res.message || 'System Error'))
    }

    return response
  },
  error => {
    return error
  },
)

if (import.meta.env.DEV) {
  // const mockAdapter = new MockAdapter(instance, { delayResponse: 500 })
  // MockApi(mockAdapter)
}
function http<T = any>(
  { url, data, method, headers, onDownloadProgress, signal, beforeRequest, afterRequest }: HttpOption,
) {
  const successHandler = (res: AxiosResponse<Response<T>>) => {
    // const authStore = useAuthStore()

    if (res.data.status === 'Success' || typeof res.data === 'string')
      return res.data

    if (res.data.status === 'Unauthorized') {
      // authStore.removeToken()
      window.location.reload()
    }

    return Promise.reject(res.data)
  }

  const failHandler = (error: Response<Error>) => {
    afterRequest?.()
    throw new Error(error?.message || 'Error')
  }

  beforeRequest?.()

  method = method || 'GET'

  const params = Object.assign(typeof data === 'function' ? data() : data ?? {}, {})

  return method === 'GET'
    ? instance.get(url, { params, signal, onDownloadProgress }).then(successHandler, failHandler)
    : instance.post(url, params, { headers, signal, onDownloadProgress }).then(successHandler, failHandler)
}

export function chatPost<T = any>(
  { url, data, method = 'POST', headers, onDownloadProgress, signal, beforeRequest, afterRequest }: HttpOption,
): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    headers,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  })
}


export default instance
