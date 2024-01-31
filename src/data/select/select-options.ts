/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-10 18:32:30
 * @LastEditTime : 2024-01-11 10:17:21
 */
import { useDictStore } from '@/store/dict'
const dictStore = useDictStore()

// ---
export const GlFontFamilys = computed(() => dictStore.fontMamilys.map(fo => {
  return {
    id: fo.name,
    value: fo.remark || fo.name,
  }
}).concat([
  { id: 'Microsoft Yahei', value: '微软雅黑' },
  { id: 'SimSun', value: '宋体' },
  { id: 'SimHei', value: '黑体' },
  { id: 'LiSu', value: '隶书' },
  { id: 'arial', value: 'arial' },
  { id: 'sans-serif', value: 'sans-serif' },
  { id: 'Number1', value: '数字1' },
  { id: 'Number2', value: '数字2' },
  { id: 'Number3', value: '数字3' },
  { id: 'Number4', value: '数字4' },
  { id: 'Number5', value: '数字5' },
  { id: 'tahoma', value: 'tahoma' },
]))

// ---
export const GlFontWeights = [
  { id: 'lighter', value: '细' },
  { id: 'normal', value: '正常' },
  { id: 'bolder', value: '粗' },
  { id: '100', value: '100' },
  { id: '200', value: '200' },
  { id: '300', value: '300' },
  { id: '400', value: '400' },
  { id: '500', value: '500' },
  { id: '600', value: '600' },
  { id: '700', value: '700' },
  { id: '800', value: '800' },
  { id: '900', value: '900' },
]
// ---
export const GlFontStyles = [
  { id: 'italic', value: '斜体' },
  { id: 'normal', value: '正常' },
]
// ---
export const GlHAligns = [
  { id: 'left', value: '左对齐' },
  { id: 'center', value: '居中对齐' },
  { id: 'right', value: '右对齐' },
]
// ---
export const GlVAligns = [
  { id: 'top', value: '上对齐' },
  { id: 'middle', value: '居中对齐' },
  { id: 'bottom', value: '下对齐' },
]
// ---
export const GlWritingModes = [
  { id: 'horizontal-tb', value: '水平' },
  { id: 'vertical-rl', value: '垂直' },
]

export const GlJustifyContents = [
  { id: 'flex-start', value: '左对齐' },
  { id: 'center', value: '居中对齐' },
  { id: 'flex-end', value: '右对齐' },
]

export const GlAligns = [
  { id: 'flex-start', value: '上对齐' },
  { id: 'center', value: '居中对齐' },
  { id: 'flex-end', value: '下对齐' },
]

export const angles = [
  { id: 'horizontal', value: '水平' },
  { id: 'bevel', value: '斜角' },
  { id: 'vertical', value: '垂直' },
]

export const GlCaps = [
  { id: 'butt', value: '方形' },
  { id: 'bevel', value: '斜角' },
  { id: 'vertical', value: '垂直' },
]

export const GlTitleLocations = [
  { id: 'start', value: '开头' },
  { id: 'center', value: '中间' },
  { id: 'end', value: '末尾' },
]

export const GlLineStyles = [
  { id: 'solid', value: '实线' },
  { id: 'dashed', value: '虚线' },
  { id: 'dotted', value: '点线' },
]
export const GlD3LineStyles = [
  { id: 'solid', value: '实线' },
  { id: 'dash', value: '虚线' },
]

export const GlFillTypes = [
  { id: 'solid', value: '实体填充' },
  { id: 'gradient', value: '渐变填充' },
]

export const GlRepeatTypes = [
  { id: 'no-repeat', value: '不重复，拉伸满' },
  { id: 'repeat', value: '水平和垂直重复' },
  { id: 'repeat-x', value: '水平重复' },
  { id: 'repeat-y', value: '垂直重复' },
  { id: 'round', value: '自动' },
]

