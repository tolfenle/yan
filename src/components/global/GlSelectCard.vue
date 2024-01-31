<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-04 11:12:20
 * @LastEditTime : 2023-12-28 11:39:38
-->
<script setup lang="ts" name="GlSelectCard">
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  data: {
    type: Array<{ id: string; value: string; }>,
    default: ()=> [],
  },
})

const { setUrl } = useEnvUrl()

const activeId = toRef(props, 'modelValue')
const emit = defineEmits(['update:modelValue'])
const handActived = id => {
  emit('update:modelValue', id)
}
</script>

<template>
  <div class="gl-select-card">
    <template v-for="item in data" :key="item.id">
      <div
        v-bind="$attrs"
        class="card-item"
        :class="{'is-active': activeId === item.id}"
        @click="handActived(item.id)"
      >
        <img :src="setUrl(item.value)">
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.gl-select-card {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .card-item {
    width: 70px;
    height: 70px;
    padding: 3px;
    border: 1px solid transparent;
    transition: border-color 0.2s ease;

    img {
      width: 100%;
      height: 100%;
    }

    &:hover {
      border-color: var(--el-color-primary-light-5);
    }

    &.is-active {
      border-color: var(--el-color-primary);
    }
  }
}
</style>
