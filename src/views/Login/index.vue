<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          :key="item.id"
          v-for="item in menuTab"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单开始 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-from"
        size="medium "
      >
        <el-form-item prop="username" class="item-from">
          <label for="username">邮箱</label>
          <el-input
            id="username"
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-from">
          <label for="">密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="passwords"
          class="item-from"
          v-show="menuTab[1].current"
        >
          <label for="">重置密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-from">
          <label for="">验证码</label>
          <el-row :gutter="4">
            <el-col :span="16">
              <div class="grid-content bg-purple">
                <el-input
                  v-model="ruleForm.code"
                  minlength="6"
                  maxlength="6"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-button
                  type="success"
                  class="block"
                  :disabled="codeBtnSta.type"
                  @click="getSms()"
                  >{{ codeBtnSta.text }}</el-button
                >
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="block login-top"
            :disabled="loginBtnSta"
            >{{ menuTab[0].current ? '登录' : '注册  ' }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { GetSms, Register, Login } from '@/api/login.js'
import { setToken, setUserName } from '@/utils/auth'
import {
  stripscript,
  validataEmail,
  validataPassword,
  validataCheckAge,
} from '@/utils/verific'
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (validataEmail(value)) {
        callback(new Error('输入邮箱格式不正确'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (validataPassword(value)) {
        callback(new Error('输入密码格式不正确'))
      } else if (value !== stripscript(value)) {
        callback(new Error('不能使用特殊字符'))
      } else {
        callback()
      }
    }
    var validatePasss = (rule, value, callback) => {
      if (this.menuTab[1].current === false) {
        callback()
      }
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('重复密码不一致'))
      } else {
        callback()
      }
    }
    var checkAge = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('验证码不能为空'))
      } else if (validataCheckAge(value)) {
        return callback(new Error('验证码格式不正确'))
      } else {
        callback()
      }
    }
    return {
      //定时器编号
      timer: null,
      loginBtnSta: true,
      codeBtnSta: {
        type: false,
        text: '获取验证码',
      },
      menuTab: [
        { txt: '登录', current: true },
        { txt: '注册', current: false },
      ],
      //表单绑定数据
      ruleForm: {
        username: '',
        password: '',
        passwords: '',
        code: '',
      },
      //表单验证
      rules: {
        username: [{ validator: validateUser, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        passwords: [{ validator: validatePasss, trigger: 'blur' }],
        code: [{ validator: checkAge, trigger: 'blur' }],
      },
    }
  },
  components: {},
  mounted() {
    // GetSms()
  },
  methods: {
    //获取验证码
    getSms() {
      //进行判断是否满足，否者不执行请求借口
      if (this.ruleForm.username === '') {
        this.$message.error('请填写相应的邮箱')
        return false
      }
      // //判断是否邮箱有误
      if (validataEmail(this.ruleForm.username)) {
        this.$message.error('邮箱格式有误，请重新输入')
        return false
      }
      //获取验证码按钮禁止
      this.loginBtnSta = false
      this.codeBtnSta.type = true
      this.codeBtnSta.text = '发送中'
      //请求验证码借口
      GetSms({
        username: this.ruleForm.username,
        module: this.menuTab[0].current ? 'login' : 'register',
      })
        .then((response) => {
          // console.log(response)
          this.$message.success(response.data.message)
          this.countDown(60)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    //倒计时
    countDown(number) {
      let time = number
      const clearTime = setInterval(() => {
        time--
        if (time === 0) {
          clearInterval(clearTime)
          this.codeBtnSta.type = false
          this.codeBtnSta.text = '重新获取'
        } else {
          this.codeBtnSta.text = `倒计时${time}秒`
        }
      }, 1000)
      this.timer = clearTime
    },
    //登录提交按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.menuTab[0].current) {
            //注册成功
            Register(this.ruleForm)
              .then((response) => {
                this.$message.success(response.data.message)
                clearInterval(this.timer)
                this.codeBtnSta.type = false
                this.codeBtnSta.text = '获取验证码'
                this.toggleMenu(this.menuTab[0])
              })
              .catch((error) => {})
          } else {
            Login(this.ruleForm)
              .then((response) => {
                console.log(response)
                let data = response.data.data
                setToken(data.token)
                setUserName(data.username)
                this.$router.push({
                  name: 'Home',
                })
              })
              .catch((error) => {
                console.log(error)
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toggleMenu(data) {
      this.menuTab.forEach((element) => {
        element.current = false
      })
      //高光
      data.current = true
      //重置表单
      this.$refs['ruleForm'].resetFields()
      //恢复验证按钮默认状态
      clearInterval(this.timer)
      this.codeBtnSta.type = false
      this.codeBtnSta.text = '获取验证码'
    },
  },
}
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-from {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-top {
    margin-top: 19px;
  }
}
</style>
