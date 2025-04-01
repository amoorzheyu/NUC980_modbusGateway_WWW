<template>
    <div class="shadow rounded p-3 bg-white">
        <div class="d-flex justify-content-between mb-3">
            <h2 class="fw-lighter">{{ $t('logViewer.title') }}</h2>
            <button class="btn btn-primary" @click="exportLog">{{ $t('logViewer.export') }}</button>
        </div>
        <hr>
        <div v-html="getLog" class="text-container"></div>
    </div>
</template>


<script>
import { mapState } from 'vuex';
import Modal from "@/components/Modal.vue";
export default {
    name: "LogViewer",
    data() {
        return {
            timer: null,
        };
    },
    mounted() {
        this.$store.dispatch('getLog');
        // this.timer = setInterval(() => {
        //     this.$store.dispatch('getLog');
        // }, 5000);
    },
    components: {
        Modal
    },
    methods: {
        //导出按钮点击事件，导出html文件(可调用getLog（）)，名字必须包含日期，设备名称
        ...mapState(['deviceConfig']),
        exportLog() {
            let log = this.getLog;
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();
            let fileName = this.$t('logViewer.exportLog') + '-' + this.getConfig.config_static.device_name + "-" + year + "-" + month + "-" + day + "-" + hour + "-" + minute + "-" + second + ".html";
            let blob = new Blob([log], { type: "text/plain;charset=utf-8" });
            let a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            a.click();

        },
    },
    computed: {
        ...mapState(['log']),
        //从vuex获取设备配置信息
        getConfig() {
            if (this.$store.state.deviceConfig != undefined)
                return this.$store.state.deviceConfig;
            else return {};
        },
        //从vuex获取设备日志信息
        getLog() {
            let log = this.$store.state.log;
            //使用正则表达式匹配含有error的行,将这一行文字标红
            log = log.replace(/.*error.*/gi, "<span style='background-color:red;color:yellow'>$&</span>");
            //使用正则表达式匹配含有"错误"的行,将这一行文字标红
            log = log.replace(/.*错误.*/g, "<span style='background-color:red;color:yellow'>$&</span>");
            //使用正则表达式匹配含有"警告"的行,将这一行文字标黄
            log = log.replace(/.*警告.*/g, "<span style='background:yellow;color:red'>$&</span>");
            //使用正则表达式匹配含有"warning"的行,将这一行文字修改为背景为黄色，不区分大小写
            log = log.replace(/.*warning.*/gi, "<span style='background-color:yellow;color:red''>$&</span>");
            //使用正则表达式匹配含有"info"的行,将这一行文字标蓝
            log = log.replace(/.*info.*/gi, "<span style='background-color:blue;color:white'>$&</span>");
            //使用正则表达式匹配含有"信息"的行,将这一行文字标蓝
            log = log.replace(/.*信息.*/g, "<span style='background-color:blue;color:white'>$&</span>");
            //使用正则表达式匹配含有"debug"的行,将这一行文字标绿
            log = log.replace(/.*debug.*/gi, "<span style='background-color:green;color:white'>$&</span>");
            //使用正则表达式匹配含有"调试"的行,将这一行文字标绿
            log = log.replace(/.*调试.*/g, "<span style='background-color:green;color:white'>$&</span>");
            //使用正则表达式匹配含有"OK"的行,将这一行文字标绿，不区分大小写
            log = log.replace(/.*ok.*/gi, "<span style='background-color:green;color:white'>$&</span>");
            //使用正则表达式匹配含有"fatal"的行,将这一行文字标红
            log = log.replace(/.*fatal.*/gi, "<span style='background-color:red;color:yellow'>$&</span>");
            //使用正则表达式匹配含有"致命"的行,将这一行文字标红
            log = log.replace(/.*致命.*/g, "<span style='background-color:red;color:yellow'>$&</span>");
            //使用正则表达式匹配含有"panic"的行,将这一行文字标红
            log = log.replace(/.*panic.*/gi, "<span style='background-color:red;color:yellow'>$&</span>");
            //使用正则表达式匹配含有"恐慌"的行,将这一行文字标红
            log = log.replace(/.*恐慌.*/g, "<span style='background-color:red;color:yellow'>$&</span>");

            return log.replace(/\n/g, "<br>");
        },
    },
    beforeUnmount() {
        // clearInterval(this.timer);
    }
};
</script>
<style>
.text-container {
  white-space: pre-wrap;
}</style>
