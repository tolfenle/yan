import * as THREE from 'three'
import { Component } from '../../libs/mini3d'
/**
 * 渐变上升shader
 */
export class CircleShader extends Component {
  /**
   *
   * @param {*} base this
   */
  constructor(base, config = {}) {
    super(base)

    this.config = Object.assign(
      {
        radius: 3.0, // 环面的半径
        tube: 0.4, // 管道的半径
        radialSegments: 8, //  管道横截面的分段数
        tubularSegments: 6, // 管道的分段数
        arc: Math.PI * 2, // 圆环的圆心角（单位是弧度）
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
        color: { value: this.config.color },
        radius: { value: this.config.radius },
        tube: { value: this.config.tube }, // 红色
        radialSegments: { value: this.config.radialSegments },
        arc: { value: this.config.arc }, // 蓝色
      }
      shader.vertexShader = `varying vec3 vPosition;
        void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`

      shader.fragmentShader = `
        uniform vec3 color;
        uniform float radius;
        uniform float arc;
        varying vec3 vPosition;

        void main() {
          float x = (vPosition.z + uHeight * 0.2) / uHeight;
          vec3 color = mix(color, vPosition.z, x);
          gl_FragColor = vec4(color, 1.0);
        }
    `
    }

    var clock = new THREE.Clock()

    this.base.animator.add(() => {

      if (this.shader) {
        let deltaTime = clock.getDelta()
        this.shader.uniforms.uTime.value += deltaTime
      }
    })

  }
  getMaterial() {
    return this.config.material
  }
}
