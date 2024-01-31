<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-04 11:12:20
 * @LastEditTime : 2024-01-11 10:04:09
-->
<script setup lang="ts" name="GlIconPicker">
import { NPopover, NButton } from 'naive-ui'
import iconJson from '../../assets/icon/iconfont.json'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
})

const activeId = toRef(props, 'modelValue')
const emit = defineEmits(['update:modelValue'])
const handActived = id => {
  emit('update:modelValue', id)
}
</script>

<template>
  <n-popover
    placement="left"
    trigger="click"
    class="gl-icon-picker_1aw1"
  >
    <template #trigger>
      <div class="icon-picker-btn">
        <n-button>
          <i :class="`ik-118-datav ik-118-datav-${activeId}`"></i>
          选择图标
        </n-button>
        <span v-if="label" class="g-input__caption">{{ label }}</span>
      </div>
    </template>
    <template v-for="item in iconJson.glyphs" :key="item.icon_id">
      <i :class="`ik-118-datav ik-118-datav-${item.font_class} ${activeId === item.font_class ? 'is-active' : ''}`" @click="handActived(item.font_class)"></i>
    </template>
  </n-popover>
</template>

<style lang="scss">
.icon-picker-btn {
  // margin-top: -5px;
  --n-height: 30px;

  .n-button {
    --n-height: 30px;

    padding: 0 6px;

    .ik-118-datav {
      margin-right: 6px;
      width: 20px;
    }
  }
}

.gl-icon-picker_1aw1 {
  .n-popover__content {
    max-width: 240px;

    .ik-118-datav {
      padding: 6px;
      margin: 3px;
      cursor: pointer;
      width: 40px;
      height: 100%;
      display: inline-block;

      &:hover {
        color: var(--el-color-primary);
      }

      &.is-active {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
