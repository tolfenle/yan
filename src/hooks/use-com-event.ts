export const useEventConfig = fields => {

  return {
    name: '新建事件',
    enable: true,
    description: '',
    type: EVENT_TYPE.组件事件,
    target: '',
    actions: null,
    // fields: editFields,
    // 跳转链接
    link: '',
    // 链接打开方式
    linkBlank: true,
    customFunc: '',
    reRequest: {
      func: '',
      fields: fields,
    },
    // 更新数据
    updateData: {
      func: '',
    },
    // 更新配置
    updateConfig: {
      func: '',
    },
    // 切换显隐
    updateHiddle: {
      fields: fields.filter(e => e.custom),
      func: '',
    },
    // 定时器
    timers: {
      // 定时器 时间
      timer: 6,
      // 是否循环
      loop: false,
      func: '',
    },
    sysUpScreen: {
      func: '',
      fields: fields,
    },
    // 自定义事件
    customEvent: {
      func: '',
    },
  }
}
