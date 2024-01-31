/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-26 14:17:46
 * @LastEditTime : 2024-01-08 09:55:15
 */
import * as THREE from 'three'

export const setMapEdgeLight = (points, config = { lightSpeed: 3 }) => {
  const positions = new Float32Array(points)  // 数组深度遍历扁平化
  const lightOpacityGeometry = new THREE.BufferGeometry()
  // 设置顶点
  lightOpacityGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  // 设置 粒子透明度为 0
  const lightOpacitys = new Float32Array(positions.length).map(() => 0)
  lightOpacityGeometry.setAttribute('aOpacity', new THREE.BufferAttribute(lightOpacitys, 1))

  // 顶点着色器
  const vertexShader = `
          attribute float aOpacity;
          uniform float uSize;
          varying float vOpacity;

          void main(){
              gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);
              gl_PointSize = uSize;

              vOpacity=aOpacity;
          }
          `
  // 片段着色器
  const fragmentShader = `
          varying float vOpacity;
          uniform vec3 uColor;

          float invert(float n){
              return 1.-n;
          }

          void main(){
            if(vOpacity <=0.2){
                discard;
            }
            vec2 uv=vec2(gl_PointCoord.x,invert(gl_PointCoord.y));
            vec2 cUv=2.*uv-1.;
            vec4 color=vec4(1./length(cUv));
            color*=vOpacity;
            color.rgb*=uColor;
            gl_FragColor=color;
          }
          `

  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true, // 设置透明
    // blending: THREE.AdditiveBlending,
    uniforms: {
      uSize: {
        value: 5.0,
      },
      uColor: {
        value: new THREE.Color('#ffffff'),  // 光点颜色 fffb85
      },
    },
  })
  // material.blending = THREE.AdditiveBlending;
  const opacityPointsMesh = new THREE.Points(lightOpacityGeometry, material)

  let lightCurrentPos = 0
  const len = positions.length

  const mapLineAnimitor = () => {
    if (lightCurrentPos > len) {
      lightCurrentPos = 0
    }
    lightCurrentPos += config.lightSpeed
    for (let i = 0; i < config.lightSpeed; i++){
      lightOpacitys[(lightCurrentPos - i) % len ] = 0
    }

    for (let i = 0; i < 100; i++) {
      lightOpacitys[(lightCurrentPos + i) % len] = i / 50 > 2 ? 2 : i / 50
    }

    if (lightOpacityGeometry) {
      lightOpacityGeometry.attributes.aOpacity.needsUpdate = true
    }
  }

  return {
    opacityPointsMesh,
    mapLineAnimitor,
  }
}
