import * as mars3d from 'mars3d'
export const createTitleModel = (config: any) => {
  const layer = new mars3d.layer.TilesetLayer({
    type: '3dtiles',
    name: '',
    ...config,
  })
  return layer
}
