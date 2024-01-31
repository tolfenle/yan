<!--
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-05-05 09:10:59
 * @LastEditTime: 2022-07-13 17:57:20
-->
<template>
  <div class="my-data">
    <div class="project-manage">
      <div class="manage-title">
        <div class="my-project project-group">
          <span class="new-project">
            <n-icon class="btn-add-icon">
              <IconMyData />
            </n-icon>
            我的数据
          </span>
        </div>
      </div>
      <div class="manage-main">
        <ul>
          <li
            v-for="da in dataList"
            :key="da.id"
            :class="{ 'is-select': da.id === selected }"
            @click.stop="handClickData(da)"
          >
            <i :class="da.icon"></i>
            {{ da.name }}
          </li>
        </ul>
      </div>
    </div>
    <component :is="selectedCom" />
  </div>
</template>

<script lang='ts'>
import { defineAsyncComponent, defineComponent, onMounted, ref } from 'vue'
import { NIcon } from 'naive-ui'
import { IconMyData } from '@/icons'

export default defineComponent({
  name: 'MyData',
  components: {
    IconMyData,
    NIcon,
    DataFilter: defineAsyncComponent(() => import('./data-filter.vue')),
    DataSourse: defineAsyncComponent(() => import('./data-sourse.vue')),
  },
  setup() {
    // const nMessage = useMessage()

    const dataList = [{
      id: 1,
      name: '数据源管理',
      icon: 'dv dv-shujuku',
      com: 'DataSourse',
    }, {
      id: 2,
      name: '数据集管理',
      icon: 'dv dv-shujujicheng',
      com: 'DataSet',
    }, {
      id: 3,
      name: '过滤器管理',
      icon: 'dv dv-daimaji',
      com: 'DataFilter',
    }]

    const selectedCom = ref('DataSourse')
    const selected = ref(1)
    const handClickData = (da: any) => {
      selected.value = da.id
      selectedCom.value = da.com
    }

    onMounted(() => {
    })

    return {
      dataList,
      selected,
      selectedCom,
      handClickData,
    }
  },
})
</script>

<style lang="scss" scoped>
.my-data {
  display: flex;
  height: 100%;

  .manage-title {
    .project-group {
      padding-left: 8px;
      height: 56px;
      border-bottom: 1px solid #27343e;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 30px;

      .new-project {
        display: flex;
        align-items: center;
        font-size: 16px;

        i {
          margin-right: 4px;
        }
      }
    }

    .btn-add-icon {
      font-size: 14px;
      cursor: pointer;

      &:hover {
        color: var(--datav-main-color);
      }
    }
  }

  .project-manage {
    min-width: 240px;
    max-width: 240px;
    color: #fff;
    position: sticky;
    font-size: 14px;
    overflow-y: auto;
    background-color: var(--datav-home-nav-bg);
    padding: 0 8px;
    top: 0;
    height: calc(100vh - 64px);
    // border-radius: 6px;

    .manage-main {
      display: flex;
      flex-direction: column;
      font-size: 12px;

      &.draging {
        background: rgb(36 127 255 / 30%);
      }

      .manage-title {
        .project-group {
          padding-left: 8px;
          height: 56px;
          border-bottom: 1px solid #27343e;

          .new-project {
            display: flex;
            align-items: center;
            font-size: 16px;

            i {
              margin-right: 4px;
            }
          }
        }

        .btn-add-icon {
          font-size: 14px;
          cursor: pointer;

          &:hover {
            color: var(--datav-main-color);
          }
        }
      }

      .project-ungrouped {
        color: var(--datav-font-color);
      }

      .project-all {
        padding-left: 50px;
        transition: color 0.2s;
        cursor: pointer;

        &:hover {
          color: var(--datav-main-color);
        }
      }

      .project-checked-color {
        background-repeat: round;

        &:hover {
          color: #fff !important;
        }

        .project-name {
          color: #fff !important;
        }
      }

      .project-num {
        user-select: none;
        color: var(--datav-font-color);
      }

      .group-btns {
        display: none;
        color: var(--datav-main-color);

        i + i {
          margin-left: 10px;
        }
      }

      .main-project {
        position: relative;
        height: 36px;
        padding: 0 30px 0 50px;
        display: flex;
        font-size: 12px;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: color 0.2s;

        .project-name {
          width: 100px;
          font-size: 14px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          pointer-events: none;
        }

        &:hover {
          .project-name {
            color: var(--datav-main-color);
          }
        }

        &.drag-enter {
          background: var(--datav-body-bg);
        }
      }

      .group-project {
        &:hover {
          .project-num {
            display: none;
          }

          .group-btns {
            display: inline-block;
          }
        }
      }
    }
  }

  ul {
    li {
      color: var(--datav-font-color);
      font-size: var(--datav-font-size-base);
      padding-left: 30px;
      padding-top: 10px;
      padding-bottom: 10px;
      margin: 5px 0;
      transition: all 0.25s linear;
      cursor: pointer;

      &:hover {
        color: var(--datav-gui-hover-color);
      }

      &.is-select {
        background-image: url(@/assets/img/data-li-bg.png);
        background-repeat: round;
        color: var(--datav-gui-font-color-1);
      }

      i {
        margin-right: 8px;
      }
    }
  }
}
</style>
