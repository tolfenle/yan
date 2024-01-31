
export const useMask = (bg = 'radial-gradient(rgba(139, 138, 138, 0.219) 50%, rgba(65, 57, 57, 0.658) 70%, rgba(17, 16, 16, 1) 90%)') => {
  const maskDiv = document.createElement('div')
  let flag = false
  maskDiv.style.cssText = `
      position: absolute;
      top:0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999;
      background-image: ${bg};
      `
  const addMask = () => {
    if (flag) return
    document.body.appendChild(maskDiv)
    flag = true
  }

  const updateMask = bg => {
    maskDiv.style.backgroundImage = bg
  }

  const removeMask = () => {
    document.body.remove(maskDiv)
    flag = false
  }
  return {
    maskDiv,
    addMask,
    removeMask,
    updateMask,
  }
}
