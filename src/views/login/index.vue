<script setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { loginRequest } from '@/api/index.js'
import { useUserStore, useLoadingStore, useRoutesStore } from '@/store/index.js';
import { storeToRefs } from 'pinia';
import router from "@/router/index.js";

const userStore = useUserStore();
const loadingStore = useLoadingStore();
const routesStore = useRoutesStore();

const { userInfo } = storeToRefs(userStore);
const { isLoading } = storeToRefs(loadingStore);

const loginFormRef = ref();

const loginForm = ref({
  account: "",
  password: ""
})

const rules = ref({
  account: [
    { required: true, message: '请输入用户账号', trigger: 'blur' }
  ],
  password: [-
    { required: true, message: '请输入账户密码', trigger: 'blur' },
    { min: 3, max: 15, message: '长度应在3~15个字符', trigger: 'blur' }
  ]
})

const resetForm = () => {
  if (!loginFormRef.value) return;
  loginFormRef.value.resetFields();
}

const handleLogin = async () => {
  if (!loginFormRef.value) return;
  await loginFormRef.value.validate(async valid => {
    if (valid) {
      const { data, code } = await loginRequest(loginForm.value);
      if (code !== 0) return;
      userInfo.value = {
        ...data,
        account: loginForm.value.account
      };
      sessionStorage.setItem('token', data.token);
      await router.push('/');
    }
  })
}

</script>

<template>
  <div class='login-wrap'>
    <div class='form-wrap'>
      <div class="login_img">
        <img alt="" src="../../static/logo.png" />
      </div>
      <el-form
        ref='loginFormRef'
        :model='loginForm'
        label-position='top'
        :rules='rules'
        status-icon
      >
        <el-form-item label="账户" prop="account">
          <el-input
            v-model="loginForm.account"
            placeholder="请输入用户账号"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入账户密码"
            :prefix-icon="Lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-wrap">
          <el-button type="primary" plain @click="resetForm">重置</el-button>
          <el-button type="primary" :loading='isLoading' @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.login-wrap {
  background: #52a3fe;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-wrap {
    width: 400px;
    height: 360px;
    background: #fff;
    box-shadow: -1px 1px 5px #f3f3f3;
    border-radius: 10px;
    padding: 20px;
    .el-form {
      padding-top: 80px;
      .btn-wrap {
        margin-top: 60px;
        ::v-deep .el-form-item__content {
          text-align: right;
        }
      }
    }
    .login_img {
      width: 123px;
      height: 125px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      border: 1px solid #f1f1f1;
      padding: 5px;
      box-shadow: -1px 1px 5px #f3f3f3;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
  }
}
</style>
