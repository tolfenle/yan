<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:02
 * @LastEditTime : 2023-12-26 18:19:12
-->
<script lang="ts">
import { defineComponent, h, PropType, resolveComponent } from 'vue'
import { ComType, DatavComponent } from '@/components/_models/datav-component'
import { DatavGroup } from '@/components/_internal/group'
import DatavItem from './datav-item.vue'
import DatavLayer from './datav-layer.vue'

export default defineComponent({
  name: 'DatavTransform',
  props: {
    com: {
      type: Object as PropType<DatavComponent>,
      required: true,
    },
  },
  setup() {
    const create = (com: DatavComponent) => {
      if (com.type === ComType.com) {
        return h(DatavItem, { com }, {
          default: () => h(resolveComponent(com.name), { com }),
        })
      }
      if ((com as any).isDialog) {
        return ''
      }

      return h(DatavLayer, {
        com: com as DatavGroup,
      }, {
        default: ({ data }) => create(data),
      })
    }

    return {
      create,
    }
  },
  render() {
    return this.create(this.$props.com)
  },
})
</script>
