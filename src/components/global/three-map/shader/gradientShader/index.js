import * as THREE from 'three'
import outputFragment from './output_fragment.glsl.js'
import { Component } from '../../libs/mini3d'
/**
 * 渐变上升shader
 */
export class GradientShader extends Component {
  /**
   *
   * @param {*} base this
   */
  constructor(base, config = {}) {
    super(base)

    this.config = Object.assign(
      {
        time: 1.0,
        height: 2.0, // 高度
        color1: new THREE.Color('#ffffff'), // 颜色
        color2: new THREE.Color('#05FF00'), // 颜色
        material: new THREE.MeshBasicMaterial({
          color: '#05FF00',
          transparent: true,
          side: THREE.DoubleSide,
          opacity: 1,
          depthTest: false,
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
        uTime: { value: this.config.time },
        uColorTop: { value: this.config.color1 }, // 红色
        uHeight: { value: this.config.height },
        uColorBottom: { value: this.config.color2 }, // 蓝色
      }
      shader.vertexShader = `varying vec3 vPosition;
        void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`

      shader.fragmentShader = `
        uniform vec3 uColorTop;
        uniform vec3 uColorBottom;
        uniform float uHeight;
        varying vec3 vPosition;

        void main() {
          float x = (vPosition.z + uHeight * 0.2) / uHeight;
          vec3 color = mix(uColorBottom, uColorTop, x);
          gl_FragColor = vec4(color, 1.0);
        }
    `
    }

    var clock = new THREE.Clock()

    this.base.animator.add(() => {

      if (this.shader) {
        let deltaTime = clock.getDelta()
        this.shader.uniforms.uTime.value += deltaTime

        if (this.shader.uniforms.uTime.value >= this.config.maxTime) {
          this.shader.uniforms.uTime.value = 0.0
        }
      }
    })

  }
  getMaterial() {
    return this.config.material
  }
}
