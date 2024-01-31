
<script lang="ts" setup name="SystemTesting">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'

const mount = ref(null)

onMounted(() => {
  var scene = new THREE.Scene()
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  var renderer = new THREE.WebGLRenderer()

  renderer.setSize(window.innerWidth, window.innerHeight)
  mount.value.appendChild(renderer.domElement)

  // Pyramid geometry
  var geometry = new THREE.ConeGeometry(5, 20, 4)

  // Layers
  var layers = 5
  var layerDistance = 5

  for (var i = layers; i > 0; i--) {
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    var pyramid = new THREE.Mesh(geometry, material)
    pyramid.position.y += (layers - i) * layerDistance
    scene.add(pyramid)
  }

  camera.position.z = 30

  var animate = function () {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  animate()
})

</script>

<template>
  <div class="system-testing">
    <div ref="mount"></div>
  </div>
</template>

<style lang="scss" scoped>
.system-testing {
  width: 100%;
  height: 100%;
}

.pyramid-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
