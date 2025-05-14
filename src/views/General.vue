<template>
    <!-- 一个透明的遮挡物，确保覆盖整个屏幕，放在最上层，用于升级的时候阻止用户执行任何操作 -->
    <div class="position-fixed top-0 start-0 w-100 h-100" style="z-index: 999999999;" :class="{ 'visually-hidden': isHiddenProcessBar }">
    </div>
    <!-- 分成两侧 -->
    <div class="d-flex flex-wrap ms-1">
        <!-- 网络设置 -->
        <div class="shadow rounded p-4 me-3 mb-3 flex-fill bg-white">
            <div class="d-flex justify-content-between">
                <h2 class="fw-lighter">{{ $t('general.networkSettings.title') }}</h2>
            </div>
            <hr>
            <!-- 网络设置 -->
            <div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="device_name" v-model="getConfig.config_static.device_name"
                        placeholder=" ">
                    <label for="device_name" class="col-form-label">{{ $t('general.networkSettings.deviceNameLabel') }}</label>
                </div>
                <div class="row g-2">
                    <div class="col form-floating mb-3">
                        <input type="text" class="form-control" id="set_device_IPv4"
                            @change="check_network_config()"
                            v-model="getConfig.config_static.set_device_IPv4"
                            v-bind:class="{ 'is-invalid': check_device_ipv4_error}"
                            placeholder=" ">
                        <label for="set_device_IPv4" class="col-form-label">{{ $t('general.networkSettings.ipv4AddressLabel') }}</label>
                    </div>
                    <div class="col form-floating mb-3">
                        <input type="text" class="form-control" id="set_device_IPv4_mask"
                        @change="check_network_config()"
                            v-model="getConfig.config_static.set_device_IPv4_mask" 
                            v-bind:class="{ 'is-invalid': check_device_ipv4_mask_error}"
                            placeholder=" ">
                        <label for="set_device_IPv4_mask" class="col-form-label">{{ $t('general.networkSettings.ipv4MaskLabel') }}</label>
                    </div>
                </div>
                <div class="row g-2">
                    <div class="col form-floating mb-3">
                        <input type="text" class="form-control" id="set_device_IPv4_gateway"
                        @change="check_network_config()"
                        v-bind:class="{ 'is-invalid': check_device_ipv4_gateway_error}"
                            v-model="getConfig.config_static.set_device_IPv4_gateway" placeholder=" ">
                        <label for="set_device_IPv4_gateway" class="col-form-label">{{ $t('general.networkSettings.ipv4GatewayLabel') }}</label>
                    </div>
                    <div class="col form-floating">
                        <input type="text" class="form-control" id="device_IPv4_DNS"
                        @change="check_network_config()"
                        v-bind:class="{ 'is-invalid': check_device_ipv4_dns_error}"
                            v-model="getConfig.config_static.device_IPv4_DNS" placeholder=" ">
                        <label for="device_IPv4_DNS" class="col-form-label">{{ $t('general.networkSettings.dnsLabel') }}</label>
                    </div>
                </div>

            </div>
            <!-- 保存按钮 -->
            <div class="mt-3 d-flex justify-content-start">
                <button type="button" class="btn btn-warning w-25" @click="updateConfigAndJump()">{{ $t('general.networkSettings.saveButton') }}</button>
                <!-- 加载动画 -->
                <div class="ms-3 spinner-border text-primary" :class="{ 'visually-hidden': isHiddenLoding_1 }"
                    role="status">
                </div>
            </div>
        </div>
        <div class="shadow rounded p-4 mb-3 me-3 flex-fill bg-white">
            <div class="d-flex justify-content-between">
                <h2 class="fw-lighter">{{ $t('general.eth0Info.title') }}</h2>
            </div>
            <hr>
            <!-- 实际信息 -->
            <ul class="list-group shadow-sm">
                <li class="list-group-item">
                    <div class="row justify-content-between">
                        <span class=" col-sm-6 fw-bold">{{ $t('general.eth0Info.dhcpLabel') }}</span>
                        <span class=" col-sm-6 text-sm-end">{{ getConfig.config_static.device_DHCP }}</span>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row justify-content-between">
                        <span class=" col-sm-6 fw-bold">{{ $t('general.eth0Info.ipv4Address') }}</span>
                        <span class=" col-sm-6 text-sm-end">{{ getConfig.config_static.device_IPv4 }}</span>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row justify-content-between">
                        <span class=" col-sm-6 fw-bold">{{ $t('general.eth0Info.ipv4Mask') }}</span>
                        <span class=" col-sm-6 text-sm-end">{{ getConfig.config_static.device_IPv4_mask }}</span>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row justify-content-between">
                        <span class=" col-sm-6 fw-bold">{{ $t('general.eth0Info.ipv4Gateway') }}</span>
                        <span class=" col-sm-6 text-sm-end">{{ getConfig.config_static.device_IPv4_gateway }}</span>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row justify-content-between">
                        <span class=" col-sm-6 fw-bold">{{ $t('general.eth0Info.dnsServer') }}</span>
                        <span class=" col-sm-6 text-sm-end">{{ getConfig.config_static.device_IPv4_DNS }}</span>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row justify-content-between">
                        <span class=" col-sm-6 fw-bold">{{ $t('general.eth0Info.macAddress') }}</span>
                        <span class=" col-sm-6 text-sm-end">{{ getConfig.config_static.device_MAC }}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="shadow rounded p-4 mb-3 me-3 flex-fill bg-white" style="min-width: 20vw;">
            <div class="d-flex justify-content-between">
                <h2 class="fw-lighter">{{ $t('general.changePassword.title') }}</h2>
            </div>
            <hr>
            <!-- 修改密码 -->
            <div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="new_password" v-model="new_password" placeholder=" ">
                    <label for="new_password" class="col-form-label">{{ $t('general.changePassword.newPasswordLabel') }}</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="new_password_confirm" v-model="new_password_confirm"
                        placeholder=" ">
                    <label for="new_password_confirm" class="col-form-label">{{ $t('general.changePassword.confirmPasswordLabel') }}</label>
                </div>
                <!-- 保存按钮 -->
                <div class="mt-3 d-flex justify-content-start">
                    <button type="button" class="btn btn-warning w-100" @click="changePasswd()">{{ $t('general.changePassword.saveButton') }}</button>
                    <!-- 加载动画 -->
                    <div class="ms-3 spinner-border text-primary" :class="{ 'visually-hidden': isHiddenLoding_2 }"
                        role="status">
                    </div>
                </div>
            </div>
        </div>
        <div class="shadow rounded p-4 mb-3 me-3 bg-white flex-shrink-1" >
            <div class="d-flex justify-content-between">
                <h2 class="fw-lighter">{{ $t('general.programUpdate.title') }}</h2>
            </div>
            <hr>
            <!-- 当前程序版本 -->
            <ul class="list-group shadow-sm">
                <li class="list-group-item">
                    <div class="row justify-content-between">
                        <span class=" col-sm-6 fw-bold">{{ $t('general.programUpdate.frontendVersionLabel') }}</span>
                        <span class=" col-sm-6 text-sm-end">2025/4/11</span>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row justify-content-between">
                        <span class=" col-sm-6 fw-bold">{{ $t('general.programUpdate.backendVersionLabel') }}</span>
                        <span class=" col-sm-6 text-sm-end">{{ getConfig.config_static.device_FW_Ver }}</span>
                    </div>
                </li>
            </ul>
            <!-- 更新包上传 -->
            <div class="input-group mt-4">
                <input id="file_input" type="file" class="form-control" aria-label="fileUpload" ref="fileUpload_ref"
                    @change="handle_file_upload" accept="application/x-zip-compressed" :disabled="isDisableUploadFile">
                <button id="file_upload_button" type="button" class="btn btn-danger" @click="handle_file_upload_button"
                    :disabled="isDisableUploadFile"><i-upload-web size="24"/>{{ $t('general.programUpdate.executeUpdateButton') }}</button>
            </div>
            <!-- 进度条 -->
            <div class="progress mt-3" :class="{ 'visually-hidden': isHiddenProcessBar }">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                    :style="{ width: valueProcessBar + '%' }" :aria-valuenow="valueProcessBar" aria-valuemin="0"
                    aria-valuemax="100">{{ valueProcessBar }}%</div>
            </div>
        </div>
        <div class="shadow rounded p-4 mb-3 me-3 bg-white flex-shrink-1">
            <div class="d-flex justify-content-between">
                <h2 class="fw-lighter">{{ $t('general.configFileManagement.title') }}</h2>
            </div>
            <hr>
            <!-- "configFileFilter": "配置文件过滤器",
                "configFileFilter_introduce": "选择需要被导入/导出的配置部分",
			"networkAdapter": "网络适配器配置",
			"gatewaySetting": "网关配置",
			"serialSetting": "串口配置",
			"remoteSlave": "远程从机配置",
			"registerMapping": "映射配置" -->
            <!-- 过滤器复选框 -->
            <div class="mb-1">
                <!-- 列表list-group，每一行有复选框和和对应的描述文本 -->
                <div class="list-group">
                    <div class="list-group-item list-group-item-action active" aria-current="true">
                        <span class="fw-bold">{{ $t('general.configFileManagement.configFileFilter') }}: </span>
                        <span>{{ $t('general.configFileManagement.configFileFilter_introduce') }}</span>
                    </div>
                    <table class="table table-bordered table-hover">
                        <tbody>
                            <tr>
                                <td>
                                    <input class="form-check-input me-1" type="checkbox" v-model="configFileFilter_networkAdapter">
                                    <span>{{ $t('general.configFileManagement.networkAdapter') }}</span>
                                </td>
                                <td>
                                    <input class="form-check-input me-1" type="checkbox" v-model="configFileFilter_gatewaySetting">
                                    <span>{{ $t('general.configFileManagement.gatewaySetting') }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input class="form-check-input me-1" type="checkbox" v-model="configFileFilter_serialSetting">
                                    <span>{{ $t('general.configFileManagement.serialSetting') }}</span>
                                </td>
                                <td>
                                    <input class="form-check-input me-1" type="checkbox" v-model="configFileFilter_remoteSlave">
                                    <span>{{ $t('general.configFileManagement.remoteSlave') }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <input class="form-check-input me-1" type="checkbox" v-model="configFileFilter_registerMapping">
                                    <span>{{ $t('general.configFileManagement.registerMapping') }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 配置文件上传 -->
            <div class="row">
                <div class="input-group col">
                    <input id="config_json_file_input" type="file" class="form-control" ref="config_json_file_input_ref"
                        @change="handle_inputConfig_JSON" accept="application/json">
                    <button id="config_json_file_input_button" type="button" class="btn btn-warning"
                        @click="handle_input_config_JSON_button"><i-upload-logs size="24"/>{{ $t('general.configFileManagement.importConfigFileButton') }}</button>
                </div>
                <!-- 加载动画 -->
                <div class="col-1  spinner-border text-primary" :class="{ 'visually-hidden': isHiddenLoding_3 }"
                    role="status"></div>
            </div>
            <!-- 按钮组 -->
            <div class="mt-3 d-flex justify-content-start">
                <button type="button" class="btn btn-primary me-5" @click="downloadConfig()"><i-download-web size="24"/>{{ $t('general.configFileManagement.exportConfigFileButton') }}</button>
                <button type="button" class="btn btn-danger" @click="restoreFactoryConfig()"><i-clear-format size="24"/>{{ $t('general.configFileManagement.restoreFactoryConfigButton') }}</button>
            </div>
        </div>
    </div>
    <!-- 模态框 -->
    <Modal ref="modalRef" :title="modal_title" :mode="modal_mode" :body="modal_body" :close_handle="modal_close_handle"></Modal>
</template>

<script>
import { mapState } from 'vuex';
import Modal from "@/components/Modal.vue";
import sparkMd5 from 'spark-md5';
export default {
    name: "General",
    data() {
        return {
            isHiddenLoding_1: true,
            isHiddenLoding_2: true,
            isHiddenLoding_3: true,
            isDisableUploadFile: false,
            isHiddenProcessBar: true,

            modal_title: "",
            modal_mode: "",
            modal_body: "",

            new_password_confirm: "",
            new_password: "",

            is_jump_to_new_page: false,

            check_device_ipv4_error: false,
            check_device_ipv4_mask_error: false,
            check_device_ipv4_gateway_error: false,
            check_device_ipv4_dns_error: false,

            // 配置文件过滤器
            configFileFilter_networkAdapter: false,
            configFileFilter_gatewaySetting: true,
            configFileFilter_serialSetting: true,
            configFileFilter_remoteSlave: true,
            configFileFilter_registerMapping: true,
        };
    },
    mounted() {
    },
    components: {
        Modal
    },
    methods: {
        check_network_config() {
            //用正则表达式检测ipv4地址是否合法
            const ipv4_address = this.getConfig.config_static.set_device_IPv4;
            const ipv4_address_mask = this.getConfig.config_static.set_device_IPv4_mask;
            const ipv4_address_gateway = this.getConfig.config_static.set_device_IPv4_gateway;
            const ipv4_address_dns = this.getConfig.config_static.device_IPv4_DNS;

            const ipv4_address_reg = /^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/;
            const ipv4_address_mask_reg = /^((255|254|252|248|240|224|192|128|0)\.){3}(255|254|252|248|240|224|192|128|0)$/;
            const ipv4_address_gateway_reg = /^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/;
            const ipv4_address_dns_reg = /^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/;
  
            this.check_device_ipv4_error            = ipv4_address_reg.test(ipv4_address) === false;  
            this.check_device_ipv4_mask_error       = ipv4_address_mask_reg.test(ipv4_address_mask) === false;  
            this.check_device_ipv4_gateway_error    = ipv4_address_gateway_reg.test(ipv4_address_gateway) === false;  
            this.check_device_ipv4_dns_error        = ipv4_address_dns_reg.test(ipv4_address_dns) === false;
        },
        modal_close_handle() {
            if (this.is_jump_to_new_page) {
                //跳转到新地址
                window.location.href = "http://" + this.getConfig.config_static.set_device_IPv4;
            }else{
                //刷新页面
                window.location.reload();
            }
        },
        updateConfigAndJump() {
            //检查ipv4地址合法标志位
            this.check_network_config();

            if (this.check_device_ipv4_error || this.check_device_ipv4_mask_error || this.check_device_ipv4_gateway_error || this.check_device_ipv4_dns_error) {
                this.modal_title = "IP地址不合法";
                this.modal_mode = "ERROR";
                this.modal_body = "请检查IP地址是否合法！";
                this.$refs.modalRef.open();
                return;
            }

            //显示加载动画
            this.isHiddenLoding_1 = false;
            //更新到store
            this.$store.commit('setConfig', this.deviceConfig);
            //发起 updateConfig 请求
            this.$store.dispatch('updateConfig', {
                callback: (data) => {
                    //结束加载动画
                    this.isHiddenLoding_1 = true;
                    if (data.code != undefined && data.code == 0) {
                        //成功保存数据
                        const ipv4Address = this.getConfig.config_static.set_device_IPv4;
                        this.modal_title = this.$t('general.uploadConfig.successMessage.title');
                        this.modal_mode = this.$t('general.uploadConfig.successMessage.mode');
                        this.modal_body = this.$t('general.uploadConfig.successMessage.body')  + this.getConfig.config_static.set_device_IPv4;
                        this.is_jump_to_new_page = true;
                        this.$refs.modalRef.open();
                        
                    } else {
                        //失败
                        const errorCode = data.code;
                        this.modal_title = this.$t('general.uploadConfig.errorMessage.title');
                        this.modal_mode = this.$t('general.uploadConfig.errorMessage.mode');
                        this.modal_body = this.$t('general.uploadConfig.errorMessage.body', { errorCode });
                    }
                },
            });
        },

        changePasswd() {
            //密码校验
            if (this.new_password != this.new_password_confirm) {
                this.modal_title = "密码不一致";
                this.modal_mode = "ERROR";
                this.modal_body = "两次输入的密码不一致，请重新输入！";
                this.$refs.modalRef.open();
                return;
            }
            //检查弱密码 比如空密码 或者 密码少于8位 或者 没有数字和英文混合，应该弹出警告框，按确定后继续
            if (this.new_password.length < 8) {
                this.modal_title = "密码强度不足";
                this.modal_mode = "ERROR";
                this.modal_body = "密码长度不足8位，请重新输入！";
                this.$refs.modalRef.open();
                return;
            }
            if (this.new_password.match(/^[0-9]+$/) != null) {
                this.modal_title = "密码强度不足";
                this.modal_mode = "ERROR";
                this.modal_body = "密码不能为纯数字，请重新输入！";
                this.$refs.modalRef.open();
                return;
            }
            if (this.new_password.match(/^[a-zA-Z]+$/) != null) {
                this.modal_title = "密码强度不足";
                this.modal_mode = "ERROR";
                this.modal_body = "密码不能为纯字母，请重新输入！";
                this.$refs.modalRef.open();
                return;
            }



            //将密码保存到store
            this.deviceConfig.user[0].pass = this.new_password;
            //显示加载动画
            this.isHiddenLoding_2 = false;
            //更新到store
            this.$store.commit('setConfig', this.deviceConfig);
            //发起 updateConfig 请求
            this.$store.dispatch('updateConfig', {
                callback: (data) => {
                    //结束加载动画
                    this.isHiddenLoding_2 = true;
                    if (data.code != undefined && data.code == 0) {
                        //成功保存数据
                        this.modal_title = "保存成功";
                        this.modal_mode = "OK";
                        this.modal_body = "页面将自动刷新，请耐心等待设备重启！";
                        this.$refs.modalRef.open();
                    } else {
                        //失败
                        this.modal_title = "保存失败";
                        this.modal_mode = "ERROR";
                        this.modal_body = "code:" + data.code;
                    }
                },
            });
        },
        //文件上传
        handle_file_upload_button() {
            //选择文件
            this.$refs.fileUpload_ref.dispatchEvent(new MouseEvent("click"));
        },
        // 文件上传
        handle_file_upload(ev) {
            // 阻止重复选择文件
            this.isDisableUploadFile = true;
            // 显示进度条
            this.isHiddenProcessBar = false;

            
            if (!ev.target.files[0]) return;
            const file = {
                name: ev.target.files[0].name,
                data: new Uint8Array(),
                chunkSize: 1024 * 2,
            };

            const r = new FileReader();
            r.readAsArrayBuffer(ev.target.files[0]);
            r.onload = () => {
                file.data = new Uint8Array(r.result);
                //计算文件md5
                file.md5 = sparkMd5.ArrayBuffer.hash(file.data);
                //计算md5[0]预设值为 0xF & 串口通道数量
                var target_md5_0 = 0xF & this.$store.state.deviceConfig.config_static.device_serial_port_num;
                //判断md5的[0]是否等于预设值
                if (file.md5[0] != target_md5_0) {
                    //不等于预设值
                    this.modal_title = "上传失败";
                    this.modal_mode = "ERROR";
                    this.modal_body = "上传的文件不适用于当前设备，请重新选择文件！";
                    this.$refs.modalRef.open();
                    // 阻止重复选择文件
                    this.isDisableUploadFile = false;
                    // 隐藏进度条
                    this.isHiddenProcessBar = true;
                    return;
                }else{
                    //允许上传到设备
                    this.$store.dispatch('uploadFile', file);
                }
            };
        },
        //导入配置文件按钮
        handle_input_config_JSON_button() {
            //选择文件
            this.$refs.config_json_file_input_ref.dispatchEvent(new MouseEvent("click"));
        },
        //导入配置文件到this.$store.state.deviceConfig
        handle_inputConfig_JSON(ev) {
            //确认框
            if (!confirm(this.$t('general.configFileManagement.importConfigFileConfirm'))) {
                //刷新
                window.location.reload();
            }
            if (!ev.target.files[0]) return;
            const r = new FileReader();
            r.readAsText(ev.target.files[0]);
            r.onload = () => {
                //将json文件转换为对象
                let config = JSON.parse(r.result);
                //进行过滤
                if (this.configFileFilter_networkAdapter == true) {
                    this.$store.state.deviceConfig.network_config = config.network_config;
                }
                if (this.configFileFilter_gatewaySetting == true) {
                    this.$store.state.deviceConfig.gateway_config = config.gateway_config;
                }
                if (this.configFileFilter_serialSetting == true) {
                    this.$store.state.deviceConfig.serial_config = config.serial_config;
                }
                if (this.configFileFilter_remoteSlave == true) {
                    this.$store.state.deviceConfig.remote_config = config.remote_config;
                }
                if (this.configFileFilter_registerMapping == true) {
                    this.$store.state.deviceConfig.scanCMD_config = config.scanCMD_config;
                }


                //将对象保存到store
                this.$store.commit('setConfig', this.$store.state.deviceConfig);
                //显示加载动画
                this.isHiddenLoding_3 = false;
                //发起 updateConfig 请求
                this.$store.dispatch('updateConfig', {
                    callback: (data) => {
                        //结束加载动画
                        this.isHiddenLoding_3 = true;
                        if (data.code != undefined && data.code == 0) {
                            //成功保存数据
                            this.modal_title = "导入成功";
                            this.modal_mode = "OK";
                            this.modal_body = "设备将自动重载配置文件";
                            this.$refs.modalRef.open();
                            //刷新页面在1秒后
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        } else {
                            //失败
                            this.modal_title = "导入失败";
                            this.modal_mode = "ERROR";
                            this.modal_body = "code:" + data.code + "\nmsg:" + data.msg;
                            this.$refs.modalRef.open();
                        }
                    },
                });
            };
        },
        //导出配置文件
        downloadConfig() {
            let config = {};
            //进行过滤
            if (this.configFileFilter_networkAdapter == true) {
                config.network_config = this.$store.state.deviceConfig.network_config;
            }
            if (this.configFileFilter_gatewaySetting == true) {
                config.gateway_config = this.$store.state.deviceConfig.gateway_config;
            }
            if (this.configFileFilter_serialSetting == true) {
                config.serial_config = this.$store.state.deviceConfig.serial_config;
            }
            if (this.configFileFilter_remoteSlave == true) {
                config.remote_config = this.$store.state.deviceConfig.remote_config;
            }
            if (this.configFileFilter_registerMapping == true) {
                config.scanCMD_config = this.$store.state.deviceConfig.scanCMD_config;
            }

            const blob = new Blob([JSON.stringify(config, null, 4)], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            //命名方式为 设备名+时间戳YYYY-MM-DD hh:mm:ss +config.json
            a.download = this.$store.state.deviceConfig.config_static.device_name + ' ' + new Date().toLocaleString() + ' config.json';
            a.click();
            //弹窗反馈
            this.modal_title = "导出成功";
            this.modal_mode = "OK";
            this.modal_body = "现在浏览器将自动下载当前的配置文件，请查看浏览器的下载菜单";
            this.$refs.modalRef.open();
        },
        //恢复出厂配置文件
        restoreFactoryConfig() {
            //普通弹窗二次确认
            //国际化restoreFactoryConfigConfirm
            if (!confirm(this.$t('general.configFileManagement.restoreFactoryConfigConfirm'))) {
                return;
            }

            //调用vuex 接口 restoreFactoryConfig
            this.$store.dispatch('restoreFactoryConfig', {
                callback: (data) => {
                    if (data.code != undefined && data.code == 0) {
                        this.$store.dispatch('logout');
                        //成功保存数据
                        this.modal_title = "操作成功";
                        this.modal_mode = "OK";
                        this.modal_body = "页面将自动刷新，请耐心等待设备重启！";
                        this.$refs.modalRef.open();
                        //刷新页面在1秒后
                        setTimeout(() => {
                            window.location.reload();
                        }, 5000);
                    } else {
                        //失败
                        this.modal_title = "恢复出厂设置失败";
                        this.modal_mode = "ERROR";
                        this.modal_body = "code:" + data.code + "\nmsg:" + data.msg;
                        this.$refs.modalRef.open();
                    }
                },
            });
        }
    },
    created() {
        //重置上传进度
        this.$store.commit('updateProgress', 0);
        //页面创建后 拉取 设备配置
        this.$store.dispatch('getConfig');
    },
    computed: {
        ...mapState(['deviceConfig']),
        //从vuex获取设备配置信息
        getConfig() {
            if (this.$store.state.deviceConfig != undefined)
                return this.$store.state.deviceConfig;
            else return {};
        },

        //监听上传进度
        ...mapState(['progress']),
        valueProcessBar() {
            if (this.progress == -1) {
                this.modal_title = "上传失败";
                this.modal_mode = "ERROR";
                this.$refs.modalRef.open();
            } else if (this.progress == 100) {
                //清除前端缓存
                this.$store.commit('clearSession');

                this.modal_title = "上传成功";
                this.modal_mode = "OK";
                this.modal_body = "页面将自动刷新，请耐心等待设备重启，直到工作指示灯闪烁！";
                // 发起 重启程序 请求
                this.$store.dispatch('kill', {
                    callback: (data) => {
                        this.$refs.modalRef.open();
                    },
                });

            }
            return this.progress;
        }
    }
};
</script>
<style></style>
