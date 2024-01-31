import type { ConfigEnv } from 'vite'
import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
import plainText from 'vite-plugin-plain-text'
import setupExtend from 'vite-plugin-vue-setup-extend'
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import compression from 'vite-plugin-compression'

// import { mars3dPlugin } from 'vite-plugin-mars3d'

import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const dirRoot = process.cwd()

  const env = loadEnv(mode, dirRoot)

  return defineConfig({
    base: env.VITE_PUBLIC_PATH,
    plugins: [
      vue({
        script: {
          defineModel: true,
        },
      }),
      ElementPlus(),
      setupExtend(),
      plainText(/\.hbs$/),
      components({
        dirs: ['src/components/ui/global-config/**', 'src/components/global/**', 'src/components/chart-config/**', 'src/components/other-config/**'],
        extensions: ['vue', 'tsx'],
        include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/, /\.jsx$/],
        dts: 'src/types/components.d.ts',
      }),
      autoImport({
        imports: [
          'vue',
        ],
        dts: './src/types/auto-imports.d.ts',
        dirs: [
          './src/components/chart-config/**',
          './src/components/other-config/**',
          './src/data/select/**',
          './src/hooks/**',
          './src/enum/**',
          './src/components/_models/**',
        ],
      }),
      compression({
        // 可选配置项
        algorithm: 'gzip', // 默认就是gzip压缩
        ext: '.gz', // 压缩后文件扩展名，默认.gz
        deleteOriginalAssets: false, // 是否删除未压缩的原始资源，默认false
        threshold: 0, // 对超过多少字节以上的文件进行压缩，0表示所有文件都压缩
      }),
      // mars3dPlugin(),
    ],
    server: {
      host: '0.0.0.0',
      port: 9096,
      proxy: {
        '/basic-api': {
          target: env.VITE_PROXY_URL,
          changeOrigin: true,
          // ws: true,
          rewrite: path => path.replace(new RegExp(`^/basic-api`), ''),
        },
        '/fileupload': {
          target: env.VITE_UPLOAD_URL_PROXY,
          changeOrigin: true,
          ws: true,
          rewrite: path => path.replace(new RegExp(`^/fileupload`), ''),
        },
        '/look': {
          target: env.VITE_PROXY_URL,
          changeOrigin: true,
          ws: true,
          rewrite: path => path.replace(new RegExp(`^/look`), ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': pathResolve('./src'),
        'vue-i18n': pathResolve('./node_modules/vue-i18n/dist/vue-i18n.cjs.js'),
      },
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __DEV__: process.env.NODE_ENV !== 'production',
      __PROD__: process.env.NODE_ENV === 'production',
    },
    optimizeDeps: {
      include: [
        '@monaco-editor/loader',
        'accounting',
        'axios',
        'crypto-js',
        'dayjs',
        'echarts',
        'echarts-wordcloud',
        'element-plus',
        'gsap',
        'html2canvas',
        'js-cookie',
        'lodash-es',
        'monaco-editor',
        'naive-ui',
        'number-precision',
        'particles.vue3',
        'shortid',
        'vue',
        'vue-echarts',
        'vue-i18n',
        'vue-router',
      ],
      exclude: [],
    },
    build: {
      sourcemap: false,
      outDir: 'website',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          share: resolve(__dirname, 'index.share.html'),
        },
      },
    },
    esbuild: {
    },
  })
}
