/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-20 09:40:09
 * @LastEditTime : 2023-12-21 11:26:56
 */
import * as THREE from 'three'
import outputFragment from './output_fragment.glsl.js'
import { Component } from '../../libs/mini3d'
/**
 * 四周扩散动画shader
 */
export class SpreadShader extends Component {
  /**
   *
   * @param {*} base this
   */
  constructor(base, config = {}) {
    super(base)
    this.config = Object.assign(
      {
        radius: 1.0, // 半径
        center: new THREE.Vector3(0, 0, 0), //中心点
        width: 1.0, // 光环的粗细
        maxTime: 10.0, // 最大时间
        speed: 0.01,
        color: new THREE.Color('#ffffff'), // 颜色
        material: new THREE.MeshBasicMaterial({
          color: 0x07152b,
          transparent: true,
          opacity: 1,
        }),
      },
      config,
    )
    this.create()
  }
  create() {
    this.config.material.onBeforeCompile = shader => {
      this.shader = shader

      shader.uniforms = {
        ...shader.uniforms,
        uTime: { value: 0.0 },
        uWidth: { value: this.config.width.toFixed(2) },
        uRadius: { value: this.config.radius.toFixed(2) },
        uCenter: { value: this.config.center },
        uColor: { value: this.config.color },
        uSpeed: { value: this.config.speed.toFixed(2) },
      }
      shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        `
          varying vec3 vPosition;
          void main() {
            vPosition = position;
        `,
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `
          varying vec3 vPosition;
          uniform float uTime;
          uniform vec3 uColor;
          uniform float uSpeed;
          uniform float uRadius;
          uniform vec3 uCenter;
          uniform float uWidth;
          void main() {
        `,
      )
      shader.fragmentShader = shader.fragmentShader.replace('}', `${outputFragment}}`)
    }

    var clock = new THREE.Clock()

    this.base.animator.add(() => {

      if (this.shader) {
        let deltaTime = clock.getDelta()
        this.shader.uniforms.uTime.value += deltaTime
        this.shader.uniforms.opacity.value -= 0.1


        if (this.shader.uniforms.uTime.value >= this.config.maxTime) {
          this.shader.uniforms.uTime.value = 0.0
        }
        if (this.shader.uniforms.opacity.value <= 0.4) {
          this.shader.uniforms.opacity.value = 1
        }
      }
    })
  }
  getMaterial() {
    return this.config.material
  }
}
