<template>
  <div class="shadow rounded p-3 bg-white">
    <div class="mb-3">
      <div class="d-flex justify-content-between">
        <h2 class="fw-lighter">{{ $t("serial.title") }}</h2>
        <h2 class="fw-lighter">
          {{ $t("serial.capacity")
          }}{{ this.deviceConfig_local.serial_config.length }} /
          {{ this.deviceConfig_local.config_static.serial_max_count }}
        </h2>
      </div>
      <hr />
    </div>

    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link d-flex align-items-center active"
          id="pills-gui-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-gui"
          type="button"
          role="tab"
          aria-controls="pills-gui"
          aria-selected="true"
        >
          <i-edit-two size="24" />{{ $t("guiEditor") }}
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link d-flex align-items-center"
          id="pills-json-editor-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-json-editor"
          type="button"
          role="tab"
          aria-controls="pills-json-editor"
          aria-selected="false"
        >
          <i-instruction size="24" />{{ $t("codeEditor") }}
        </button>
      </li>
    </ul>
    <div class="tab-content mb-5" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="pills-gui"
        role="tabpanel"
        aria-labelledby="pills-gui-tab"
      >
        <PerfectScaling scale="0.8">
          <div class="table-responsive" style="max-height: 75vh">
            <table
              class="table table-striped table-hover text-center table-bordered"
            >
              <thead>
                <tr>
                  <!-- 通道 -->
                  <th scope="col">
                    {{ $t("serial.bar.channel") }}
                  </th>
                  <!-- 启用 -->
                  <th scope="col" @dblclick="dblClickToSelectAll()">
                    {{ $t("serial.bar.enable") }}
                  </th>
                  <!-- 串口设备 -->
                  <th scope="col">
                    {{ $t("serial.bar.serialDevice") }}
                    <component
                      class="text-primary"
                      is="i-help"
                      data-bs-toggle="tooltip"
                      :title="$t('serial.bar.hints.serialDevice')"
                    />
                  </th>
                  <!-- 串口模式 -->
                  <th scope="col">
                    {{ $t("serial.bar.serialModel") }}
                    <component
                      class="text-primary"
                      is="i-help"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      :title="$t('serial.bar.hints.serialModel')"
                    />
                  </th>
                  <!-- Modbus地址 -->
                  <th scope="col">
                    {{ $t("serial.bar.modbusAddress") }}
                    <component
                      class="text-primary"
                      is="i-help"
                      data-bs-toggle="tooltip"
                      :title="$t('serial.bar.hints.modbusAddress')"
                    />
                  </th>
                  <!-- Modbus超时时间(ms) -->
                  <th scope="col">
                    {{ $t("serial.bar.modbusTimeout") }}
                  </th>
                  <!-- Modbus指令间隔(ms) -->
                  <th scope="col">
                    {{ $t("serial.bar.modbusInterval") }}
                  </th>
                  <!-- 波特率 -->
                  <th scope="col">
                    {{ $t("serial.bar.baudrate") }}
                  </th>
                  <!-- 数据位 -->
                  <th scope="col">
                    {{ $t("serial.bar.dataBit") }}
                  </th>
                  <!-- 停止位 -->
                  <th scope="col">
                    {{ $t("serial.bar.stopBit") }}
                  </th>
                  <!-- 校验位 -->
                  <th scope="col">
                    {{ $t("serial.bar.parityBit") }}
                  </th>
                  <!-- 网络模式 -->
                  <th scope="col">
                    {{ $t("serial.bar.networkModel") }}
                  </th>
                  <!-- 设备端口 -->
                  <th scope="col">
                    {{ $t("serial.bar.devicePort") }}
                    <component
                      class="text-primary"
                      is="i-help"
                      data-bs-toggle="tooltip"
                      :title="$t('serial.bar.hints.devicePort')"
                    />
                  </th>
                  <!-- 远程地址 -->
                  <th scope="col">
                    {{ $t("serial.bar.remoteAddress") }}
                    <component
                      class="text-primary"
                      is="i-help"
                      data-bs-toggle="tooltip"
                      :title="$t('serial.bar.hints.remoteAddress')"
                    />
                  </th>
                  <!-- 远程端口 -->
                  <th scope="col">
                    {{ $t("serial.bar.remotePort") }}
                    <component
                      class="text-primary"
                      is="i-help"
                      data-bs-toggle="tooltip"
                      :title="$t('serial.bar.hints.remotePort')"
                    />
                  </th>
                  <!-- <th scope="col">{{ $t("serial.item.add") }}
                    <component
                      class="text-primary"
                      is="i-help"
                      data-bs-toggle="tooltip"
                      :title="$t('serial.bar.hints.add')"
                    />
                  </th> -->
                  <th scope="col">{{ $t("serial.item.delete") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(items, index) in getConfig.serial_config"
                  :key="index"
                  data-bs-toggle="tooltip"
                  :title="
                    getConfig.SerialChannelReferencedCheck[index]
                      ? $t('msg.delErrMsg_referenced')
                      : ''
                  "
                  draggable="true"
                  @dragstart="handleDragStart($event, index)"
                  @dragover.prevent="handleDragOver($event, index)"
                  @dragenter.prevent="handleDragEnter($event, index)"
                  @dragleave="handleDragLeave($event)"
                  @drop="handleDrop($event, index)"
                  @dragend="handleDragEnd($event)"
                  :class="{
                    'drag-over': dragOverIndex === index,
                    dragging: dragItemIndex === index,
                  }"
                >
                  <!-- 序号 -->
                  <td
                    @mouseover="showDragHandle(index)"
                    @mouseleave="hideDragHandle(index)"
                    style="cursor: move; position: relative"
                  >
                    {{ index + 1 }}
                    <span v-if="hoveredRow === index" class="drag-handle"
                      >☰</span
                    >
                  </td>
                  <!-- 启用 -->
                  <td>
                    <input
                      class="form-check-input fs-5"
                      type="checkbox"
                      v-model="items.serial_enable"
                      @dblclick="dblClickToSelectAll()"
                      :disabled="getConfig.SerialChannelReferencedCheck[index]"
                    />
                  </td>
                  <!-- 串口设备 -->
                  <td>
                    <select
                      class="form-select"
                      v-model="items.serial_device_path"
                      style="min-width: 7em"
                      v-bind:class="{
                        'is-invalid': getSerialConflictError(index),
                      }"
                      aria-describedby="serial_conflict_checking_hasError"
                      :disabled="getConfig.SerialChannelReferencedCheck[index]"
                    >
                      <option
                        v-for="(item, index) in getTTY_dev"
                        :key="index"
                        :value="item.path"
                        v-show="
                          index < getConfig.config_static.serial_max_count
                        "
                      >
                        {{ item.label }}
                      </option>
                    </select>
                    <div
                      id="serial_conflict_checking_hasError"
                      class="invalid-feedback"
                    >
                      {{ $t("serial.item.deviceExistedMsg") }}
                    </div>
                  </td>

                  <!-- 串口模式 -->
                  <td data-bs-html="true">
                    <select
                      class="form-select"
                      v-model="items.serial_model"
                      style="min-width: 9em"
                      :disabled="getConfig.SerialChannelReferencedCheck[index]"
                    >
                      <option :value="0">DTU</option>
                      <option :value="1">RTU Master</option>
                      <option :value="2">RTU Slave</option>
                      <option :value="3">DTU MRTU</option>
                      <option :value="4">DTU MTCP</option>
                    </select>
                  </td>
                  <!-- Modbus地址 -->
                  <td>
                    <input
                      class="form-control"
                      type="number"
                      min="0"
                      max="247"
                      v-model="items.modbus_address"
                      :disabled="items.serial_model != 2"
                      style="min-width: 4em"
                    />
                  </td>
                  <!-- Modbus超时时间(ms) -->
                  <td>
                    <input
                      class="form-control"
                      type="number"
                      min="0"
                      max="65535"
                      v-model="items.modbus_timeout"
                      style="min-width: 6em"
                    />
                  </td>
                  <!-- Modbus指令间隔(ms) -->
                  <td>
                    <input
                      class="form-control"
                      type="number"
                      min="0"
                      max="65535"
                      v-model="items.modbus_interval"
                      style="min-width: 6em"
                    />
                  </td>
                  <!-- 串口波特率 -->
                  <td>
                    <select
                      class="form-select"
                      v-model="items.serial_baudrate"
                      style="min-width: 7em"
                    >
                      <option value="0">1200</option>
                      <option value="1">2400</option>
                      <option value="2">4800</option>
                      <option value="3">9600</option>
                      <option value="4">19200</option>
                      <option value="5">38400</option>
                      <option value="6">57600</option>
                      <option value="7">115200</option>
                    </select>
                  </td>
                  <!-- 数据位 -->
                  <td>
                    <select
                      class="form-select"
                      v-model="items.serial_bytesize"
                      style="min-width: 4em"
                    >
                      <option value="0">7</option>
                      <option value="1">8</option>
                    </select>
                  </td>
                  <!-- 停止位 -->
                  <td>
                    <select
                      class="form-select"
                      v-model="items.serial_stopbits"
                      style="min-width: 4em"
                    >
                      <option value="0">1</option>
                      <option value="1">2</option>
                    </select>
                  </td>
                  <!-- 校验位 -->
                  <td>
                    <select
                      class="form-select"
                      v-model="items.serial_parity"
                      style="min-width: 6em"
                    >
                      <option value="0">
                        {{ $t("serial.item.noneParity") }}
                      </option>
                      <option value="1">
                        {{ $t("serial.item.oddParity") }}
                      </option>
                      <option value="2">
                        {{ $t("serial.item.evenParity") }}
                      </option>
                    </select>
                  </td>
                  <!-- 网络模式 -->
                  <td>
                    <select
                      class="form-select"
                      v-model="items.network_config.network_model"
                      style="min-width: 8em"
                    >
                      <option value="0">
                        {{ $t("serial.item.tcpServer") }}
                      </option>
                      <option value="1" disabled>
                        {{ $t("serial.item.tcpClient") }}
                      </option>
                      <option value="2" disabled>
                        {{ $t("serial.item.udp") }}
                      </option>
                    </select>
                  </td>
                  <!-- 设备端口 -->
                  <td>
                    <input
                      class="form-control"
                      type="number"
                      min="500"
                      max="65535"
                      @blur="
                        if (items.network_config.local_port < 500)
                          items.network_config.local_port = 500;
                        if (items.network_config.local_port > 65535)
                          items.network_config.local_port = 65535;
                      "
                      v-model="items.network_config.local_port"
                      style="min-width: 6em"
                    />
                  </td>
                  <!-- 远程地址 -->
                  <td>
                    <input
                      class="form-control"
                      type="text"
                      v-model="items.network_config.remote_address"
                      :disabled="items.network_config.network_model == 0"
                      style="min-width: 12em"
                    />
                  </td>
                  <!-- 远程端口 -->
                  <td>
                    <input
                      class="form-control"
                      type="number"
                      min="500"
                      max="65535"
                      @blur="
                        if (items.network_config.remote_port < 500)
                          items.network_config.remote_port = 500;
                        if (items.network_config.remote_port > 65535)
                          items.network_config.remote_port = 65535;
                      "
                      v-model="items.network_config.remote_port"
                      :disabled="items.network_config.network_model == 0"
                      style="min-width: 6em"
                    />
                  </td>

                   <!-- 添加按钮 -->
                   <!-- <td>
                        <button type="button" class="btn btn-success" @click="addRow(index)"
                            style="min-width: 6em">
                            {{ $t("serial.item.add") }}
                        </button>
                    </td> -->

                  <!-- 删除 -->
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="del(index)"
                      style="min-width: 6em"
                      v-tooltip="'这里是悬停内容'"
                      :disabled="getConfig.SerialChannelReferencedCheck[index]"
                    >
                      {{ $t("serial.item.delete") }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </PerfectScaling>
      </div>
      <div
        class="tab-pane fade"
        id="pills-json-editor"
        role="tabpanel"
        aria-labelledby="pills-json-editor-tab"
      >
        <div class="row">
          <JsonEditorVue
            class="editor"
            language="zh-CN"
            v-model="getConfig.serial_config"
          />
        </div>
      </div>
    </div>

    <!-- 按钮组 -->
    <div class="mt-3 d-flex justify-content-start">
      <button type="button" class="btn btn-primary w-25 me-5" @click="add()">
        {{ $t("serial.bottom.add") }}
      </button>
      <button
        type="button"
        class="btn btn-warning w-25"
        @click="updateConfig()"
      >
        {{ $t("serial.bottom.save") }}
      </button>
      <!-- 加载动画 -->
      <div
        class="ms-3 spinner-border text-primary"
        :class="{ 'visually-hidden': isHiddenLoding }"
        role="status"
      ></div>
    </div>
  </div>
  <!-- 模态框 -->
  <Modal
    ref="modalRef"
    :title="$t('serial.modal.title')"
    mode="OK"
    :close_handle="modal_close_handle"
  ></Modal>
</template>

<script>
import { mapState } from "vuex";
import Modal from "@/components/Modal.vue";
import PerfectScaling from "@/components/PerfectScaling.vue";
export default {
  name: "Serial",
  data() {
    return {
      isHiddenLoding: true,
      isDblClickToSelectAll: false,
      hoveredRow: null,
      dragItemIndex: null,
      dragOverIndex: null,
      dragging: false,
    };
  },
  mounted() {},
  components: {
    Modal,
    PerfectScaling,
  },
  methods: {
    showDragHandle(index) {
      this.hoveredRow = index;
    },
    hideDragHandle(index) {
      if (this.hoveredRow === index) {
        this.hoveredRow = null;
      }
    },
    handleDragStart(e, index) {
      this.dragItemIndex = index;
      this.dragging = true;
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", index);
      // 设置拖拽图像
      e.target.style.opacity = "0.4";
    },
    handleDragOver(e, index) {
      e.preventDefault();
      this.dragOverIndex = index;
      return false;
    },
    handleDragEnter(e, index) {
      e.preventDefault();
      this.dragOverIndex = index;
    },
    handleDragLeave(e) {
      this.dragOverIndex = null;
    },
    handleDrop(e, index) {
      e.preventDefault();
      e.stopPropagation();

      if (this.dragItemIndex !== null && this.dragItemIndex !== index) {
        // 创建一个新数组来保持响应性
        const newSerialConfig = [...this.getConfig.serial_config];
        const newRefCheck = [...this.getConfig.SerialChannelReferencedCheck];

        // 移除拖拽的元素
        const [movedItem] = newSerialConfig.splice(this.dragItemIndex, 1);
        const [movedRefCheck] = newRefCheck.splice(this.dragItemIndex, 1);

        // 插入到新位置
        newSerialConfig.splice(index, 0, movedItem);
        newRefCheck.splice(index, 0, movedRefCheck);

        // 更新数组
        this.getConfig.serial_config = newSerialConfig;
        this.getConfig.SerialChannelReferencedCheck = newRefCheck;
      }

      this.dragOverIndex = null;
      return false;
    },
    handleDragEnd(e) {
      e.target.style.opacity = "1";
      this.dragItemIndex = null;
      this.dragOverIndex = null;
      this.dragging = false;
    },
    dblClickToSelectAll() {
      //翻转isDblClickToSelectAll
      this.isDblClickToSelectAll = !this.isDblClickToSelectAll;
      //双击启用时，自动选中所有的寄存器
      for (var i = 0; i < this.deviceConfig_local.serial_config.length; i++) {
        //前提是没有被禁用:disabled="getConfig.SerialChannelReferencedCheck[index]"
        if (this.getConfig.SerialChannelReferencedCheck[i] == true) {
          continue;
        }

        this.deviceConfig_local.serial_config[i].serial_enable =
          this.isDblClickToSelectAll;
      }
    },
    modal_close_handle() {
      //刷新页面
      window.location.reload();
    },
    //添加新的一行
    add() {
      var maxlength = this.deviceConfig_local.config_static.serial_max_count;
      // 检查是否超过最大容量
      if (this.deviceConfig_local.serial_config.length >= maxlength) {
        alert(
          this.$t("serial.msg.addErrMsg") +
            maxlength +
            this.$t("serial.msg.addErrMsgUnit")
        );
        return;
      }
      // 添加新的一行
      let newRow = {
        serial_enable: false,
        serial_device_path: "/dev/ttyS1",
        serial_model: 0,
        modbus_address: 0,
        modbus_timeout: 1000,
        modbus_interval: 1000,
        serial_baudrate: 7,
        serial_bytesize: 1,
        serial_stopbits: 0,
        serial_parity: 0,
        network_config: {
          network_model: 0,
          local_port: 8080,
          remote_address: "remote.com",
          remote_port: 2048,
        },
      };
      this.deviceConfig_local.serial_config.push(newRow);
    },
    // 删除一行
    del(index) {
      //执行删除
      this.deviceConfig_local.serial_config.splice(index, 1);
      //更新scanCMD_config后面项目的channel_id
      for (let i = 0; i < this.deviceConfig_local.scanCMD_config.length; i++) {
        if (this.deviceConfig_local.scanCMD_config[i].channel_id > index) {
          this.deviceConfig_local.scanCMD_config[i].channel_id--;
        }
      }
    },
    //上传配置
    updateConfig() {
      //显示加载动画
      this.isHiddenLoding = false;
      //更新到store
      this.$store.commit("setConfig", this.deviceConfig_local);
      //发起 updateConfig 请求
      this.$store.dispatch("updateConfig", {
        callback: (data) => {
          //结束加载动画
          this.isHiddenLoding = true;
          if (data.code == undefined || data.code != 0) {
            //失败
            alert(this.$t("serial.saveErrMsg") + data.code);
          }
        },
      });
    },
    //getSerialConflictError 检查是否有已经启用的串口设备，串口路径重复
    getSerialConflictError(index) {
      //跳过大于getConfig.config_static.serial_max_count
      if (index >= this.getConfig.config_static.serial_max_count) {
        return false;
      }
      //检查是否有已经启用的串口设备，串口路径重复
      let serial_device_path =
        this.deviceConfig_local.serial_config[index].serial_device_path;
      let serial_enable =
        this.deviceConfig_local.serial_config[index].serial_enable;
      if (serial_enable == false) {
        return false;
      }
      for (let i = 0; i < this.deviceConfig_local.serial_config.length; i++) {
        if (i == index) {
          continue;
        }
        if (this.deviceConfig_local.serial_config[i].serial_enable == false) {
          continue;
        }
        if (
          this.deviceConfig_local.serial_config[i].serial_device_path ==
          serial_device_path
        ) {
          //同时禁用当前的通道
          // this.deviceConfig_local.serial_config[index].serial_enable = false;
          return true;
        }
      }
      return false;
    },
  },
  created() {
    //页面创建后 拉取 设备配置
    this.$store.dispatch("getConfig");
    this.$store.dispatch("getTTY_dev");
  },
  computed: {
    ...mapState(["deviceConfig_local", "TTY_dev"]),
    //从vuex获取设备配置信息
    getConfig() {
      if (this.$store.state.deviceConfig_local != undefined)
        return this.$store.state.deviceConfig_local;
      else return {};
    },
    //从vuex获取串口设备列表 getTTY_dev
    // [ "ttyCH9344USB0", "ttyCH9344USB1", "ttyCH9344USB2", "ttyCH9344USB3", "ttyCH9344USB4", "ttyCH9344USB5", "ttyCH9344USB6", "ttyCH9344USB7", "ttyS0", "ttyS1", "ttyS2", "ttyS3", "ttyS4", "ttyS5", "ttyS6", "ttyS7", "ttyS8" ]
    getTTY_dev() {
      if (this.$store.state.TTY_dev != undefined) {
        // processedTTY_dev.forEach(device => {
        //     device.label = device.label.replace("串口", this.$t("serial"));
        // });
        // return this.$store.state.TTY_dev;

        // 为了让串口设备列表中的串口名称更加友好，将串口名称中的“串口”替换为“串口”
        let processedTTY_dev = JSON.parse(
          JSON.stringify(this.$store.state.TTY_dev)
        );
        processedTTY_dev.forEach((device) => {
          device.label = device.label.replace("串口", this.$t("theSerial"));
        });
        return processedTTY_dev;
      } else return [];
    },
  },
};
</script>

<style scoped>
.drag-handle {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2em;
  color: #666;
}

.drag-over {
  background-color: #f8f9fa;
  border-top: 2px solid #0d6efd;
}

.dragging {
  opacity: 0.5;
}

tr {
  transition: background-color 0.2s ease;
}
</style>
