<template>
  <div class="tw-flex tw-flex-col tw-space-y-10">
    <div class="tw-flex tw-rounded-xl">
      <div
        class="tw-w-1/2 tw-font-sarabun tw-text-6xl tw-font-extrabold tw-text-white tw-text-left tw-self-center"
      >
        <p>{{ language === 'th' ? th.welcomeTo : eng.welcomeTo }}</p>
        <div class="tw-flex tw-space-x-2.5 tw-justify-start tw-mt-10">
          <p class="tw-font-sarabun tw-text-5xl tw-font-extrabold">HeartMPI</p>
          <i :class="['fa-solid', 'fa-heart-pulse', 'tw-w-8', 'tw-h-8']" />
        </div>
      </div>
      <div
        class="card tw-mx-auto tw-w-1/2 tw-h-full tw-text-center tw-bg-white-cultured tw-rounded-xl tw-p-8 tw-space-y-10"
      >
        <p class="tw-font-sarabun tw-text-4xl tw-font-extrabold">
          {{ language === 'th' ? th.account : eng.account }}
        </p>
        <form
          @submit.prevent="handleSubmit(!v$.$invalid)"
          class="p-fluid tw-space-y-7 tw-text-left"
        >
          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-user" />
              <InputText
                id="username"
                v-model="v$.username.$model"
                class="tw-font-sarabun tw-text-sm tw-font-normal"
                :class="{ 'p-invalid': v$.username.$invalid && submitted }"
                aria-describedby="username-error"
              />
              <label
                for="username"
                class="tw-font-sarabun tw-text-sm tw-font-bold"
                :class="{ 'p-error': v$.username.$invalid && submitted }"
                >{{ language === 'th' ? th.username : eng.username }}</label
              >
            </div>
            <span v-if="v$.username.$error && submitted">
              <span id="username-error" v-for="(error, index) of v$.username.$errors" :key="index">
                <small class="p-error">{{
                  v$.username.required.$message.replace('Value', 'Username')
                }}</small>
              </span>
            </span>
            <small
              v-else-if="(v$.username.$invalid && submitted) || v$.username.$pending.$response"
              class="p-error"
              >{{ v$.username.required.$message.replace('Value', 'Username') }}</small
            >
          </div>
          <div class="field">
            <div class="p-float-label">
              <Password
                id="password"
                v-model="v$.password.$model"
                class="tw-font-sarabun tw-text-sm tw-font-normal"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                :feedback="false"
                toggleMask
              >
                <!-- <template #header>
              <h6>Pick a password</h6>
            </template>
            <template #footer="sp">
              {{ sp.level }}
              <Divider />
              <p class="mt-2">Suggestions</p>
              <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
              </ul>
            </template> -->
              </Password>
              <label
                for="password"
                class="tw-font-sarabun tw-text-sm tw-font-bold"
                :class="{ 'p-error': v$.password.$invalid && submitted }"
                >{{ language === 'th' ? th.password : eng.password }}</label
              >
            </div>
            <small
              v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response"
              class="p-error"
              >{{ v$.password.required.$message.replace('Value', 'Password') }}</small
            >
          </div>
          <small class="error-message" style="color: red">{{ error }}</small>
          <div class="tw-grid tw-grid-cols-2 tw-font-sarabun tw-text-sm tw-font-normal">
            <div class="tw-flex tw-space-x-2.5">
              <!-- <Checkbox
                v-model="keepLogged"
                :binary="true"
                class="tw-self-center"
                inputId="keep-logged"
                style="margin: 0"
              /> -->
              <!-- <label for="keep-logged" class="tw-m-auto">{{
                language === 'th' ? th.rememberMe : eng.rememberMe
              }}</label> -->
            </div>
            <div class="tw-flex tw-flex-row-reverse">
              <a
                href="https://account.heartmpi.com/request-reset-link/"
                target="_blank"
                class="tw-text-blue-700 tw-font-semibold"
                >{{ language === 'th' ? th.forgotPassword : eng.forgotPassword }}</a
              >
            </div>
          </div>
          <p class="tw-font-sarabun tw-text-xs tw-font-normal">
            {{ language === 'th' ? th.noAccount : eng.noAccount }}
          </p>
          <!-- <small class="error-message" style="color: red">{{ error }}</small> -->
          <Button
            :label="language === 'th' ? th.login : eng.login"
            iconPos="left"
            icon="fa fa-solid fa-right-to-bracket"
            class="tw-font-sarabun tw-text-lg tw-font-normal p-button-raised tw-bg-blue-picton tw-border-blue-picton"
            type="submit"
          />
        </form>
      </div>
      <!-- <div class="tw-grid tw-grid-cols-3 tw-font-sarabun tw-text-sm tw-font-normal">
        <p class="tw-text-center">ภาษาไทย</p>
        <p class="tw-text-center">|</p>
        <p class="tw-text-center">English</p>
      </div> -->
    </div>
    <!-- <div class="tw-flex tw-font-sarabun tw-text-sm tw-font-semibold">
      <div class="tw-w-1/2"></div>
      <div class="tw-w-1/2 tw-flex tw-flex tw-justify-center tw-space-x-5">
        <p class="tw-select-none tw-col-span-2 tw-cursor-pointer" @click="changeLanguage('th')">
          ภาษาไทย
        </p>
        <p class="tw-select-none tw-font-normal">|</p>
        <p class="tw-select-none tw-col-span-2 tw-cursor-pointer" @click="changeLanguage('eng')">
          English
        </p>
      </div>
    </div> -->
  </div>
</template>

<script>
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      error: '',
      username: '',
      password: '',
      keepLogged: false,
      submitted: false,
      language: 'th',
      th: {
        welcomeTo: 'ยินดีต้อนรับสู่',
        account: 'บัญชีผู้ใช้',
        username: 'ชื่อบัญชีผู้ใช้',
        password: 'รหัสผ่าน',
        rememberMe: 'จดจำบัญชีของฉัน',
        forgotPassword: 'ลืมรหัสผ่าน',
        noAccount: '*ถ้าคุณไม่มีบัญชีผู้ใช้ กรุณาติดต่อผู้ดูแลระบบ',
        login: 'เข้าสู่ระบบ',
      },
      eng: {
        welcomeTo: 'Welcome to',
        account: 'Account',
        username: 'Username',
        password: 'Password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot Password',
        noAccount: "*If you don't have an account, please contact the administrator.",
        login: 'Login',
      },
    }
  },
  validations() {
    return {
      username: {
        required,
      },
      password: {
        required,
      },
    }
  },
  methods: {
    changeLanguage(language) {
      this.language = language
    },
    async handleSubmit(isFormValid) {
      this.submitted = true

      if (!isFormValid) {
        return
      }

      localStorage.setItem('fname', response.data.first_name)
      localStorage.setItem('lname', response.data.last_name)
      localStorage.setItem('title', response.data.title)
      localStorage.setItem('role', response.data.role_name)
      localStorage.setItem('role_name', response.data.backend_role)

      localStorage.setItem('username', this.username)

      this.$router.push({ name: 'home' })
    },
  },
  computed: {},
}
</script>
