<template>
  <div class="login">
    <div class="container">
      <a href="/#/index"><img src="/imgs/login-logo.png" alt=""></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">账号登录</span><span class="sep-line">|</span><span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="输入用户名" v-model="username">
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信注册</div>
            <div class="reg">立即注册<span>|</span>忘记密码？</div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from '../components/NavFooter'
export default {
  name: 'Login',
  components: { NavFooter },
  methods: {
    login () {
      const { username, password } = this
      this.axios.post('/user/login', {
        username,
        password
      }).then(res => {
        console.log(res)
        this.$cookie.set('userId', res.id, { expires: 'Session' })
        this.$store.commit('saveUserName', res.username)
        this.$router.push('/index')
      })
    },
    register () {
      this.axios.post('/user/register', {
        username: 'admin789',
        password: 'admin789',
        email: 'admin789123456'
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
    &>.container {
      height: 119px;
      img {
        width: auto;
        height: 100%;
      }
    }
    .wrapper{
      background: url("../../public/imgs/login-bg.jpg") no-repeat center;
      .container {
        height: 576px;
        .login-form {
          position: absolute;
          bottom: 29px;
          right: 0;
          width: 510px;
          height: 410px;
          padding: 0 30px;
          box-sizing: border-box;
          background-color: white;
          h3 {
            line-height: 23px;
            font-size: 24px;
            text-align: center;
            margin: 30px auto;
            .checked {
              color: #FF6600;
            }
            .sep-line {
              margin: 0 32px;
            }
          }
          .input {
            display: inline-block;
            width: 348px;
            height: 50px;
            border: 1px solid #e5e5e5;
            margin-bottom: 20px;
            input {
              width: 100%;
              height: 100%;
              border: none;
              padding: 20px;
            }
          }
          .btn {
            width: 100%;
            line-height: 50px;
            margin-top: 10px;
            font-size: 16px;
          }
          .tips {
            margin-top: 14px;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            .sms {
              color: #FF6600;
              cursor: pointer;
            }
            .reg {
              color: #999999;
            }
          }
        }
      }
    }
  }
</style>
