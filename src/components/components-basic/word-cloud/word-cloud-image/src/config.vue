<!--
 * @Author: fj
 * @LastEditors: fj
 * @description: 
 * @updateInfo: 本次更新内容：
 * @Date: 2023-02-13 15:19:50
 * @LastEditTime: 2023-04-27 10:58:57
-->
<template>
  <div>
    <g-field :level="2" label="背景图片">
      <g-upload-image v-model="config.imageMask" />
    </g-field>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from "vue";
import WordCloudImage from "./word-cloud-image";
export default defineComponent({
  name: `VWordCloudImage`,
  props: {
    com: {
      type: Object as PropType<WordCloudImage>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, "config");

    return {
      config,
    };
  },
});
</script>