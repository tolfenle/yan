<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import mdKatex from '@traptitech/markdown-it-katex'
import mila from 'markdown-it-link-attributes'
import hljs from 'highlight.js'
import axios from 'axios'
import { chatPost, netPost } from '@/utils/request'
import { NInput } from 'naive-ui'

const props = defineProps({
  show: {
    type: Boolean,
    defualt: false,
  },
})

const emits = defineEmits(['code', 'close'])

const showChart = toRef(props, 'show')
const handOpenChat = () => {
  showChart.value = true
}

function highlightBlock(str: string, lang?: string) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">复制代码</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`
}

const mdi = new MarkdownIt({
  linkify: true,
  highlight(code: string, language: string) {
    const validLang = !!(language && hljs.getLanguage(language))
    if (validLang) {
      const lang = language ?? ''
      return highlightBlock(hljs.highlight(code, { language: lang }).value, lang)
    }
    return highlightBlock(hljs.highlightAuto(code).value, '')
  },
})
mdi.use(mila, { attrs: { target: '_blank', rel: 'noopener' } })
mdi.use(mdKatex, { blockClass: 'katexmath-block rounded-md p-[10px]', errorColor: ' #cc0000' })

const msgDoms = ref<HTMLElement[]>([])

const rebuildHTML = item => {
  try {
    // scrollToBottom(msgDoms.value)
  } catch (error) {

  }
  return mdi.render(item.content)
}

/**
 * @description: 是否为MarkDown文本
 * @param {*} str
 * @return {*}
 */
const isMarkdown = (str: string): boolean => {
  // 匹配行内代码块的正则表达式
  const inlineCodeRegex = /`[\s\S]*?`/g
  // 匹配行间代码块的正则表达式
  const multiLineCodeRegex = /^[ \t]*`[\s\S]*?`[ \t]*$/gm
  // 匹配标题的正则表达式
  const headingRegex = /^#+.*$/gm
  // 匹配列表项的正则表达式
  const listItemRegex = /^\s*\d+\.\s+(.*)/gm
  // 匹配链接的正则表达式
  const linkRegex = /\[([^\]]+)\]\((.*)\)/gm


  // 检查字符串中是否包含行内代码块、行间代码块、标题、列表项或链接
  return (
    !!inlineCodeRegex.exec(str) ||
    !!multiLineCodeRegex.exec(str) ||
    !!headingRegex.exec(str) ||
    !!listItemRegex.exec(str) ||
    !!linkRegex.exec(str)
  )
}

/**
 * @description: 是否为HTML文本
 * @param {*} input
 * @return {*}
 */
function isHtmlFragment(input: string): boolean {
  // 创建一个新的HTML文档 (这个document不会影响到当前页面的document)
  const doc = document.implementation.createHTMLDocument('')

  // 尝试将字符串作为HTML解析
  doc.body.innerHTML = input

  // 如果body里有子节点，说明这是一个HTML片段
  return doc.body.childNodes.length > 0
}

const formatHTML = (str: string) => {
  return str.replace(/\n/g, '<br/>')
}

const code = ref('')
const handConfime = () => {
  emits('code', code.value)
}
const handCancle = () => {
  emits('close')
}

const chatList = ref([])
const chatValue = ref('')
const chatLoading = ref(false)
const handChat = async () => {
  if (!chatValue.value)
    return
  chatLoading.value = true
  chatList.value.push({
    role: 'user',
    content: chatValue.value,
  })
  chatValue.value = ''
  const controller = new AbortController()
  const res = await netPost('/app/base/comm/chat/create/chart', {
    message: chatList.value,
  })
  if (res.code === 1000) {
    chatList.value.push({
      role: 'assistant',
      content: res.data.result,
    })
    if (res.data.result.includes('```javascript')) {
      const match = res.data.result.match(/```javascript(.*?)```/s)
      for (const i of match) {
        if (i.includes('option')) {
          const str = i
          code.value = str.replaceAll('```', '').replace('javascript', '')
          return
        }
      }

    }
  } else {
    chatList.value.push({
      role: 'assistant',
      content: '未响应',
    })
  }
  chatLoading.value = false

  // await chatPost({
  //   url: `${import.meta.env.VITE_APP_BASE_API}/app/base/comm/chat/create/chart`,
  //   method: 'POST',
  //   data: {
  //     message: chatList.value,
  //   },
  //   signal: controller.signal,
  //   onDownloadProgress: ({ event }) => {
  //     const xhr = event.target
  //     const { responseText } = xhr
  //     console.log('responseText: ', responseText)
  //     const lastIndex = responseText.lastIndexOf(
  //       '\n',
  //       responseText.length - 2,
  //     )
  //     console.log('responseText: ', responseText)
  //     let chunk = responseText
  //     if (lastIndex !== -1) chunk = responseText.substring(lastIndex)
  //     try {
  //       const data = JSON.parse(chunk)
  //       console.log('data: ', data)
  //     } catch (error) {
  //       console.log('error: ', error)
  //     }
  //   },
  // })

  // axios.post(`http://192.168.2.144:8001/app/base/comm/chat/create/chart`, {
  //   message: chatList.value,
  // },
  // {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // },
  // //   {
  // //   responseType: 'stream',
  // // }
  // )
  //   .then(response => {
  //     const stream = response
  //     console.log('response.data: ', response)
  //     // stream.on('data', dataChunk => {
  //     //   console.log('dataChunk: ',  dataChunk.toString())
  //     // // 处理数据块
  //     // })

  //     // stream.on('end', () => {
  //     //   console.log('end: ')
  //     // // 数据传输完成
  //     // })

  //     // stream.on('error', error => {
  //     //   console.log('error: ')
  //     // // 处理错误
  //     // })
  //   })
  //   .catch(error => {
  //   // 处理错误
  //   })
}

