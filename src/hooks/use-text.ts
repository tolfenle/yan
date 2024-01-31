export const setTextColor = color => {
  const { type, value } = color

  return {
    color: type === COLOR_TYPE.单色 ? value : 'transparent',
    'text-overflow': 'unset',
    'white-space': 'unset',
    'background-image': type === COLOR_TYPE.渐变 ? color.liner : 'none',
    'background-clip': 'unset',
    '-webkit-text-fill-color': 'initial',
    '-webkit-background-clip': 'text',
  }
}
