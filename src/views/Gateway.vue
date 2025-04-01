<template>
    <div class="shadow rounded p-3 bg-white">
        <div class="mb-3">
            <div class="d-flex justify-content-between">
                <h2 class="fw-lighter">{{ $t('gateway.title') }}</h2>
                <h2 class="fw-lighter">{{ $t('gateway.capacity') }}{{ this.deviceConfig_local.gateway_config.length }} /
                    {{ this.deviceConfig_local.config_static.gateway_max_count }}</h2>
            </div>
            <hr>
        </div>
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link d-flex align-items-center active" id="pills-gui-tab" data-bs-toggle="pill" data-bs-target="#pills-gui"
                    type="button" role="tab" aria-controls="pills-gui" aria-selected="true">
                    <i-edit-two size="24"/>{{ $t('guiEditor') }}
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link d-flex align-items-center" id="pills-json-editor-tab" data-bs-toggle="pill" data-bs-target="#pills-json-editor"
                        type="button" role="tab" aria-controls="pills-json-editor" aria-selected="false">
                <i-instruction size="24"/>{{ $t('codeEditor') }}
                </button>
            </li>
        </ul>
        <div class="tab-content mb-5" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-gui" role="tabpanel" aria-labelledby="pills-gui-tab">
                <div class="table-responsive" style="max-height:60vh">
                    <table class="table table-striped table-hover text-center table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">{{ $t('gateway.bar.channel') }}</th>
                                <th scope="col" @dblclick="dblClickToSelectAll()">{{ $t('gateway.bar.enable') }}</th>
                                <th scope="col">{{ $t('gateway.bar.protocol') }}</th>
                                <th scope="col">{{ $t('gateway.bar.networkModel') }}</th>
                                <th scope="col">{{ $t('gateway.bar.devicePort') }}</th>
                                <th scope="col">{{ $t('gateway.bar.remoteAddress') }}</th>
                                <th scope="col">{{ $t('gateway.bar.remotePort') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items, index) in getConfig.gateway_config" :key="index">
                                <!-- 序号 -->
                                <td>{{ index + 1 }}</td>
                                <!-- 启用 -->
                                <td>
                                    <input class="form-check-input fs-5" type="checkbox" v-model="items.gateway_enable" @dblclick="dblClickToSelectAll()">
                                </td>
                                <!-- 通道协议 -->
                                <td><select class="form-select" v-model="items.gateway_model" style="min-width: 9em;">
                                        <option :value=0>modbus RTU</option>
                                        <option :value=1>modbus TCP</option>
                                    </select></td>
                                <!-- 网络模式 -->
                                <td><select class="form-select" v-model="items.network_config.network_model"
                                        style="min-width: 8em;">
                                        <option value="0">{{ $t('gateway.item.tcpServer') }}</option>
                                        <option value="1">{{ $t('gateway.item.tcpClient') }}</option>
                                        <option value="2" disabled>{{ $t('gateway.item.udp') }}</option>
                                    </select></td>
                                <!-- 设备端口 -->
                                <td><input class="form-control" type="number" min="500" max="65535" @blur="if(items.network_config.local_port<500) items.network_config.local_port=500;if(items.network_config.local_port>65535) items.network_config.local_port=65535;"
                                        v-model="items.network_config.local_port" style="min-width: 6em;"></td>
                                <!-- 远程地址 -->
                                <td><input class="form-control" type="text" v-model="items.network_config.remote_address"
                                        :disabled="items.network_config.network_model == 0" style="min-width: 6em;"></td>
                                <!-- 远程端口 -->
                                <td><input class="form-control" type="number" min="500" max="65535" @blur="if(items.network_config.remote_port<500) items.network_config.remote_port=500;if(items.network_config.remote_port>65535) items.network_config.remote_port=65535;"
                                        v-model="items.network_config.remote_port"
                                        :disabled="items.network_config.network_model == 0" style="min-width: 6em;"></td>
                                <!-- 删除 -->
                                <td><button type="button" class="btn btn-danger" @click="del(index)" style="min-width: 6em;">{{
                                    $t('gateway.item.delete') }}</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="tab-pane fade" id="pills-json-editor" role="tabpanel" aria-labelledby="pills-json-editor-tab">
                <!-- JSON编辑器 使用row 修复宽度问题-->
                <div class="row">
                    <JsonEditorVue class="editor" language="zh-CN" v-model="getConfig.gateway_config"/>
                </div>
            </div>
        </div>
        <!-- 按钮组 -->
        <div class="mt-3 d-flex justify-content-start">
            <button type="button" class="btn btn-primary w-25 me-5" @click="add()">{{ $t('gateway.bottom.add') }}</button>
            <button type="button" class="btn btn-warning w-25" @click="updateConfig()">{{ $t('gateway.bottom.save')
            }}</button>
            <!-- 加载动画 -->
            <div class="ms-3 spinner-border text-primary" :class="{ 'visually-hidden': isHiddenLoding }" role="status">
            </div>
        </div>
    </div>
    <!-- 模态框 -->
    <Modal ref="modalRef" :title="$t('gateway.modal.title')" mode="OK" :close_handle="modal_close_handle"></Modal>

</template>

<script>
import { mapState } from 'vuex';
import Modal from "@/components/Modal.vue";
export default {
    name: "Gateway",
    data() {
        return {
            isHiddenLoding: true,
            isDblClickToSelectAll: false,
        };
    },
    mounted() {
    },
    components: {
        Modal
    },
    methods: {
        dblClickToSelectAll() {
            //翻转isDblClickToSelectAll
            this.isDblClickToSelectAll = !this.isDblClickToSelectAll;
            //双击启用时，自动选中所有的寄存器
            for (var i = 0; i < this.deviceConfig_local.gateway_config.length; i++) {
                this.deviceConfig_local.gateway_config[i].gateway_enable = this.isDblClickToSelectAll;
            }
        },
        modal_close_handle() {
            //刷新页面
            window.location.reload();
        },
        //添加新的一行
        add() {
            var maxlength = this.deviceConfig_local.config_static.gateway_max_count;
            // 检查是否超过最大容量
            if (this.deviceConfig_local.gateway_config.length >= maxlength) {
                alert(this.$t('gateway.msg.addErrMsg') + maxlength + this.$t('gateway.msg.addErrMsgUnit'));
                return;
            }
            // 添加新的一行
            let newRow = { "gateway_enable": false, "gateway_model": 0, "network_config": { "network_model": 0, "local_port": 8000, "remote_address": "remote.net", "remote_port": 7998 } };
            this.deviceConfig_local.gateway_config.push(newRow);
        },
        // 删除一行
        del(index) {
            this.deviceConfig_local.gateway_config.splice(index, 1);
        },
        //上传配置
        updateConfig() {
            //显示加载动画
            this.isHiddenLoding = false;

            //更新到store
            this.$store.commit('setConfig', this.deviceConfig_local);
            //发起 updateConfig 请求
            this.$store.dispatch('updateConfig', {
                callback: (data) => {
                    //结束加载动画
                    this.isHiddenLoding = true;
                    if (data.code == undefined || data.code != 0) {
                        //失败
                        alert(this.$t('gateway.msg.saveErrMsg') + data.code);
                    }
                },
            });
        }
    },
    created() {
        //页面创建后 拉取 设备配置
        this.$store.dispatch('getConfig');
    },
    computed: {
        ...mapState(['deviceConfig_local']),
        //从vuex获取设备配置信息
        getConfig() {
            if (this.$store.state.deviceConfig_local != undefined)
                return this.$store.state.deviceConfig_local;
            else return {};
        },
    }
};
</script>
<style></style>