// ---
export const GlEchartsLablePositions = [
  { id: 'middle', value: '居中' },
  { id: 'top', value: '顶部' },
  { id: 'left', value: '左侧' },
  { id: 'right', value: '右侧' },
  { id: 'bottom', value: '底部' },
  { id: 'inside', value: '内部' },
  { id: 'insideLeft', value: '内-左侧' },
  { id: 'insideRight', value: '内-右侧' },
  { id: 'insideTop', value: '内-顶部' },
  { id: 'insideBottom', value: '内-底部' },
  { id: 'insideTopLeft', value: '内-顶部居左' },
  { id: 'insideBottomLeft', value: '内-底部居左' },
  { id: 'insideTopRight', value: '内-顶部居右' },
  { id: 'insideBottomRight', value: '内-顶部居右' },
]

export const GlAnimationEasings = ['linear', 'quadraticIn', 'quadraticOut', 'quadraticInOut', 'cubicIn', 'cubicOut', 'cubicInOut', 'quarticIn', 'quarticOut', 'quarticInOut', 'quinticIn', 'quinticOut', 'quinticInOut', 'sinusoidalIn', 'sinusoidalOut', 'sinusoidalInOut', 'exponentialIn', 'exponentialOut', 'exponentialInOut', 'circularIn', 'circularOut', 'circularInOut', 'elasticIn', 'elasticOut', 'elasticInOut', 'backIn', 'backOut', 'backInOut', 'bounceIn', 'bounceOut', 'bounceInOut'].map(m => ({ id: m, value: m }))

export const GlSelectSuggests = [
  { id: 'auto', value: '自适应' },
  { id: 'dataMin', value: '数据最小值' },
  { id: 'dataMax', value: '数据最大值' },
]

export const GlOrients = [
  { id: 'horizontal', value: '水平' },
  { id: 'vertical', value: '垂直' },
]

export const GlAxisTypes = [
  { id: 'category', value: '类目型' },
  { id: 'value', value: '数值型' },
  { id: 'time', value: '时间型' },
  { id: 'log', value: '对数轴' },
]

export const GlAxisPosition = [
  { id: 'bottom', value: '底部' },
  { id: 'top', value: '顶部' },
]

export const GlYxisPosition = [
  { id: 'left', value: '左侧' },
  { id: 'right', value: '右侧' },
]

export const GlLegendLocations = [
  { id: 'top-left', value: '顶部居左' },
  { id: 'top-center', value: '顶部居中' },
  { id: 'top-right', value: '顶部居右' },
  { id: 'middle-left', value: '左侧居中' },
  { id: 'middle-right', value: '右侧居中' },
  { id: 'bottom-left', value: '底部居左' },
  { id: 'bottom-center', value: '底部居中' },
  { id: 'bottom-right', value: '底部居右' },
]

export const GlEchartIcons = [
  { id: 'auto', value: '自适应', icon: 'shape-auto' },
  { id: 'circle', value: '圆形', icon: 'shape-circle' },
  { id: 'emptyCircle', value: '圆环', icon: 'shape-empty-circle' },
  { id: 'rect', value: '矩形', icon: 'shape-rect' },
  { id: 'roundRect', value: '圆角矩形', icon: 'shape-round-rect' },
  { id: 'triangle', value: '三矩形', icon: 'shape-triangle' },
  { id: 'diamond', value: '菱形', icon: 'shape-diamond' },
  { id: 'arrow', value: '箭头', icon: 'shape-arrow' },
  { id: 'pin', value: '箭头', icon: 'shape-arrow' },
  { id: 'none', value: '无', icon: '' },
]

// -----
export const GlValueFormats = [
  { id: 'auto', value: '默认' },
  { id: 'd', value: '11(整数)' },
  { id: '.1f', value: '11.1(浮点数)' },
  { id: '.2f', value: '11.11(浮点数)' },
  { id: '.0%', value: '11%' },
  { id: '.1%', value: '11.1%' },
  { id: '.2%', value: '11.11%' },
  { id: 'th', value: '1,111(千分位)' },
  { id: '.1t', value: '1,111.1(千分位)' },
  { id: '.2t', value: '1,111.11(千分位)' },
]

