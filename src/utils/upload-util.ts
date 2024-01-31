interface FileInfo {
  name: string
  size: number
}

interface UploadOption {
  allowType: string
  allowSize: number
}

export const uploadHost = import.meta.env.VITE_UPLOAD_URL || ''
export const previewHost = import.meta.env.VITE_LOAD_URL || ''

export const validAllowImg = (file: FileInfo, option: Partial<UploadOption>) => {
  const opt: UploadOption = {
    allowType: 'gif|jpeg|jpg|png',
    allowSize: 2,
    ...option,
  }

  // const regx = new RegExp(`\\.(${opt.allowType})$`, 'i')
  // if (!regx.test(file.name)) {
  //   return `上传图片的格式只能是 ${opt.allowType} 中的一种！`
  // }

  if (file.size / 1024 / 1024 > opt.allowSize) {
    return `上传图片的大小不能超过 ${opt.allowSize}MB！`
  }

  return null
}

export const dataURLtoBlob = (dataURL: string) => {
  const data = window.atob(dataURL.split(',')[1])
  const ia = new Uint8Array(data.length)
  for (let i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i)
  }
  return new Blob([ia], { type: 'image/png' })
}


export const uploadHeader = () => {
  const param = {}
  const key = localStorage.getItem(import.meta.env.VITE_DATAV_TOKEN_KEY as string)
  const value = localStorage.getItem(import.meta.env.VITE_DATAV_TOKEN_KEY as string)
  param[key] = value
  return param
}


export const validAllowVideo = (file: FileInfo, option: Partial<UploadOption>) => {
  const opt: UploadOption = {
    allowType: 'mp4|mov|avi|wmv|flv|mpg|rm|rmvb|mkv|m4v|3gp|3g2|webm',
    allowSize: 10,
    ...option,
  }

  const regx = new RegExp(`\\.(${opt.allowType})$`, 'i')
  if (!regx.test(file.name)) {
    return `上传视频的格式只能是 ${opt.allowType} 中的一种！`
  }

  if (file.size / 1024 / 1024 > opt.allowSize) {
    return `上传视频的大小不能超过 ${opt.allowSize}MB！`
  }

  return null
}
