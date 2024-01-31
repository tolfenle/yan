declare module '*.vue' {
  import type { App, defineComponent } from 'vue'

  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void
  }

  export default component
}

declare module '*.hbs' {
  const plainText: string

  export {
    plainText,
  }
}

// declare module '@vue/runtime-core' {
//   export interface GlobalComponents {
//     LottieAnimation: typeof import('vue3-lottie')['Vue3Lottie']
//   }
// }