// -----
export const GlTimeFormats = [
  { id: 'YYYY-MM-DD HH:mm:ss', value: '年-月-日 时:分:秒(2012-01-01 02:03:00)' },
  { id: 'YYYY-MM-DD HH:mm', value: '年-月-日 时:分(2012-01-01 02:03)' },
  { id: 'YYYY-MM-DD', value: '年-月-日(2012-01-01)' },
  { id: 'YYYY-MM', value: '2012-01(年-月)' },
  { id: 'YYYY', value: '2012(年)' },
  { id: 'MM-DD', value: '01-01(月-日)' },
  { id: 'MM', value: '01(月)' },
  { id: 'HH:mm:ss', value: '时:分:秒(02:03:00)' },
  { id: 'HH:mm', value: '时:分(02:03)' },
  { id: 'YYYY/MM/DD HH:mm:ss', value: '2012/01/01 02:03:00(年/月/日 时:分:秒)' },
  { id: 'YYYY/MM/DD', value: '2012/01/01(年/月/日)' },
  { id: 'YYYY/MM', value: '2012/01(年/月)' },
  { id: 'MM/DD', value: '01/01(月/日)' },
]

export const GlImageTypes = [
  { id: 'bitmap', value: '位图' },
  { id: 'vector', value: '矢量图' },
]

export const GlChartInfos = [
  { id: 'simple', value: '简单' },
  { id: 'normal', value: '通用' },
  { id: 'detail', value: '详细' },
]

export const GlTooltipTrigger = [
  { id: 'item', value: '图形' },
  { id: 'axis', value: '坐标轴' },
  { id: 'none', value: '不触发' },
]

export const GlTriggerOn = [
  { id: 'mousemove', value: '鼠标移动时' },
  { id: 'click', value: '鼠标点击时' },
  { id: 'mousemove|click', value: '鼠标移动和点击时' },
  { id: 'none', value: '不触发' },
]


export const GlLegendAlign = [
  { id: 'auto', value: '自动' },
  { id: 'left', value: '左对齐' },
  { id: 'right', value: '右对齐' },
]

export const GlLegendTypes = [
  { id: 'default', value: '默认图形' },
  { id: 'svg', value: 'SVG' },
  { id: 'image', value: '图片' },
]
export const GlBackgroundSies = [
  { id: 'auto', value: '自适应' },
  { id: 'cover', value: '覆盖' },
  { id: 'contain', value: '缩放' },
  { id: '100% 100%', value: '铺满' },
  { id: '100% auto', value: '纵向铺满' },
  { id: 'auto 100%', value: '横向铺满' },
]

