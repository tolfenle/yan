<template>
  <div class="login-container">
    <!-- <background-particles /> -->
    <!-- <div id="login-lottie"></div> -->
    <n-config-provider
      :theme-overrides="{
        Input: {
          color: '#0000',
          colorFocus: '#0000',
          colorFocusError: '#0000',
          colorFocusWarning: '#0000',
          textColor: '#fff',
          caretColor: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        },
      }"
      abstract
    >
      <n-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-placement="left"
        size="small"
        class="login-form"
        @submit.prevent="handleLogin"
      >
        <h2>您好，欢迎登录</h2>
        <n-form-item path="username">
          <n-input
            v-model:value="loginForm.username"
            placeholder="用户名"
            type="text"
            size="large"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <n-icon>
                <IconUser />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-tooltip :show="capsTooltip" placement="top-start">
            <template #trigger>
              <n-input
                v-model:value="loginForm.password"
                placeholder="请输入密码"
                type="password"
                size="large"
                show-password-on="click"
                @keydown="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter="handleLogin"
              >
                <template #prefix>
                  <n-icon>
                    <IconKey />
                  </n-icon>
                </template>
              </n-input>
            </template>
            <span> 大写锁定已打开 </span>
          </n-tooltip>
        </n-form-item>
        <n-form-item path="verifyCode">
          <n-input-group>
            <n-input
              v-model:value="loginForm.verifyCode"
              placeholder="验证码"
              size="large"
              @keyup.enter="handleLogin"
            />
            <n-input-group-label size="large" @click="handCaptcha">
              <span v-html="captcha"></span>
            </n-input-group-label>
          </n-input-group>
        </n-form-item>

        <n-button
          :loading="loading"
          type="primary"
          size="large"
          style="width: 100%; margin-bottom: 20px;"
          @click="handleLogin"
        >
          {{ $t("login.login") }}
        </n-button>
        <div class="test-user">
          <n-button
            :loading="loading"
            type="primary"
            text
            style="width: 100%; margin-bottom: 20px;"
            @click="handleTestLogin"
          >
            {{ $t("login.loginTest") }}
          </n-button>
        </div>
      </n-form>
    </n-config-provider>
  </div>
</template>

