export const useD3AxisConfig = (param = {}) => {
  return {
    visible: true,
    top: 5, // x轴label与轴间隔
    left: 5,// y轴label与轴间隔
    showEmpty: true,
    showFirstLabel: true,
    minPadding: 0,
    gridLineWidth: 1,
    gridLineColor: useChartColor({ value: '#4b4b4b', isD3: true }),
    labels: {
      enabled: true,
      style: {
        fontSize: 19,
        color: useChartColor({ value: '#a9a9a9', isD3: true }),
      },
    },
    title: {
      enabled: true,
      rotation: 270,
      text: '',
      margin: 14,
      align: 'middle',
      style: {
        fontSize: 19,
        color: useChartColor({ value: '#ffffff', isD3: true }),
      },
    },
  }
}

export const useD3PublicConfig = (param = {}) => {
  return {
    title: {
      show: false,
      text: '',
      style: {
        ...useFontSimple({
          color: useChartColor({ value: '#fff' }),
          fontSize: 18,
        }),
      },
      align: 'left',
    },
    subtitle: {
      text: '',
      show: false,
      style: {
        ...useFontSimple({
          color: useChartColor({ value: '#fff' }),
          fontSize: 12,
        }),
      },
      align: 'left',
    },
    legend: {
      enabled: true,
      align: 'center',
      alignColumns: true,
      itemDistance: 10,
      itemMarginTop: 10,
      symbolRadius: 0,
      squareSymbol: false,
      labelFormat: '{name}', // {name} {y}
      verticalAlign: 'bottom',//top, middle or bottom
      layout: 'horizontal', //horizontal or vertical or proximate
      itemWidth: undefined, //
      itemStyle: {
        ...useFontSimple({
          color: useChartColor({ value: '#eee' }),
          fontSize: 12,
          fontWeight: 'bold',
        }),
        cursor: 'pointer',
        textOverflow: 'ellipsis',
      },
    },
    tooltip: {
      backgroundColor: {
        custom: false,
        value: useChartColor({ value: '#fff' }),
      },
      borderColor: {
        custom: false,
        value: useChartColor({ value: '#fff' }),
      },
      style: {
        color: useChartColor({ value: '#000' }), // 设置字体颜色为白色
      },
      borderRadius: 3,
      borderWidth: 1,
      distance: 16, // 提示线距离
      enabled: true,
      headerFormat: undefined,
      pointFormat: undefined,
      footerFormat: undefined,
      valueDecimals: 2,
      valuePrefix: '',
      valueSuffix: '',
      hideDelay: 500,
      padding: 8,
    },
  }
}

export const parseD3PublicConfig = param => {
  return {
    ...param,
    gridLineColor: setChartColor(param.gridLineColor),
    labels: {
      enabled: param.labels?.enabled,
      style: {
        fontSize: param.labels?.style.fontSize,
        color: setChartColor(param.labels?.style?.color),
      },
    },
    title: {
      ...param.title,
      style: {
        fontSize: param.title?.style.fontSize,
        color: setChartColor(param.title?.style?.color),
      },
    },
  }
}

export const useFormatterHook = config => {
  const code = ref('')
  const handChangeCode = val => {
    code.value = val.value
  }
  const updateCode= val => {
    try {
      config.plotOptions.series && (config.plotOptions.series.dataLabels.formatter = val.value)
      config.plotOptions.pie && (config.plotOptions.pie.dataLabels.format = val.value)
    } catch (error) {
      console.info('error: ', error)
    }
  }

  return {
    code,
    handChangeCode,
    updateCode,
  }
}