export const GlAnimatecss = ['animate__bounce', 'animate__flash', 'animate__pulse', 'animate__rubberBand', 'animate__shakeX', 'animate__shakeY', 'animate__headShake', 'animate__swing', 'animate__tada', 'animate__wobble', 'animate__jello', 'animate__heartBeat', 'animate__backInDown', 'animate__backInLeft', 'animate__backInRight', 'animate__backInUp', 'animate__backOutDown', 'animate__backOutLeft', 'animate__backOutRight', 'animate__backOutUp', 'animate__bounceIn', 'animate__bounceInDown', 'animate__bounceInLeft', 'animate__bounceInRight', 'animate__bounceInUp', 'animate__bounceOut', 'animate__bounceOutDown', 'animate__bounceOutLeft', 'animate__bounceOutRight', 'animate__fadeIn', 'animate__fadeInDown', 'animate__fadeInDownBig', 'animate__fadeInLeft', 'animate__fadeInLeftBig', 'animate__fadeInRight', 'animate__fadeInRightBig', 'animate__fadeInUp', 'animate__fadeInUpBig', 'animate__fadeInTopLeft', 'animate__fadeInTopRight', 'animate__fadeInBottomLeft', 'animate__fadeInBottomRight', 'animate__fadeOut', 'animate__fadeOutDown', 'animate__fadeOutDownBig', 'animate__fadeOutLeft', 'animate__fadeOutLeftBig', 'animate__fadeOutRight', 'animate__fadeOutRightBig', 'animate__fadeOutUp', 'animate__fadeOutUpBig', 'animate__fadeOutTopLeft', 'animate__fadeOutTopRight', 'animate__fadeOutBottomRight', 'animate__fadeOutBottomLeft', 'animate__flip', 'animate__flipInX', 'animate__flipInY', 'animate__flipOutX', 'animate__flipOutY', 'animate__lightSpeedInRight', 'animate__lightSpeedInLeft', 'animate__lightSpeedOutRight', 'animate__lightSpeedOutLeft', 'animate__rotateIn', 'animate__rotateInDownLeft', 'animate__rotateInDownRight', 'animate__rotateInUpLeft', 'animate__rotateInUpRight', 'animate__rotateOut', 'animate__rotateOutDownLeft', 'animate__rotateOutDownRight', 'animate__rotateOutUpLeft', 'animate__rotateOutUpRight'].map(m => ({ id: m, value: m }))

export const GlEasing = [{
  id: 'ease',
  value: '中间加速，结束时减速',
}, {
  id: 'linear',
  value: '匀速',
}, {
  id: 'ease-in',
  value: '逐渐加速',
}, {
  id: 'ease-out',
  value: '逐渐减速',
}, {
  id: 'ease-in-out',
  value: '先加速再减速',
}]

export const GlFitVideoSizes = [
  { id: 'auto', value: '默认' },
  { id: 'fixed', value: '保持容器宽/高' },
  { id: 'fixWidth', value: '依据宽度' },
  { id: 'fixHeight', value: '依据高度' },
]

export const GlVideoFillMode = [
  { id: 'auto', value: '默认' },
  { id: 'fill', value: '拉伸填充' },
  { id: 'fillWidth', value: '依据宽度' },
  { id: 'fillHeight', value: '依据高度' },
  { id: 'contain', value: '保持宽高比' },
]

export const GlImportances = [
  { id: 'auto', value: '默认' },
  { id: 'high', value: '高' },
  { id: 'low', value: '低' },
]

export const GlAreaOrigins = [
  { id: 'auto', value: '默认' },
  { id: 'start', value: '填充坐标轴底部' },
  { id: 'end', value: '填充坐标轴顶部' },
  { id: 'number', value: '填充指定数值到数据间的区域' },
]

export const GlLabelPosition = [
  { id: 'outside', value: '扇区外侧' },
  { id: 'inside', value: '扇区内部' },
  { id: 'center', value: '饼图中心' },
]

export const GlLabelOverflow = [
  { id: 'truncate', value: '截断' },
  { id: 'break', value: '换行' },
  { id: 'breakAll', value: '换行,强制单词内换行' },
]

export const GlAlignTo = [
  { id: 'none', value: '默认' },
  { id: 'labelLine', value: '末端对齐' },
  { id: 'edge', value: '文字对齐' },
]

export const GlTitleAlignV = [
  { id: 'auto', value: '自动' },
  { id: 'left', value: '左对齐' },
  { id: 'right', value: '右对齐' },
  { id: 'center', value: '居中' },
]

export const GlTitleAlignL = [
  { id: 'auto', value: '自动' },
  { id: 'top', value: '上对齐' },
  { id: 'bottom', value: '下对齐' },
  { id: 'middle', value: '居中' },
]

export const GlCssLayoutlr = [
  { id: 'icon-left', value: '在左' },
  { id: 'icon-right', value: '在右' },
  { id: 'icon-top', value: '在上' },
  { id: 'icon-bottom', value: '在下' },
]

