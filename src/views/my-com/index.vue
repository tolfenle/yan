<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:02
 * @LastEditTime : 2024-01-17 15:55:14
-->
<template>
  <div v-if="collectComs.length" class="coll-com">
    <div v-for="item in collectComs" :key="item.id">
      <img v-lazy="item.img">
      <div class="title">
        {{ item.alias }}
        <div class="collect-com-edit">
          <span title="编辑">
            <IconEdit />
          </span>
          <span title="删除收藏">
            <IconDelete @click="handDeleteCollect(item)" />
          </span>
        </div>
      </div>
    </div>
  </div>
  <n-empty v-else description="我的组件-暂无收藏" class="--empty-ptb-40">
    <template #icon>
      <n-icon :size="40" color="#909399">
        <IconMyCom />
      </n-icon>
    </template>
  </n-empty>
</template>

<script lang='ts'>
import { defineComponent, onMounted } from 'vue'
import { useDialog, useMessage } from 'naive-ui'
import { IconMyCom, IconEdit, IconDelete } from '@/icons'
import { useComStore } from '@/store/com'
import { collectApi } from '@/api/coms'

export default defineComponent({
  name: 'MyCom',
  components: {
    IconMyCom,
    IconEdit,
    IconDelete,
  },
  setup() {
    const nMessage = useMessage()
    const comStore = useComStore()
    comStore.requestCollectComs()
    const collectComs = computed(() => comStore.collectComs.filter(m => !m.isPublic))

    const nDialog = useDialog()
    const handDeleteCollect = item => {
      const d = nDialog.create({
        content: `删除后无法恢复，确认删除？`,
        negativeText: '取消',
        positiveText: '确定',
        showIcon: false,
        onPositiveClick: async () => {
          d.loading = true
          try {
            const res = await collectApi.deleteCollect(item.id)
            if (res.code === 1000) comStore.requestCollectComs()
            else
              nMessage.warning(res.message)
          } catch (error) {
            nMessage.error(error.message)
          }
        },
      })
    }

    return {
      collectComs,
      handDeleteCollect,
    }
  },
})
</script>

<style scoped lang="scss">
.coll-com {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 295px));
  grid-gap: 18px;
  padding: 8px 30px;

  & > div {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 11px 2px rgb(0 0 0 / 13%) inset;
    transition: all 0.35s ease;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 200px;

    &:hover {
      box-shadow: 0 0 110px 200px rgb(0 0 0 / 69%) inset;

      .title {
        background: rgb(47 46 46);
      }

      .icon {
        height: 32px !important;
        display: inline-block;
      }

      img {
        opacity: 0.75;
      }
    }

    img {
      width: 100%;
      height: 100%;
      position: relative;
      transition: opacity 0.25s;
    }

    .title {
      width: 100%;
      height: 35px;
      position: absolute;
      bottom: 0;
      background: rgb(107 105 105 / 31%);
      color: #d1d1d1;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
      transition: background 0.25s;

      .collect-com-edit {
        z-index: 9;

        span:nth-child(2) .icon {
          fill: var(--el-color-danger-light-3);

          &:hover {
            fill: var(--el-color-danger);
          }
        }

        .icon {
          width: 38px;
          height: 0;
          padding-left: 16px;
          border-radius: 4px;
          cursor: pointer;
          fill: var(--el-color-primary-light-3);
          transition: all 0.35s ease-in-out;

          &:hover {
            fill: var(--el-color-primary);
          }
        }
      }
    }
  }
}
</style>
