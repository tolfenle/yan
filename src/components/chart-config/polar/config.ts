
// 极坐标系
export const chartPolarConfig = () => {
  return {
    zlevel: 0,
    z: 2,
    startAngle: 90,
    clockwise: true,
    center: {
      isPersent: true,
      value: [50, 50],
    },
    radius: {
      isPersent: true,
      value: [8, 80],
    },
    max: {
      use: false,
      useMaxData: false, // 'dataMax'
      value: 0,
      add: true,
    },
  }
}
const TChartPolarConfig = chartPolarConfig()
export const parsePolarConfig = (polar: typeof TChartPolarConfig) => {
  const { max, zlevel, z, center, radius, startAngle, clockwise } = polar

  const setMax = () => {
    if (max.useMaxData) return 'dataMax'
    else
      return function (value) {
        const val = typeof max.value === 'string' ? Number.parseInt(max.value) : max.value
        const mmax = max.add ? (value.max + val) : (value.max - val)
        return mmax
      }
  }

  return {
    zlevel,
    z,
    startAngle,
    clockwise,
    center: center.isPersent ? [`${center.value[0]}%`, `${center.value[1]}%`] : center.value,
    radius: radius.isPersent ? [`${radius.value[0]}%`, `${radius.value[1]}%`] : radius.value,
    ...(!max.use ? {} : {
      max: setMax(),
    }),
  }
}
