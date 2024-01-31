/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-20 09:40:47
 * @LastEditTime : 2023-12-25 13:51:02
 */
import TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'
import { InteractionManager } from '../libs/three.interactive'
import emitter from '../libs/emitter'
import { Animator, Resizer } from '../components'
class Base {
  constructor(el = '#canvas', defConfig = {}) {
    this.defConfig = defConfig
    // 容器
    this.container = document.querySelector(el)
    this.width = this.container.offsetWidth || window.innerWidth
    this.height = this.container.offsetHeight || window.innerHeight
    // 场景
    this.scene = new THREE.Scene()
    this.camera = this.createCamera()
    this.renderer = this.createRenderer()
    this.animator = new Animator(this)
    this.resizer = new Resizer(this)
    this.emitter = emitter
    this.interactionManager = new InteractionManager(this.renderer, this.camera, this.renderer.domElement)
    this.animator.add(() => this.interactionManager.update())
    this.renderer.render(this.scene, this.camera)
    this.addEventListener()
  }
  createCamera() {
    let { width, height } = this
    const { fov, aspect } = this.defConfig.global.camera
    let rate = width / height
    let camera = new THREE.PerspectiveCamera(fov, rate, aspect.near, aspect.far)
    camera.zoom = this.defConfig.global.scale
    // camera.up.set(0, 0, 1)
    camera.position.set(100, 100, 100)
    camera.lookAt(0, 0, 0)
    return camera
  }
  createRenderer() {
    let { width, height } = this
    let renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
      alpha: true,
    })

    renderer.setPixelRatio(window.devicePixelRatio)

    renderer.setSize(width, height)

    renderer.setClearColor(0x010101, 1)//设施三维空间背景颜色

    this.container.appendChild(renderer.domElement)

    return renderer
  }
  addEventListener() {
    this.resizer.addListenerResize()
  }
  removeEventListener() {
    this.resizer.removeListenerResize()
  }
  start() {
    this.animator.add(() => TWEEN.update())
    this.animator.update()
  }
  stop() {
    TWEEN.removeAll()
    this.animator.stop()
    this.interactionManager.dispose()
  }
}

export { Base }
