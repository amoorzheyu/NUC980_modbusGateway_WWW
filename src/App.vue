<template>
    <div class="background">
        <!-- 导航栏 -->
        <div>
            <ul class="nav" style="background-color: #e3f2fd;">
                <li class="nav-item">
                    <span class="nav-link active">{{$t("nav.modbusSmartGateway")}}</span>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="https://www.toky.com.cn/"><component is="i-link-three"/>{{$t("nav.toky")}}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/UserManual.pdf" target="_blank"><component is="i-notes"/>{{$t("nav.userManual")}}</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"><component is="i-earth"/>{{ getLangStr }}</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" @click="changeLang('zh_cn')">简体中文</a></li>
                        <li><a class="dropdown-item" @click="changeLang('en_us')">English</a></li>
                    </ul>
                </li>
                <li class="nav-item dropdown" v-if="isLogin">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"><component is="i-me"/>{{$t("nav.welcome")}} {{ getUserName }}</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#/General?new_password" v-if="isNormal">{{$t("nav.changePassword")}}</a></li>
                        <li><a class="dropdown-item" @click="logout">{{$t("login.logOut")}}</a></li>
                    </ul>
                </li>
                <div class="ms-auto d-flex align-items-center" v-if="isLogin">
                    <!-- <span class="badge bg-warning text-dark me-3">CPU: {{ getResUsage.CPU.toFixed(1) }}%</span>
                    <span class="badge bg-warning text-dark me-3">MEM: {{ getResUsage.MEM.toFixed(1) }}%</span> -->
                    <span class="badge bg-warning text-dark me-3" @click="updateConfig_local" v-show="isConfigChanged">{{$t("nav.updateConfig_local")}}</span>
                    <span class="badge bg-danger me-3" @click="reboot">{{$t("nav.reboot")}}</span>
                    <span class="badge bg-success me-3" onclick="location.reload()">{{$t("nav.refresh")}}</span>
                </div>
            </ul>
        </div>
        <!-- 登录界面 -->
        <Login v-if="isLogin==false"></Login>
        <!-- 本体 -->
        <div class="d-flex align-items-start" v-if="isLogin">
            <!-- 侧边栏 -->
            <div class="flex-column ps-1" style="background-color: #edf6fd;" v-if="isNormal">
                <ul class="nav nav-pills flex-column">
                    <li class="nav-item" v-for="(menu_item, index) in menus" :key="index">
                        <router-link class="text-nowrap nav-link" exact active-class="active" :to="menu_item.url">
                            <!-- 图标 -->
                            <component :is="menu_item.icon" size="24" />
                            <!-- 名称 -->
                            <span v-show="notPhoneScreen">{{ $t(menu_item.name) }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!-- 路由出口 -->
            <div class="flex-fill p-3" style="height: 94vh;overflow-y: scroll;">
                <router-view></router-view>
            </div>
            <!-- 警告弹窗 -->
            <Alert :context="alert_text" :is_hidden="alert_is_hidden" :color="alert_color"></Alert>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Tooltip from 'bootstrap/js/dist/tooltip';
import Login from "@/components/Login.vue";
import Alert from "@/components/Alert.vue";
export default {
    name: 'App',
    data() {
        return {
            menus: [{
                name: "menu.home",
                url: "/",
                icon: "i-home",
            }, {
                name: "menu.general",
                url: "/General",
                icon: "i-setting-one",
            }, {
                name: "menu.gateway",
                url: "/Gateway",
                icon: "i-ethernet-on",
            }, {
                name: "menu.serial",
                url: "/Serial",
                icon: "i-rs-male",
            }, {
                name: "menu.remote",
                url: "/Remote",
                icon: "i-robot-one",
            }, {
                name: "menu.scanCMD",
                url: "/ScanCMD",
                icon: "i-exchange",
            }, {
                name: "menu.logViewer",
                url: "/LogViewer",
                icon: "i-log",
            },
            ],
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
        }
    },
    components: {
        Login,
        Alert
    },
    mounted() {
        // 自动刷新设备资源占用情况
        // this.$store.dispatch('getResourceUsage');
        // setInterval(() => {
        //     this.$store.dispatch('getResourceUsage');
        // }, 3000);
        new Tooltip(document.body, {
            selector: "[data-bs-toggle='tooltip']", // 加入这一句，生效所有的 data-bs-toogle 绑定
        })
        //通过ua判断是否是移动设备，如果是则强制翻转屏幕
        if (this.isPhone() && 0) {
            //body应用样式
            document.querySelector('body').setAttribute('style', 'transform-origin: 0 0;transform: rotateZ(90deg) translateY(-100%);')
        }
        //更新屏幕分辨率信息
        window.onresize = async () => {
            this.forceLandscapeScreenHandle();
        }
        this.forceLandscapeScreenHandle();
    },
    methods: {
        changeLang(lang) {
            this.$i18n.locale = lang;
            localStorage.setItem('lang', lang);
            location.reload();
        },
        //退出登录，调用接口 /api/logout
        logout() {
            this.$store.dispatch('logout', {
                callback: (data) => {
                    //刷新
                    location.reload();
                },
            });
        },
        reboot() {
            //确认框
            if (!confirm(this.$t('nav.rebootConfirm'))) return;

            this.$store.dispatch('reboot', {
                callback: (data) => {
                    //等待10秒后自动刷新
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                    //弹窗提醒
                    alert("重启中,稍后将自动刷新页面");
                },
            });
        },
        updateConfig_local() {
            this.$store.commit('updateConfig_local');
            //刷新页面
            location.reload();
        },
        forceLandscapeScreenHandle() {
            const body = document.getElementsByTagName('body')[0];
            const html = document.getElementsByTagName('html')[0];
            const width = html.clientWidth;
            const height = html.clientHeight;
            const max = width > height ? width : height;
            const min = width > height ? height : width;
            body.style.width = max + "px";
            body.style.height = min + "px";
            this.screenWidth = window.innerWidth;
            this.screenHeight = window.innerHeight;
        },
        isPhone() {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        }
    },
    computed: {
        ...mapState(['resUsage']),
        //判断state.deviceConfig_local和state.deviceConfig是否相同
        isConfigChanged() {
            if (JSON.stringify(this.$store.state.deviceConfig_local) != JSON.stringify(this.$store.state.deviceConfig))
                return true;
            else return false;
        },
        //从vuex获取设备配置信息
        getResUsage() {
            if (this.$store.state.resUsage != undefined)
                return this.$store.state.resUsage;
            else return { "CPU": 0, "MEM": 0 };
        },
        isLogin() {
            if (this.$store.state.deviceConfig.user != undefined)
                return true;
            else return false;
        },
        isNormal() {
            if (this.$store.state.deviceConfig.mode != undefined && 
                this.$store.state.deviceConfig.mode == "normal")
                    return true;
            else return false;
        },
        alert_is_hidden() {
            return !this.$store.state.isLoadingRemoteConfig;
        },
        alert_color() {
            return this.$store.state.alert_color;
        },
        alert_text() {
            return this.$t(this.$store.state.alert_context);
        },
        getUserName() {
            if (this.$store.state.deviceConfig.user[0].name != undefined)
                return this.$store.state.deviceConfig.user[0].name;
            else return "";
        },
        //获取语言字符串
        getLangStr() {
            switch (this.$i18n.locale) {
                case "zh_cn": return "简体中文";
                case "en_us": return "English";
            }
            return this.$i18n.locale;
        },
        notPhoneScreen() {
            if (this.screenWidth > 768 &&
                this.screenWidth/this.screenHeight > 1.3
            )return true;
            else return false;
            
        }
    },
    onWindowSizeChanged() {
      window.addEventListener("resize", this.forceLandscapeScreenHandle)
    },
    beforeUnmount() {
        window.onresize = null;
    }
}
</script>

<style>
.background {
    /* 背景很大，不能让他滚动 */
    position: relative;
    overflow:hidden; /* hide the overflow here not on the pseudo element */
}

.background::before {
    content: "";
    position: absolute;
    z-index: -1;
    /* 141% ~ sqrt(2)x100% to make sure to cover all the area after the rotation */
    width: 200%;
    height:200%;
    /**/
    /* to center*/
    left: 50%;
    top: 50%;
    /* */
    background: url(@/assets/background_logo.png);
    transform:translate(-50%,-50%) rotate(45deg); /* center the element then rotate */
    opacity: 0.04;
    /* 滚动动画，配置低的电脑卡，默认屏蔽 */
    /* animation: scrollAnimation 10s linear infinite; */
}

/* 添加滚动动画关键帧 */
@keyframes scrollAnimation {
    0% {
    transform: translate(-50%, -50%) rotate(45deg) translateX(0); /* 初始位置 */
    }
    100% {
    transform: translate(-50%, -50%) rotate(45deg) translateX(200px);
    }
}
.router-link-active {
    text-decoration: none;
}

/* 添加一个新的样式类用于定位侧边栏 */
.fixed-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    overflow-y: scroll;
}

/* 移除JsonEditorVue标识 */
div.jsoneditor-menu a.jsoneditor-poweredBy {
  font-size: 8pt;
  position: absolute;
  right: 0;
  top: 0;
  display: none;
}
/* 修复JsonEditorVue的全屏模式阻挡筛选弹窗的问题 */
div.full-screen-container {
    z-index: 10000 !important;
}
/* 设置滚动条宽度并定义基本样式 */
::-webkit-scrollbar {
    width: 16px; /* 调整为你需要的宽度 */
    height: 16px;
}

/* 定义滚动条滑块颜色 */
::-webkit-scrollbar-thumb {
    background-color: #3883fa; /* 调整为你需要的颜色 */
    border-radius: 8px;
}
</style>
