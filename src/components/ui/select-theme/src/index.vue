<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-10 18:32:30
 * @LastEditTime : 2024-02-06 12:14:12
-->
<template>
  <n-popover trigger="click" placement="bottom" :show-allow="false">
    <template #trigger>
      <div class="g-datav-theme-tag no-padding">
        <span v-for="theme in colorValue" :key="theme" :style="{backgroundColor: theme}"></span>
      </div>
    </template>
    <div
      v-for="(item,index) in themeList"
      :key="index"
      class="g-datav-theme-tag"
      @click="handSelectTheme(item)"
    >
      <span v-for="theme in item" :key="theme" :style="{backgroundColor: theme}"></span>
    </div>
  </n-popover>
  <div class="edit-picker-color">
    <div v-for="(item,index) in colorValue" :key="index" class="color-item">
      <g-color-picker v-model="colorValue[index]" is-chart />
      <IconClose @click.stop="handDeleteColor(index)" />
    </div>
    <div class="color-add">
      <IconPlus @click="handAddColor()" />
    </div>
  </div>
</template>

<script lang='ts' setup name="GlSelectTheme">
import { NPopover } from 'naive-ui'
import { UPDATE_MODEL_EVENT } from '@/utils/constants'
import { IconClose, IconPlus } from '@/icons'
import { cloneDeep } from 'lodash-es'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  inline: {
    type: [Boolean, String],
    default: false,
  },
  isChart: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits([UPDATE_MODEL_EVENT])

const themeList = cloneDeep(glThemeList)

const colorValue = defineModel({
  type: Array<string>,
  default: ()=> [],
})

colorValue.value = colorValue.value.length ? colorValue.value : themeList[0]

const handSelectTheme = item => {
  colorValue.value = item
}

const handDeleteColor = index => {
  colorValue.value.splice(index, 1)
}

const handAddColor = () => {
  colorValue.value.push('#fff')
}


</script>

<style lang="scss">
.n-popover {
  --n-color: #262626 !important;
  --n-border-radius: 8px !important;
  --n-padding: 8px !important;
}

.edit-theme {
  display: inline-block;

  svg {
    height: 15px;
    width: 22px;
    top: -4px;
    position: relative;
    right: -6px;
    fill: #b1b1b1;

    &:hover {
      fill: var(--datav-main-color);
    }
  }
}

.edit-picker-color {
  display: grid;
  width: 100%;
  margin-top: 4px;
  grid-template-columns: repeat(auto-fill, minmax(30px, 30px));

  .color-item {
    position: relative;
    display: flex;
    flex: 1;

    svg {
      position: absolute;
      width: 11px;
      bottom: 19px;
      right: -2px;
      height: 12px;
      fill: #fff;
      cursor: pointer;

      &:hover {
        fill: var(--datav-warn-color);
      }
    }
  }

  .color-add {
    align-items: center;
    justify-content: center;
    display: flex;

    svg {
      width: 18px;
      height: 18px;
      fill: var(--datav-main-color);
      cursor: pointer;

      &:hover {
        fill: var(--datav-main-hover-color);
      }
    }
  }
}

.g-datav-theme-tag {
  display: flex;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.35s;
  width: 100%;

  &:hover {
    background-color: #545454;
  }

  span {
    width: 15px;
    height: 15px;
    display: inline-block;
    flex: 1;
  }

  &.no-padding {
    background-color: #262c33;
  }
}
</style>
