[     ](https://datav.ikingtech.com/)![](https://datav.ikingtech.com/logo.png#height=120&id=nSxSU&originHeight=286&originWidth=286&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=120)[   ](https://datav.ikingtech.com/)
### 金合可视化平台
#### 拖拽式可视化大屏低代码平台
[官网](http://www.ikingtech.com/)
|
[文档](https://datavdoc.ikingtech.com)
|
[在线演示](https://datav.ikingtech.com)
|
[Node服务端](https://gitee.com/ikingtech/iking-datav-server)
|
[提交Bug](https://gitee.com/ikingtech/iking-datav/issues)
演示环境账号：iking 密码：iking.com  演示环境账号：iking 密码：iking.com

## 简介

金合可视化平台是一个通过拖拽配置生成可视化大屏的低代码平台。它包含项目管理、应用管理、数据源管理、过滤器管理、收藏、模板市场、应用独立部署等功能。平台提供了丰富的图表组件、地图组件、媒体组件、动画组件和常用的大屏页面组件，支持加载三维模型，支持事件配置。用户可以通过简单的鼠标拖拽组件放入页面容器，配置组件样式，组件数据。即可完成一个大屏页面的开发。

平台包含3个部分:

- 金合可视化平台
- 金合可视化平台Midwayjs服务端
- 金合可视化平台后台管理平台(正在整理)

## 技术栈

💪 Vue 3.0+
⚡ Vite 3.0+
🍍 Pinia 2.0+
🔥 TypeScript 4.0+
🔥 ECharts 5.0+
🔥 mars3d 3.6+
🔥 Threejs 0.159.0

## 开发计划
- [x] 应用独立部署
- [ ] 完善的开发文档
- [ ] 应用导入/导出
- [ ] 蓝图编辑器(简单、高效、可视化的事件配置方式)
- [ ] 二维模式更多样式地图组件
- [ ] 三维模式微服务化(三维配置项太多，在目前的模式下配置不够灵活，将采用微服务的方式和平台融合，微服务目前考虑使用[京东MicroApp]([https://micro-zoe.github.io/micro-app/](https://micro-zoe.github.io/micro-app/))，将提供模型在线编辑/预览、点位标记(点、线面、墙体、管道、模型等在线标注)、路线规划等
### 平台截图
![](https://datav.ikingtech.com/图片1.png#id=hKx7Z&originHeight=908&originWidth=1911&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

![](https://datav.ikingtech.com/图片2.png#id=Z4Guc&originHeight=907&originWidth=1916&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

![](https://datav.ikingtech.com/图片3.png#id=jzj2K&originHeight=926&originWidth=1917&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 
关于我们
金合可视化平台是陕西金合信息科技股份有限公司在内部孵化的技术开发平台，致力于快速搭建可视化项目，达到在平台内完成”产品设计页面->开发调式接口->部署上线“的目标，减少项目在可视化大屏上消耗的工时。
目前金合可视化平台已经支持交付了内外部40+项目，当前版本为首个开源版本，我们迫切的想听到您的改进意见和功能建议，希望更多的开发者可以参与改进平台，助力更多开发者和企业。
## 贡献
社区力量是开源项目持续发展的唯一动力来源，我们真诚的希望与您一起共建这片学习、交流、成长并且获益的“小宇宙”，您的每一个建议、每一次PR我们都**倍感珍惜**。
如果您对本项目有任何的想法，请您务必留下您的宝贵意见和建议，当然 Talk is cheap, show me the code，我们更欢迎您按照如下方式扩展本项目的功能！

1. Fork本仓库。
2. 创建您的功能分支 (git checkout -b feature/awsome-feature)。
3. 提交您的修改并推送到分支上 (git commit -m 'Add some Awsome Feature' && git push origin feature/awsome-feature)。
4. 提交PR。
## License
本项目基于 Apache License Version 2.0 开源协议，请遵守以下规范。

- 不得将本项目应用于危害国家安全、荣誉和利益的行为，不能以任何形式用于非法行为。
- 使用源代码时请保留源文件中的版权声明和作者信息。
- 任何基于本项目二次开发而产生的一切法律纠纷和责任，均与作者无关。

更多信息请参考项目根目录下的LICENSE文件。
## 联系我们
### 技术交流群
![](https://datav.ikingtech.com/qywx.jpg#height=194&id=dllFA&originHeight=225&originWidth=232&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=200)
### 说明
可视化平台前端基于[pengxiaotian](https://gitee.com/pengxiaotian/datav-vue)开源框架，在框架基础上扩展了功能，添加了后台管理和服务端。