<script lang="ts">
import { IconImg, IconKey, IconUser } from '@/icons'
import { useUserStore } from '@/store/user'
import { NDivider, useMessage, NInputGroup, NInputGroupLabel } from 'naive-ui'
import { defineComponent, onMounted, Ref, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import lottie from 'lottie-web'
import { getCaptcha } from '@/api/user'

const validateUsername = (rule: any, value: string, callback: Function) => {
  if (!value) {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}

const validatePassword = (rule: any, value: string, callback: Function) => {
  if (value.length < 6) {
    callback(new Error('密码不能少于6位'))
  } else {
    callback()
  }
}

const getOtherQuery = (query: any) => {
  return Object.keys(query).reduce((acc: any, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}

export default defineComponent({
  name: 'Login',
  components: {
    IconUser,
    IconKey,
    NInputGroup,
    NInputGroupLabel,
  },
  setup() {
    const code: Ref<string> = ref('')
    const validateCheckcode = (rule: any, value: string, callback: Function) => {
      if (!value) {
        callback(' ')
      } else if (value !== code.value) {
        return callback(' ')
      } else {
        return callback()
      }
    }
    const setCode = (co: string) => {
      code.value = co
    }

    // 返回登录页 清除所有信息
    localStorage.clear()
    sessionStorage.clear()

    const msg = useMessage()

    const userStore = useUserStore()

    const loginForm = ref({
      username: '',
      password: '',
      verifyCode: '',
      captchaId: '',
    })

    const loginRules = ref({
      username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      password: [{ required: true, trigger: 'blur', validator: validatePassword }],
      verifyCode: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
    })

    const captcha = ref('')
    const handCaptcha = async () => {
      loginForm.value.verifyCode = ''
      loginForm.value.captchaId = ''
      const res = await getCaptcha()
      if (res.code === 1000) {
        captcha.value = res?.data?.data
        loginForm.value.captchaId = res?.data?.captchaId
      }
    }
    handCaptcha()

    const loginFormRef = ref(null)
    const capsTooltip = ref(false)
    const loading = ref(false)
    const redirect = ref('')
    const otherQuery = ref({})

    const route = useRoute()
    const router = useRouter()

    watch(
      route,
      ({ query }) => {
        if (query) {
          redirect.value = query.redirect as string
          otherQuery.value = getOtherQuery(query)
        }
      },
      { immediate: true },
    )

    const checkCapslock = ({ shiftKey, key }: any) => {
      if (key && key.length === 1) {
        if (
          (shiftKey && key >= 'a' && key <= 'z') ||
          (!shiftKey && key >= 'A' && key <= 'Z')
        ) {
          capsTooltip.value = true
        } else {
          capsTooltip.value = false
        }
      }

      if (key === 'CapsLock' && capsTooltip.value === true) {
        capsTooltip.value = false
      }
    }

    const handleTestLogin = () => {
      loginForm.value.username = 'iking'
      loginForm.value.password ='iking.com'
    }

    const handleLogin = () => {
      (loginFormRef.value as any).validate((errors: any) => {
        if (!errors) {
          loading.value = true
          userStore
            .login(loginForm.value)
            .then(res => {
              if (res?.code === 1000) {
                msg.success(res.message)
                router.push({ path: redirect.value || '/', query: otherQuery.value })
              } else {
                msg.error(res?.message || '请求超时')
              }
            })
            .finally(() => {
              loading.value = false
            })
        }
      })
    }

    const handLinkTo = (link: string) => {
      router.push({ path: link })
    }

    onMounted(() => {
      // lottie.loadAnimation({
      //   container: document.getElementById('login-lottie'),
      //   path: '/lottie/lf30_editor_zza8x8bh.json',
      //   renderer: 'svg',
      //   loop: true,
      //   autoplay: true,
      // })
    })

    return {
      captcha,
      loginForm,
      loginRules,
      loginFormRef,
      capsTooltip,
      loading,
      checkCapslock,
      handleLogin,
      handleTestLogin,
      setCode,
      handLinkTo,
      handCaptcha,
    }
  },
})
</script>

<style lang="scss">
.login-container {
  width: 100%;
  min-height: 100%;
  height: 100vh;
  overflow: hidden;
  // background: linear-gradient(24deg, #2d2a7f 0, #6c91cd 23%, #2d2a7f 45%, #3b7cd6 100%);
  // background: linear-gradient(46deg, #102465 17%, #112f73 23%, #1a7bdc 45%, #112a6c 100%);
  background-image: url(@/assets/img/logo.webp);
  background-size: 100% 100%;

  .n-input {
    --n-border: 1px solid rgb(255 255 255 / 30%) !important;
  }

  .login-form {
    width: 416px;
    height: 410px;
    background: #14151687;
    position: absolute;
    margin: 0 auto;
    overflow: hidden;
    right: 9vw;
    top: 50%;
    transform: translateY(-50%);
    padding: 48px;
    border-radius: 23px;
    box-shadow: 0 0 43px 0 #1e1e1e;

    .valid-img {
      margin-left: 8px;
      border: 1px solid rgb(255 255 255 / 30%);
    }

    .n-input-group-label {
      --n-group-label-color: #c1c1c1 !important;
      --n-group-label-border: transparent !important;

      cursor: pointer;

      & > span {
        position: relative;
        top: -4px;
      }

      padding: 0;
      color: transparent;
      position: relative;
    }

    h2 {
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: 24px;
      color: rgb(255 255 255 / 90%);
      letter-spacing: 0;
      margin-bottom: 48px;

      span {
        position: absolute;
        font-size: 15px;
        bottom: 16px;
        color: #afe5f8a6;
      }
    }

    .n-divider {
      color: #efeff566;
    }

    .registerText {
      text-align: end;
      color: #fff;

      .n-divider {
        margin: 0 10px;
        background-color: #efeff566;
      }

      .n-button {
        padding: 0;
      }
    }

    .other-login {
      display: grid;
      grid-template-columns: repeat(auto-fill, 25%);
      text-align: center;

      i {
        font-size: 32px;
        color: #efeff566;
        cursor: pointer;

        &:first-child {
          color: var(--datav-main-color);
        }
      }
    }
  }

  .lang-select {
    float: right;
    margin-top: -24px;
    cursor: pointer;
    color: #bcc9d4;
  }

  .test-user {
    font-size: 14px;
    color: var(--datav-gui-font-color-3);
  }
}

#login-lottie {
  // width: 64vw;
  // top: 50%;
  // position: absolute;
  // transform: translateY(-50%);
  // left: 0;
  width: 100vw;
  // top: 50%;
  position: absolute;
  // transform: translateY(-50%);
  left: -159px;
  bottom: -13vh;
}

#login-lottie-form {
  position: absolute;
}
</style>
