
const { VITE_APP_BASE_API, VITE_UPLOAD_URL, VITE_LOAD_URL, VITE_APP_CDN } = import.meta.env
export const useEnvUrl = () => {
  const setUrl = (url: string) => {
    return url ? url.startsWith('http') ? url : `${VITE_LOAD_URL}${url.startsWith('/') ? url : `/${url}`}` : url
  }
  return {
    baseUrl: VITE_APP_BASE_API,
    uploadUrl: VITE_UPLOAD_URL,
    loadUrl: VITE_LOAD_URL,
    cdnUrl: VITE_APP_CDN,
    setUrl,
  }
}
