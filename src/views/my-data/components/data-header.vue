<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-10 18:33:08
 * @LastEditTime : 2024-01-17 15:58:14
-->
<script setup lang='ts'>

const props = defineProps({
  btnText: {
    type: String,
    default: '新建',
  },
  icon: {
    type: Boolean,
    default: true,
  },
  label: {
    type: String,
    default: '',
  },
  tip: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['handClick'])

const handClick = () => emits('handClick')

</script>

<template>
  <div class="header action">
    <button type="button" class="action-button" @click="handClick">
      <i v-if="props.icon" class="dv dv-jia"></i>
      {{ props.btnText }}
    </button>
    <div class="action-label">
      {{ props.label }}
      <span class="tip">{{ props.tip }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header.action {
  display: flex;
  padding: 0 10px;
  height: 35px;
  flex: 1;

  .action-button {
    color: var(--datav-gui-font-color-1);
    font-weight: 600;
    background-color: var(--datav-gui-primary-color);
    padding: 0 20px;
    transform: skewX(-30deg);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.25s linear;

    &:hover {
      background-color: var(--datav-gui-hover-color);
    }

    i {
      margin-right: 5px;
    }
  }

  .action-label {
    flex: 1;
    transform: skewX(-30deg);
    margin-left: 20px;
    color: var(--datav-gui-font-color-2);
    border-width: 1px;
    border-style: solid;
    border-color: #30658c transparent transparent #30658c;
    padding-left: 15px;
    line-height: 35px;
    margin-right: 8px;

    .tip {
      color: var(--datav-warn-color);
      padding-left: 15px;
    }
  }
}
</style>
