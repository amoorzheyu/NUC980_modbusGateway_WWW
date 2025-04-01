<template>
    <div class="shadow rounded p-3 bg-white">
        <div class="mb-3">
            <div class="d-flex justify-content-between">
                <h2 class="fw-lighter">{{ $t('factory.title') }}</h2>
                <h2 class="fw-lighter">
                    <!-- 完成按钮 -->
                    <button type="button" class="btn btn-primary" @click="finish" v-if="isNormal">
                        {{ $t('factory.finishButton') }}
                    </button>
                </h2>
            </div>
            <hr>
            <div>
                <!-- 需要一个显示{{getSN}}的输入框，一个保存按钮，一个完成按钮 -->
                <div class="mb-3 d-flex justify-content-between">
                    <div class="input-group mb-3">
                        <span class="input-group-text">
                            {{ $t('factory.serialNumber') }}
                        </span>
                        <!-- 限制长度为16位，只能输入数字和字母 -->
                        <input v-model="SN" type="text" class="form-control"
                            :placeholder="$t('factory.serialNumberInputHint')" maxlength="16"
                            onkeyup="value=value.replace(/[^\w\.\/]/ig,'')">
                        <button class="btn btn-outline-secondary" type="button" @click="saveSN">
                            {{ $t('factory.save') }}
                        </button>
                    </div>
                    <!-- 加载动画 -->
                    <div class="ms-3 spinner-border text-primary" :class="{ 'visually-hidden': isHiddenLoding }"
                        role="status"></div>
                </div>
                <div class="mb-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text">
                            {{ $t('factory.macAddress') }}
                        </span>
                        <input type="text" class="form-control" id="MAC" :value="getMAC" disabled>
                    </div>
                </div>
                <!-- 一键复制按钮 -->
                <div class="ms-auto d-flex justify-content-end">
                    <button type="button" class="btn btn-success" @click="copyInfo">
                        {{ $t('factory.copyButton') }}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- 模态框 -->
    <Modal ref="modalRef" :title="modal_title" :mode="modal_mode" :body="modal_body" :close_handle="modal_close_handle">
    </Modal>
</template>

<script>
import { mapState } from 'vuex';
import Modal from "@/components/Modal.vue";
export default {
    name: "Tester",
    data() {
        return {
            "SN": "",
            "isHiddenLoding": true,
        };
    },
    mounted() {
        this.SN = this.getSN;
    },
    components: {
        Modal
    },
    methods: {
        finish() {
            this.$router.push("/");
        },
        //复制SN和MAC地址，参考如下:“SN：xxxxxxxxx\nMAC:00:00:00:00:00:00”
        copyInfo() {
            //为了实现换行符，用textarea
            let text = "SN：" + this.SN + "\nMAC：" + this.getMAC;
            let textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            alert(this.$t('factory.msg.copyOkMsg'));
        },
        //保存SN
        saveSN() {
            //判断SN是否为空
            if (this.SN == "") {
                alert(this.$t('factory.msg.snNullErrMsg'));
                return;
            }
            //判断SN是否为16位
            if (this.SN.length != 16) {
                alert(this.$t('factory.msg.snLengthErrMsg'));
                return;
            }
            //判断SN是否为数字和字母
            let reg = /^[0-9a-zA-Z]+$/;
            if (!reg.test(this.SN)) {
                alert(this.$t('factory.msg.snExprErrMsg'));
                return;
            }
            //开启加载动画
            this.isHiddenLoding = false;
            //调用vuex的saveSN
            this.$store.dispatch('updateSN', { SN: this.SN }).then(res => {
                //结束加载动画
                this.isHiddenLoding = true;
                if (!res) {
                    alert(this.$t('factory.msg.saveErrMsg'));
                } else {
                    this.$store.dispatch('getConfig');
                }
            });

        },
    },
    created() {

    },
    computed: {
        ...mapState(['deviceConfig']),
        getSN() {
            if (this.deviceConfig.sn != undefined)
                return this.deviceConfig.sn;
            return "";
        },
        getMAC() {
            if (this.deviceConfig.config_static.device_MAC != undefined)
                return this.deviceConfig.config_static.device_MAC;
            return "";
        },
        isNormal() {
            if (this.$store.state.deviceConfig.mode != undefined &&
                this.$store.state.deviceConfig.mode == "normal")
                return true;
            else return false;
        },
    }
};
</script>
<style></style>