export const GlCssLayoutLabel = [
  { id: 'label-top', value: '在上' },
  { id: 'label-bottom', value: '在下' },
]


// 默认为"slide"（普通位移切换），还可设置为"fade"（淡入）、"cube"（方块）、"coverflow"（3d流）、"flip"（3d翻转）、"cards"(卡片式)、"creative"（创意性）

export const GlWaperEffects = [
  { id: 'slide', value: '默认' },
  { id: 'fade', value: '淡入' },
  { id: 'cube', value: '方块' },
  { id: 'coverflow', value: '3d流' },
  { id: 'flip', value: '3d翻转' },
  { id: 'cards', value: '卡片式' },
  { id: 'creative', value: '创意性' },
]

// barVer  line area  pie  bar
export const GlNumberCartTypes = [
  { id: 'line', value: '折线图' },
  { id: 'area', value: '面积图' },
  { id: 'bar', value: '柱状图' },
]

export const GlTopShowTypes = [
  { id: 'default', value: '默认' },
  { id: 'line', value: '类型一' },
  { id: 'area', value: '类型二' },
  { id: 'pie', value: '类型三' },
  { id: 'bar', value: '类型四' },
]

export const GlShadowQualitys = [
  { id: 'low', value: '低' },
  { id: 'medium', value: '默认' },
  { id: 'high', value: '高' },
  { id: 'ultra', value: '超高' },
]

export const GlNavplacements = [
  { id: 'top-start', value: 'top-start' },
  { id: 'top', value: 'top' },
  { id: 'top-end', value: 'top-end' },
  { id: 'right-start', value: 'right-start' },
  { id: 'right', value: 'right' },
  { id: 'right-end', value: 'right-end' },
  { id: 'bottom-start', value: 'bottom-start' },
  { id: 'bottom', value: 'bottom' },
  { id: 'bottom-end', value: 'bottom-end' },
  { id: 'left-start', value: 'left-start' },
  { id: 'left', value: 'left' },
  { id: 'left-end', value: 'left-end' },
]

export const GlNavdateTypes = [
  { id: 'date', value: '日期' },
  { id: 'datetime', value: '日期时间' },
  { id: 'daterange', value: '日期区间' },
  { id: 'datetimerange', value: '日期时间区间' },
  { id: 'month', value: '月选择器' },
  { id: 'monthrange', value: '月选择区间' },
  { id: 'year', value: '年选择器' },
]

export const GlOperators = [{
  id: '==',
  value: '等于',
}, {
  id: '>',
  value: '大于',
}, {
  id: '<',
  value: '小于',
}, {
  id: '>=',
  value: '大于等于',
}, {
  id: '<=',
  value: '小于等于',
}, {
  id: '!=',
  value: '不等于',
}, {
  id: 'includes',
  value: '包含',
}]

export const GlScatters = [{
  id: 'scatter',
  value: '静态点',
}, {
  id: 'effectScatter',
  value: '动态点',
}]

export const GlScatterFills = [{
  id: 'fill',
  value: 'fill',
}, {
  id: 'stroke',
  value: 'stroke',
}]

export const GlHighLayouts = [
  { id: 'horizontal', value: '水平' },
  { id: 'vertical', value: '垂直' },
  { id: 'proximate', value: '接近' },
]

export const GlHigtShapeTypes = [
  { id: 'fixedOffset', value: '圆形' },
  { id: 'straight', value: '矩形' },
  { id: 'crookedLine', value: '圆角矩形' },
]

export const GlHigtAxixAlign = [
  { id: 'low', value: '左侧' },
  { id: 'middle', value: '剧中' },
  { id: 'high', value: '右侧' },
]

export const GlHigtIcons = [
  { id: 'auto', value: '自适应' },
  { id: 'circle', value: '圆形' },
  { id: 'square', value: '矩形' },
  { id: 'triangle', value: '三角形' },
  { id: 'diamond', value: '菱形' },
  { id: 'triangle-down', value: '倒三角' },
]