// handChat()

</script>

<template>
  <n-modal
    v-model:show="showChart"
    title="AI制图"
    preset="dialog"
    :show-icon="false"
    :mask-closable="false"
    class="datav-chat-editor-dialog"
    style="width: 90%; margin-top: 1%;"
  >
    <div class="message">
      <template v-for="(it, index) in chatList" :key="it.id">
        <div v-if="it.role === 'user'" class="prompt">
          <div class="empty"></div>
          <div class="text">{{ it.content }}</div>
          <div class="header">
            <p>{{ it.promptTime }}</p>
            <i class="ikgpt ikgpt-yonghu"></i>
          </div>
        </div>
        <div v-else class="content">
          <p class="content-time">{{ it.time }}</p>
          <div class="header">
            <img src="/logo.png">
          </div>
          <template v-if="isMarkdown(it.content)">
            <div class="text">
              <div class="markdown-body" v-html="rebuildHTML(it)"></div>
            </div>
          </template>
          <template v-else-if="isHtmlFragment(it.content)">
            <div class="text">
              <div v-html="formatHTML(it.content)"></div>
            </div>
          </template>
          <template v-else>
            <div class="text">
              {{ formatHTML(it.content ? it.content :'') }}
            </div>
          </template>

          <div class="empty"></div>
        </div>
      </template>
    </div>
    <n-input
      v-model:value="chatValue"
      :disabled="chatLoading"
      type="textarea"
      clearable
      autofocus
      placeholder="请输入要生成的图表描述"
      @keyup.enter="handChat"
    />
    <template #action>
      <n-button @click="handCancle">取消</n-button>
      <n-button type="primary" @click="handConfime"> 确定 </n-button>
    </template>
  </n-modal>
</template>

<style lang="scss">
.datav-chat-editor-dialog {
  .markdown-body {
    background-color: transparent;
    font-size: 14px;

    p {
      white-space: pre-wrap;
    }

    ol {
      list-style-type: decimal;
    }

    ul {
      list-style-type: disc;
    }

    pre code,
    pre tt {
      line-height: 1.65;
    }

    .highlight pre,
    pre {
      background-color: #303030;
    }

    code.hljs {
      padding: 0;
    }

    .code-block {
      &-wrapper {
        position: relative;
        padding-top: 24px;
      }

      &-header {
        position: absolute;
        top: 5px;
        right: 0;
        width: 100%;
        padding: 0 1rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #b3b3b3;

        &__copy {
          cursor: pointer;
          margin-left: 0.5rem;
          user-select: none;

          &:hover {
            color: #65a665;
          }
        }
      }
    }
  }

  .message {
    display: flex;
    flex-direction: column;
    --header-wh: 35px;

    height: calc(100vh - 240px);

    .prompt,
    .content {
      padding: 12px;
      border-radius: 4px;
    }

    .prompt {
      margin-bottom: 16px;
      display: flex;
      position: relative;

      .header {
        width: var(--header-wh);
        height: var(--header-wh);
        background: #e7e7e7;
        margin-left: 4px;
        border-radius: 50%;
        position: absolute;
        right: 0;
        top: 14px;
        display: flex;
        align-items: center;
        justify-content: center;

        p {
          position: absolute;
          top: -34px;
          width: 197px;
          right: -37px;
          font-size: 12px;
          color: var(--text-color-info);
        }

        i {
          font-size: 21px;
          color: var(--main-color);
        }
      }

      .empty {
        flex: 1;
      }

      .text {
        background: var(--main-ask-bg);
        padding: 8px 12px;
        border-radius: 8px;
        margin-right: 35px;
        box-sizing: border-box;
        max-width: calc(100% - 16px);
      }
    }

    .content {
      display: flex;
      position: relative;
      max-height: 500px;
      overflow-y: auto;

      .content-time {
        position: absolute;
        top: -21px;
        width: 197px;
        left: 49px;
        font-size: 12px;
        color: var(--text-color-info);
      }

      .header {
        width: var(--header-wh);
        height: var(--header-wh);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 4px;
        border-radius: 50%;
        position: absolute;
        left: 0;
        overflow: hidden;
        top: 14px;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .empty {
        flex: 1;
      }

      .text {
        background: var(--main-ans-bg);
        padding: 8px 12px;
        border-radius: 8px;
        margin-left: 35px;
        box-sizing: border-box;
        max-width: calc(100% - 16px);

        span {
          display: inline-block;
          // width: 2px;
          height: 20px;
          background: var(--main-color);
          // animation: line-split 0.45s linear 0s infinite alternate;
        }

        // @keyframes line-split {
        //   from {
        //     opacity: 1;
        //   }

        //   to {
        //     opacity: 0;
        //   }
        // }
      }
    }
  }
}

</style>
