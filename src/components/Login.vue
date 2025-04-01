<template>
    <div class="container d-flex justify-content-center align-items-center" style="height: 90vh;">
      <div class="shadow rounded p-4 bg-white w-50">
        <div class="d-flex justify-content-between">
          <h2 class="fw-lighter">{{ $t("login.login") }}</h2>
        </div>
        <hr>
        <div class="mb-3">
          <label for="username" class="form-label">{{ $t("login.userName") }}</label>
          <input v-model="username" type="text" class="form-control" id="username" :placeholder="$t('login.userNamePlaceholder')">
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">{{ $t("login.password") }}</label>
          <input v-model="password" type="password" class="form-control" id="password" :placeholder="$t('login.passwordPlaceholder')" @keyup.enter="tryLogin">
        </div>
        <div class="mb-3">
          <button type="button" class="btn btn-primary w-100" @click="tryLogin">{{ $t("login.login") }}</button>
        </div>
      </div>
    </div>
  </template>
  

<script>
export default {
    name: 'Login',
    props: ["title","mode","body"],
    data() {
        return {
            username : "",
            password : "",
            isHidden_SVG_OK : true,
            isHidden_SVG_ERROR : true,
        }
    },
    methods: {
        tryLogin() {
            //调用 vuex async login({ commit }, { username, password }, payload)；并获取返回值bool
            //如果返回值为true this.$store.dispatch('getConfig');
            //如果返回值为false 显示错误提示
            this.$store.dispatch('login', { username: this.username, password: this.password }).then(res => {
                if (!res) {
                    // 登录失败
                    alert(this.$t('login.loginFailurePrompt'));
                    // 清空密码
                    this.password = "";
                }else{
                  this.$store.dispatch('getConfig');
                  //判断工作模式，如果mode为tester，跳转到tester
                  if (this.$store.state.deviceConfig.mode != undefined && 
                  this.$store.state.deviceConfig.mode == "tester"){
                    this.$router.push("/Factory");
                  }
                }
            });
        }
    }
}
</script>
