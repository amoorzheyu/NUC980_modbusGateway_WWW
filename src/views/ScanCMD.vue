<template>
  <div class="shadow rounded p-3 bg-white">
    <div class="mb-3">
      <div class="d-flex justify-content-between">
        <h2 class="fw-lighter">{{ $t("scanCMD.title") }}</h2>
        <h2 class="fw-lighter">
          {{ $t("scanCMD.capacity")
          }}{{ this.deviceConfig_local.scanCMD_config.length }} /
          {{ this.deviceConfig_local.config_static.scanCMD_max_count }}
        </h2>
      </div>
      <hr />

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
                    <th scope="col">{{ $t("scanCMD.bar.sn") }}</th>
                    <th scope="col" @dblclick="dblClickToSelectAll()">
                      {{ $t("scanCMD.bar.enable") }}
                    </th>
                    <th scope="col">{{ $t("scanCMD.bar.interfaceType") }}</th>
                    <th scope="col">
                      {{ $t("scanCMD.bar.interfaceChannel") }}
                      <component
                        class="text-primary"
                        is="i-help"
                        data-bs-toggle="tooltip"
                        :title="$t('scanCMD.bar.hints.interfaceChannel')"
                      />
                    </th>
                    <th scope="col">{{ $t("scanCMD.bar.channelProtocol") }}</th>
                    <th scope="col">{{ $t("scanCMD.bar.modbusAddress") }}</th>
                    <th scope="col">
                      {{ $t("scanCMD.bar.modbusFunctionCode") }}
                    </th>
                    <th scope="col">
                      {{ $t("scanCMD.bar.modbusRegAddress") }}
                    </th>
                    <th scope="col">{{ $t("scanCMD.bar.modbusRegType") }}</th>
                    <th scope="col">
                      {{ $t("scanCMD.bar.byteOrderedExpression") }}
                      <component
                        class="text-primary text-start"
                        is="i-help"
                        data-bs-toggle="tooltip"
                        data-bs-html="true"
                        :title="$t('scanCMD.bar.hints.byteOrderedExpression')"
                      />
                    </th>
                    <th scope="col">{{ $t("scanCMD.bar.modbusRegNumber") }}</th>
                    <th scope="col">
                      {{ $t("scanCMD.bar.occupiedRegister") }}
                    </th>
                    <th scope="col">{{ $t("scanCMD.bar.smartAddress") }}</th>
                    <th scope="col">
                      {{ $t("scanCMD.bar.mappedRegAddress") }}
                    </th>
                    <th scope="col">
                      {{ $t("scanCMD.bar.rw") }}
                      <component
                        class="text-primary"
                        is="i-help"
                        data-bs-toggle="tooltip"
                        :title="$t('scanCMD.bar.hints.rw')"
                      />
                    </th>
                    <th scope="col">
                      {{ $t("scanCMD.bar.errorValue") }}
                      <component
                        class="text-primary"
                        is="i-help"
                        data-bs-toggle="tooltip"
                        :title="$t('scanCMD.bar.hints.errorValue')"
                      />
                    </th>
                    <th scope="col">{{ $t("scanCMD.bar.interval") }}</th>
                    <th scope="col">{{ $t("scanCMD.item.delete") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(items, index) in getConfig.scanCMD_config"
                    :key="index"
                    :class="{
                      'table-primary': isSelected(index),
                      'draggable-row': true,
                    }"
                    draggable="true"
                    @dragstart="handleDragStart($event, index)"
                    @dragover.prevent="handleDragOver($event, index)"
                    @dragenter.prevent="handleDragEnter($event, index)"
                    @dragleave="handleDragLeave($event)"
                    @drop.prevent="handleDrop($event, index)"
                    @click="handleRowClick($event, index)"
                    @contextmenu.prevent="handleContextMenu($event, index)"
                  >
                    <!-- 序号 -->
                    <td style="cursor: move" title="拖动排序">
                      {{ index + 1 }}
                    </td>
                    <!-- 启用 -->
                    <td>
                      <input
                        class="form-check-input fs-5"
                        @change="checkRule()"
                        type="checkbox"
                        v-model="items.CMD_enable"
                        :disabled="
                          (this.error_list[index] != undefined &&
                            this.error_list[index].hasError) ||
                          items.channel_id == 255
                        "
                        @dblclick="dblClickToSelectAll()"
                      />
                    </td>
                    <!-- 通道类型 -->
                    <td>
                      <select
                        class="form-select"
                        @change="checkRule()"
                        v-model="items.channel_type"
                        style="min-width: 9em"
                      >
                        <option :value="0">
                          {{ $t("scanCMD.item.channelType.serialChannel") }}
                        </option>
                        <option :value="1">
                          {{
                            $t("scanCMD.item.channelType.remoteSalveChannel")
                          }}
                        </option>
                      </select>
                    </td>
                    <!-- 接口通道 -->
                    <td>
                      <select
                        class="form-select"
                        @change="checkRule()"
                        v-model="items.channel_id"
                        style="min-width: 6em"
                      >
                        <option
                          :value="items"
                          v-for="(items, index) in getChannelList(
                            items.channel_type
                          )"
                          :key="index"
                        >
                          {{ items + 1 }}
                        </option>
                        <option value="255" v-if="items.channel_id == 255">
                          ---
                        </option>
                      </select>
                    </td>
                    <!-- 通道协议 -->
                    <td>
                      <select
                        class="form-select"
                        v-model="items.channel_protocol"
                        style="min-width: 10em"
                      >
                        <option :value="0">Modbus RTU</option>
                        <option :value="1">Modbus TCP</option>
                      </select>
                    </td>
                    <!-- modbus地址 -->
                    <td>
                      <input
                        class="form-control"
                        type="number"
                        min="0"
                        max="247"
                        v-model="items.modbus_address"
                        style="min-width: 5em"
                      />
                    </td>
                    <!-- modbus指令 -->
                    <td>
                      <select
                        class="form-select"
                        @change="checkRule()"
                        v-model="items.modbus_CMD"
                        style="min-width: 10em"
                      >
                        <option :value="1">
                          {{ $t("scanCMD.item.modbusFC.option1") }}
                        </option>
                        <option :value="2">
                          {{ $t("scanCMD.item.modbusFC.option2") }}
                        </option>
                        <option :value="3">
                          {{ $t("scanCMD.item.modbusFC.option3") }}
                        </option>
                        <option :value="4">
                          {{ $t("scanCMD.item.modbusFC.option4") }}
                        </option>
                      </select>
                    </td>
                    <!-- modbus寄存器地址 -->
                    <td>
                      <input
                        class="form-control"
                        type="number"
                        min="0"
                        max="65535"
                        v-model="items.modbus_registerAddress"
                        style="min-width: 6em"
                      />
                    </td>
                    <!-- modbus寄存器类型 -->
                    <td>
                      <select
                        class="form-select"
                        v-model="items.modbus_registerType"
                        @change="handleRegisterTypeChange(index)"
                        style="min-width: 14em"
                      >
                        <option
                          v-for="(type, index) in register_type_size_endian_tf"
                          :key="index"
                          :value="index"
                        >
                          {{ type.name }}
                        </option>
                      </select>
                    </td>
                    <!-- 字节序表达式 -->
                    <td>
                      <input
                        class="form-control"
                        type="text"
                        maxlength="8"
                        v-bind:class="{ 'is-invalid': getEndiaError(index) }"
                        aria-describedby="gateway_endia_hasError_conflict"
                        @blur="checkRule()"
                        v-model="items.modbus_registerEndian"
                        style="min-width: 5em"
                      />
                      <div
                        id="gateway_endia_hasError_conflict"
                        class="invalid-feedback"
                      >
                        {{ getEndiaErrorMsg(index) }}
                      </div>
                    </td>
                    <!-- modbus寄存器数量 -->
                    <td>
                      <input
                        class="form-control"
                        type="number"
                        min="0"
                        max="65535"
                        @blur="checkRule()"
                        v-model="items.modbus_registerCount"
                        style="min-width: 6em"
                      />
                    </td>
                    <!-- modbus寄存器占用大小 -->
                    <td>
                      <input
                        class="form-control"
                        type="number"
                        readonly
                        v-model="items.modbus_registerSize"
                        style="min-width: 5em"
                      />
                    </td>
                    <!-- 智能地址 -->
                    <td>
                      <input
                        class="form-check-input fs-5"
                        type="checkbox"
                        @change="checkRule()"
                        v-model="items.modbus_smart_registerAddress_enable"
                      />
                      <div
                        class="text-danger"
                        v-show="getRegisterAddress_hasError(index)"
                      >
                        <component is="i-arrow-circle-up" size="24" />
                      </div>
                    </td>
                    <!-- 网关映射块寄存器地址 -->
                    <td>
                      <input
                        class="form-control"
                        @change="checkRule()"
                        v-bind:class="{
                          'is-invalid': getRegisterAddress_hasError(index),
                        }"
                        aria-describedby="check_gateway_block_registerAddress_conflict"
                        type="number"
                        min="0"
                        max="65535"
                        v-model="items.gateway_block_registerAddress"
                        :disabled="items.modbus_smart_registerAddress_enable"
                        style="min-width: 6em"
                      />
                      <div
                        id="check_gateway_block_registerAddress_conflict"
                        class="invalid-feedback"
                      >
                        {{ $t("scanCMD.item.errorMsg") }}
                      </div>
                    </td>
                    <!-- 权限 -->
                    <td>
                      <select
                        class="form-select"
                        v-model="items.RW_permission"
                        style="min-width: 6em"
                        @change="checkRule()"
                      >
                        <option :value="1">
                          {{ $t("scanCMD.item.rw.readOnly") }}
                        </option>
                        <option
                          :value="2"
                          :disabled="
                            items.modbus_CMD == 1 || items.modbus_CMD == 2
                          "
                        >
                          {{ $t("scanCMD.item.rw.writeOnly") }}
                        </option>
                        <option
                          :value="3"
                          :disabled="
                            items.modbus_CMD == 1 || items.modbus_CMD == 2
                          "
                        >
                          {{ $t("scanCMD.item.rw.both") }}
                        </option>
                      </select>
                    </td>
                    <!-- 异常设定值 -->
                    <td>
                      <input
                        class="form-control"
                        type="number"
                        min="0"
                        max="255"
                        v-model="items.exceptionCode"
                        style="min-width: 6em"
                      />
                    </td>
                    <!-- modbus指令间隔 -->
                    <td>
                      <input
                        class="form-control"
                        type="number"
                        min="0"
                        max="65535"
                        v-model="items.CMD_interval"
                        style="min-width: 6em"
                      />
                    </td>
                    <!-- 删除 -->
                    <td>
                      <button
                        type="button"
                        class="btn btn-danger"
                        @click="del(index)"
                        style="min-width: 6em"
                      >
                        {{ $t("scanCMD.item.delete") }}
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
          <!-- JSON编辑器 使用row 修复宽度问题-->
          <div class="row">
            <JsonEditorVue
              class="editor"
              language="zh-CN"
              v-model="getConfig.scanCMD_config"
            />
          </div>
        </div>
      </div>
      <!-- 没有可用通道的提示信息 -->
      <div
        class="alert alert-danger mt-3"
        role="alert"
        :class="{ 'visually-hidden': checkChannelNum != 0 }"
      >
        {{ $t("scanCMD.msg.noAvailableChannel") }}
      </div>
      <!-- 按钮组 -->
      <div class="mt-3 d-flex justify-content-start">
        <button
          type="button"
          class="btn btn-primary w-25 me-5"
          @click="add()"
          :disabled="checkChannelNum == 0"
        >
          {{ $t("scanCMD.bottom.add") }}
        </button>
        <button
          type="button"
          class="btn btn-warning w-25"
          @click="updateConfig()"
        >
          {{ $t("scanCMD.bottom.save") }}
        </button>
        <!-- 加载动画 -->
        <div
          class="ms-3 spinner-border text-primary"
          :class="{ 'visually-hidden': isHiddenLoding }"
          role="status"
        ></div>
      </div>
    </div>
  </div>
  <!-- 模态框 -->
  <Modal
    ref="modalRef"
    :title="$t('scanCMD.modal.title')"
    mode="OK"
    :close_handle="modal_close_handle"
  ></Modal>

  <!-- 约束检查提示 -->
  <!-- <div class="alert alert-warning position-fixed top-0 start-50 mt-5 translate-middle-x shadow d-flex align-items-center" role="alert" :class="{ 'visually-hidden': isHiddenConfigCheckLoding }">
        <span>{{ $t('scanCMD.msg.configCheck') }}</span>
        <div class="spinner-border text-danger ms-2" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div> -->
  <!-- 右键菜单 -->
  <div
    v-if="contextMenu.visible"
    :style="{ left: contextMenu.x + 'px', top: contextMenu.y + 'px' }"
    class="context-menu shadow"
  >
    <div class="context-menu-item" @click="copySelectedRows">复制</div>
    <div class="context-menu-item" @click="pasteRows">粘贴</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Modal from "@/components/Modal.vue";
import PerfectScaling from "@/components/PerfectScaling.vue";
export default {
  name: "ScanCMD",
  data() {
    return {
      selectedRows: new Set(), // 存储选中的行索引
      lastSelectedIndex: -1, // 记录最后选中的行索引
      copiedRows: [], // 存储复制的行数据
      contextMenu: {
        // 右键菜单状态
        visible: false,
        x: 0,
        y: 0,
        targetIndex: -1,
      },
      dragItemIndex: null, // 拖拽的起始索引
      dragOverIndex: null, // 拖拽悬停的索引

      isHiddenLoding: true,
      isHiddenConfigCheckLoding: true,
      isDblClickToSelectAll: false,

      register_type_size_endian_tf: [
        {
          name: this.$t("scanCMD.item.modbusRegType.bool"),
          real_size: 1,
          size: 1,
          endian: "a",
        },
        {
          name: this.$t("scanCMD.item.modbusRegType.int8"),
          real_size: 1,
          size: 1,
          endian: "a",
        },
        {
          name: this.$t("scanCMD.item.modbusRegType.uint8"),
          real_size: 1,
          size: 1,
          endian: "a",
        },
        {
          name: this.$t("scanCMD.item.modbusRegType.int16"),
          real_size: 1,
          size: 2,
          endian: "ab",
        },
        {
          name: this.$t("scanCMD.item.modbusRegType.uint16"),
          real_size: 1,
          size: 2,
          endian: "ab",
        },
        {
          name: this.$t("scanCMD.item.modbusRegType.int32"),
          real_size: 2,
          size: 4,
          endian: "abcd",
        },
        {
          name: this.$t("scanCMD.item.modbusRegType.uint32"),
          real_size: 2,
          size: 4,
          endian: "abcd",
        },
        {
          name: this.$t("scanCMD.item.modbusRegType.int64"),
          real_size: 4,
          size: 8,
          endian: "abcdefgh",
        },
        {
          name: this.$t("scanCMD.item.modbusRegType.uint64"),
          real_size: 4,
          size: 8,
          endian: "abcdefgh",
        },
        {
          name: this.$t("scanCMD.item.modbusRegType.float"),
          real_size: 2,
          size: 4,
          endian: "abcd",
        },
        {
          name: this.$t("scanCMD.item.modbusRegType.double"),
          real_size: 4,
          size: 8,
          endian: "abcdefgh",
        },
      ],

      error_list: [],
    };
  },
  mounted() {},
  components: {
    Modal,
    PerfectScaling,
  },
  methods: {
    // 处理行点击事件
    handleRowClick(event, index) {
      if (event.ctrlKey) {
        // Ctrl+点击: 多选/取消选择
        this.toggleRowSelection(index);
      } else if (event.shiftKey && this.lastSelectedIndex !== -1) {
        // Shift+点击: 范围选择
        this.selectRange(this.lastSelectedIndex, index);
      } else {
        // 普通点击: 单选
        this.clearSelection();
        this.selectRow(index);
      }
      this.lastSelectedIndex = index;
    },

    // 切换行选择状态
    toggleRowSelection(index) {
      if (this.selectedRows.has(index)) {
        this.selectedRows.delete(index);
      } else {
        this.selectedRows.add(index);
      }
    },

    // 选择行范围
    selectRange(start, end) {
      this.clearSelection();
      const min = Math.min(start, end);
      const max = Math.max(start, end);
      for (let i = min; i <= max; i++) {
        this.selectedRows.add(i);
      }
    },

    // 选择单行
    selectRow(index) {
      this.selectedRows.add(index);
    },

    // 清除所有选择
    clearSelection() {
      this.selectedRows.clear();
    },

    // 检查行是否被选中
    isSelected(index) {
      return this.selectedRows.has(index);
    },

    // 处理右键菜单
    handleContextMenu(event, index) {
      this.contextMenu = {
        visible: true,
        x: event.pageX, // 改用pageX/pageY
        y: event.pageY,
        targetIndex: index,
      };

      console.log(this.contextMenu);
      // 如果右键的行未被选中，则清除其他选择并选中当前行
      if (!this.isSelected(index)) {
        this.clearSelection();
        this.selectRow(index);
      }

      // 点击其他地方关闭菜单
      document.addEventListener("click", this.closeContextMenu);
    },

    // 关闭右键菜单
    closeContextMenu() {
      this.contextMenu.visible = false;
      document.removeEventListener("click", this.closeContextMenu);
    },

    // 复制选中的行
    copySelectedRows() {
      if (this.selectedRows.size === 0) return;

      // 按索引排序后复制数据
      this.copiedRows = Array.from(this.selectedRows)
        .sort((a, b) => a - b)
        .map((index) =>
          JSON.parse(JSON.stringify(this.getConfig.scanCMD_config[index]))
        );

      this.closeContextMenu();
    },

    // 粘贴行
    pasteRows() {
      if (this.copiedRows.length === 0) return;

      // 检查是否超出480条限制
      const newLength =
        this.getConfig.scanCMD_config.length + this.copiedRows.length;
      if (newLength > 480) {
        alert(
          `超出最大限制480条，当前已使用${this.getConfig.scanCMD_config.length}条，无法粘贴${this.copiedRows.length}条`
        );
        return;
      }

      // 获取粘贴位置
      const insertIndex = this.contextMenu.targetIndex + 1;

      // 插入复制的行
      this.getConfig.scanCMD_config.splice(
        insertIndex,
        0,
        ...JSON.parse(JSON.stringify(this.copiedRows))
      );

      // 更新选中状态
      this.clearSelection();
      for (let i = 0; i < this.copiedRows.length; i++) {
        this.selectedRows.add(insertIndex + i);
      }

      this.closeContextMenu();
      this.checkRule(); // 检查规则
    },

    // 拖拽开始
    handleDragStart(event, index) {
      this.dragItemIndex = index;
      event.dataTransfer.effectAllowed = "move";

      // 如果拖拽的行未被选中，则清除其他选择并选中当前行
      if (!this.isSelected(index)) {
        this.clearSelection();
        this.selectRow(index);
      }
    },

    // 拖拽悬停
    handleDragOver(event, index) {
      event.preventDefault();
      this.dragOverIndex = index;
    },

    // 拖拽进入
    handleDragEnter(event, index) {
      event.preventDefault();
      this.dragOverIndex = index;
    },

    // 拖拽离开
    handleDragLeave(event) {
      // 可以添加视觉反馈
    },

    // 拖拽放下
    handleDrop(event, targetIndex) {
      event.preventDefault();

      if (this.dragItemIndex === null || this.dragItemIndex === targetIndex) {
        this.dragItemIndex = null;
        this.dragOverIndex = null;
        return;
      }

      // 处理多行拖拽
      if (this.selectedRows.size > 1) {
        this.moveMultipleRows(targetIndex);
      } else {
        // 处理单行拖拽
        this.moveSingleRow(targetIndex);
      }

      this.dragItemIndex = null;
      this.dragOverIndex = null;
    },

    // 移动单行
    moveSingleRow(targetIndex) {
      const itemToMove = this.getConfig.scanCMD_config[this.dragItemIndex];
      this.getConfig.scanCMD_config.splice(this.dragItemIndex, 1);
      this.getConfig.scanCMD_config.splice(targetIndex, 0, itemToMove);

      // 更新选中状态
      this.clearSelection();
      this.selectRow(targetIndex);
    },

    // 移动多行
    moveMultipleRows(targetIndex) {
      // 获取选中的行并按索引排序
      const selectedIndices = Array.from(this.selectedRows).sort(
        (a, b) => a - b
      );

      // 检查目标位置是否在选中区域内
      const minIndex = Math.min(...selectedIndices);
      const maxIndex = Math.max(...selectedIndices);

      if (targetIndex >= minIndex && targetIndex <= maxIndex + 1) {
        // 如果目标位置在选中区域内，则不执行移动
        return;
      }

      // 提取要移动的行
      const itemsToMove = selectedIndices.map((index) =>
        JSON.parse(JSON.stringify(this.getConfig.scanCMD_config[index]))
      );

      // 计算插入位置
      let insertIndex = targetIndex;
      if (targetIndex > maxIndex) {
        insertIndex = targetIndex - selectedIndices.length;
      }

      // 删除原位置的行
      for (let i = selectedIndices.length - 1; i >= 0; i--) {
        this.getConfig.scanCMD_config.splice(selectedIndices[i], 1);
      }

      // 插入到新位置
      this.getConfig.scanCMD_config.splice(insertIndex, 0, ...itemsToMove);

      // 更新选中状态
      this.clearSelection();
      for (let i = 0; i < selectedIndices.length; i++) {
        this.selectedRows.add(insertIndex + i);
      }
    },
    dblClickToSelectAll() {
      //翻转isDblClickToSelectAll
      this.isDblClickToSelectAll = !this.isDblClickToSelectAll;
      //双击启用时，自动选中所有的寄存器
      for (var i = 0; i < this.deviceConfig_local.scanCMD_config.length; i++) {
        //检查是否有错误
        if (
          this.error_list[i] != undefined &&
          this.error_list[i].hasError == true
        )
          continue;
        //检查channel_id是否为255
        if (this.deviceConfig_local.scanCMD_config[i].channel_id == 255)
          continue;

        this.deviceConfig_local.scanCMD_config[i].CMD_enable =
          this.isDblClickToSelectAll;
      }
      //执行规则检查
      checkRule();
    },
    modal_close_handle() {
      //刷新页面
      window.location.reload();
    },
    //添加新的一行
    add() {
      var maxlength = this.deviceConfig_local.config_static.scanCMD_max_count;
      // 检查是否超过最大容量
      if (this.deviceConfig_local.scanCMD_config.length >= maxlength) {
        alert(
          this.$t("scanCMD.msg.addErrMsg") +
            maxlength +
            this.$t("scanCMD.msg.addErrMsgUnit")
        );
        return;
      }
      // 添加新的一行
      let newRow = {
        CMD_enable: false,
        modbus_smart_registerAddress_enable: true,
        RW_permission: 1,
        channel_type: 0,
        channel_id: 255,
        channel_protocol: 0,
        modbus_address: 1,
        modbus_CMD: 3,
        modbus_registerAddress: 50,
        modbus_registerType: 3,
        modbus_registerEndian: "ab",
        modbus_registerCount: 10,
        modbus_registerSize: 10,
        gateway_block_registerAddress: 0,
        exceptionCode: 0,
        CMD_interval: 1000,
      };
      this.deviceConfig_local.scanCMD_config.push(newRow);
    },
    // 删除一行
    del(index) {
      this.deviceConfig_local.scanCMD_config.splice(index, 1);
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
            alert(this.$t("scanCMD.msg.saveErrMsg") + data.code);
          }
        },
      });
    },
    //获取提供给 接口通道 的选择列表。如果“接口类型”选中了“串口通道”，则从"this.$store.state.deviceConfig_local.serial_config[i]"中寻找"serial_enable":true并且"serial_model": 1的选项。如果“接口类型”选中了“远程从机通道”，则从"this.$store.state.deviceConfig_local.remote_config[i]"中寻找"remote_slave_enable":true的选项。为每一个选项都生成一份list
    getChannelList(channel_type) {
      var channelList = [];
      if (channel_type == 0) {
        //串口通道
        for (
          var i = 0;
          i < this.$store.state.deviceConfig_local.serial_config.length;
          i++
        ) {
          if (
            this.$store.state.deviceConfig_local.serial_config[i]
              .serial_enable == true &&
            this.$store.state.deviceConfig_local.serial_config[i]
              .serial_model == 1
          ) {
            channelList.push(i);
          }
        }
      } else {
        // 远程从机通道
        for (
          var i = 0;
          i < this.$store.state.deviceConfig_local.remote_config.length;
          i++
        ) {
          if (
            this.$store.state.deviceConfig_local.remote_config[i]
              .remote_enable == true
          ) {
            channelList.push(i);
          }
        }
      }
      //如果前两个都是1则去掉第一个
      if (channelList[0] == 1 && channelList[1] == 1) {
        channelList.shift();
      }
      return channelList;
    },
    //当寄存器类型变更时，自动填充字节序表达式
    handleRegisterTypeChange(i) {
      var registerType =
        this.$store.state.deviceConfig_local.scanCMD_config[i]
          .modbus_registerType;
      var registerEndian =
        this.register_type_size_endian_tf[registerType].endian;
      this.$store.state.deviceConfig_local.scanCMD_config[
        i
      ].modbus_registerEndian = registerEndian;

      checkRule();
    },
    getEndiaError(index) {
      if (this.error_list[index] != undefined)
        return this.error_list[index].gateway_endia_hasError;
      return false;
    },
    getEndiaErrorMsg(index) {
      if (this.error_list[index] != undefined)
        return this.error_list[index].gateway_endia_hasError_msg;
      return "";
    },
    getRegisterAddress_hasError(index) {
      if (this.error_list[index] != undefined)
        return this.error_list[index].gateway_block_registerAddress_hasError;
      return false;
    },
    //检查映射地址
    checkRegisterAddress() {
      // 改进后的 used_memory，将其支持二维并以 modbus_CMD 作为一个维度
      var used_memory = {};

      // 第一次遍历配置，计算已使用的内存区域
      for (var i = 0; i < this.deviceConfig_local.scanCMD_config.length; i++) {
        if (
          this.deviceConfig_local.scanCMD_config[i]
            .modbus_smart_registerAddress_enable == false
        ) {
          var modbusCMD = this.deviceConfig_local.scanCMD_config[i].modbus_CMD;
          var start =
            this.deviceConfig_local.scanCMD_config[i]
              .gateway_block_registerAddress;
          var end =
            start +
            this.deviceConfig_local.scanCMD_config[i].modbus_registerSize;

          // 检查是否有重叠，重叠的话将 this.error_list[i].gateway_block_registerAddress_hasError 设置为 true
          var hasError = false;
          if (!used_memory[modbusCMD]) {
            used_memory[modbusCMD] = [];
          }

          for (var j = 0; j < used_memory[modbusCMD].length; j++) {
            if (
              (used_memory[modbusCMD][j].start <= start &&
                start < used_memory[modbusCMD][j].end) ||
              (used_memory[modbusCMD][j].start <= end &&
                end <= used_memory[modbusCMD][j].end) ||
              (start <= used_memory[modbusCMD][j].start &&
                used_memory[modbusCMD][j].end <= end)
            ) {
              // 重叠
              hasError = true;
              break;
            }
          }
          if (hasError) {
            // 重叠
            this.error_list[i].gateway_block_registerAddress_hasError = true;
          } else {
            // 不重叠
            this.error_list[i].gateway_block_registerAddress_hasError = false;
            used_memory[modbusCMD].push({ start: start, end: end });
          }
        }
      }

      // 对 used_memory 中每个 modbusCMD 对应的数组进行排序
      for (var modbusCMD in used_memory) {
        used_memory[modbusCMD].sort(function (a, b) {
          return a.start - b.start;
        });
      }

      // 第二次遍历配置，寻找启用 "modbus_smart_registerAddress_enable" 的配置项
      for (var i = 0; i < this.deviceConfig_local.scanCMD_config.length; i++) {
        if (
          this.deviceConfig_local.scanCMD_config[i]
            .modbus_smart_registerAddress_enable == true
        ) {
          var modbusCMD = this.deviceConfig_local.scanCMD_config[i].modbus_CMD;
          var start = 0;
          var end = 0;
          var find = false;

          // 判断第一位是否可以插入
          if (used_memory[modbusCMD] && used_memory[modbusCMD].length > 0) {
            if (
              used_memory[modbusCMD][0].start >
              this.deviceConfig_local.scanCMD_config[i].modbus_registerSize
            ) {
              // 可以插入
              start = 0;
              end =
                start +
                this.deviceConfig_local.scanCMD_config[i].modbus_registerSize;
              // 插入到最前面
              used_memory[modbusCMD].splice(0, 0, { start: start, end: end });
              find = true;
            } else {
              for (var j = 1; j < used_memory[modbusCMD].length; j++) {
                // 可以通过 used_memory[i+1].start - used_memory[i].end 去得到一个空位区间
                if (
                  used_memory[modbusCMD][j].start -
                    used_memory[modbusCMD][j - 1].end >=
                  this.deviceConfig_local.scanCMD_config[i].modbus_registerSize
                ) {
                  // 找到空位
                  start = used_memory[modbusCMD][j - 1].end;
                  end =
                    start +
                    this.deviceConfig_local.scanCMD_config[i]
                      .modbus_registerSize;
                  find = true;
                  // 标记到 used_memory 的指定位置中，确保排序
                  used_memory[modbusCMD].splice(j, 0, {
                    start: start,
                    end: end,
                  });
                  break;
                }
              }
            }
          }
          if (!find) {
            // 未找到空位
            if (!used_memory[modbusCMD]) {
              used_memory[modbusCMD] = [];
            }
            if (used_memory[modbusCMD].length == 0) {
              start = 0;
              end =
                start +
                this.deviceConfig_local.scanCMD_config[i].modbus_registerSize;
            } else {
              start =
                used_memory[modbusCMD][used_memory[modbusCMD].length - 1].end;
              end =
                start +
                this.deviceConfig_local.scanCMD_config[i].modbus_registerSize;
            }
            // 标记到 used_memory 中
            used_memory[modbusCMD].push({ start: start, end: end });
          }

          // 设置 "gateway_block_registerAddress"
          this.deviceConfig_local.scanCMD_config[
            i
          ].gateway_block_registerAddress = start;
          // 不重叠
          this.error_list[i].gateway_block_registerAddress_hasError = false;
        }
      }
    },
    //检查字节序表达式
    checkEndian() {
      //对modbus_registerEndian字节序表达式进行校验.表达式长度应该等于对应的register_type_size_endian_tf->size;并且表达式中的字母应该都是小写字母a~h，每个字母只允许出现一次，不允许出现其他字符；如果size=4,则表达式长度应该等于4，且表达式中的字母应该是abcd，不允许出现其他字符
      for (
        var i = 0;
        i < this.$store.state.deviceConfig_local.scanCMD_config.length;
        i++
      ) {
        var registerType =
          this.$store.state.deviceConfig_local.scanCMD_config[i]
            .modbus_registerType;
        var registerStandardEndian =
          this.register_type_size_endian_tf[registerType].endian;
        var registerStandardSize =
          this.register_type_size_endian_tf[registerType].size;
        var registerEndian =
          this.$store.state.deviceConfig_local.scanCMD_config[i]
            .modbus_registerEndian;
        //对字符串进行排序
        var registerEndianOrder = registerEndian.split("").sort().join("");

        //消除标志
        this.error_list[i].gateway_endia_hasError = false;

        //检查长度
        if (registerEndian.length != registerStandardSize) {
          this.error_list[i].gateway_endia_hasError = true;
          this.error_list[i].gateway_endia_hasError_msg =
            this.$t("scanCMD.msg.endiaLengthErrMsg") +
            registerStandardSize +
            this.$t("scanCMD.msg.endiaLengthErrMsgUnit");
          break;
        }
        //检查registerEndianOrder字母是否重复，并且是否出现跳变，注意应该从'a'起始
        for (var j = 0; j < registerEndianOrder.length; j++) {
          if (
            registerEndianOrder[j] != String.fromCharCode("a".charCodeAt() + j)
          ) {
            this.error_list[i].gateway_endia_hasError = true;
            this.error_list[i].gateway_endia_hasError_msg = this.$t(
              "scanCMD.msg.endiaInitialErrMsg"
            );
            break;
          }
        }

        //检查是否有重复字母
        for (var j = 0; j < registerEndianOrder.length - 1; j++) {
          if (registerEndianOrder[j] == registerEndianOrder[j + 1]) {
            this.error_list[i].gateway_endia_hasError = true;
            this.error_list[i].gateway_endia_hasError_msg = this.$t(
              "scanCMD.msg.endiaLetterErrMsg"
            );
            break;
          }
        }
        //检查是否有非法字母
        for (var j = 0; j < registerEndianOrder.length; j++) {
          if (registerEndianOrder[j] < "a" || registerEndianOrder[j] > "h") {
            this.error_list[i].gateway_endia_hasError = true;
            this.error_list[i].gateway_endia_hasError_msg = this.$t(
              "scanCMD.msg.endiaExprErrMsg"
            );
            break;
          }
        }
      }
    },
    checkRule() {
      //初始化 error_list
      this.error_list = [];
      for (var i = 0; i < this.deviceConfig_local.scanCMD_config.length; i++) {
        this.error_list.push({
          hasError: false,
          gateway_block_registerAddress_hasError: false,
          gateway_endia_hasError: false,
        });
      }

      //检查字节序表达式
      this.checkEndian();

      //检查映射地址
      this.checkRegisterAddress();

      //计算errorList，有任何错误则设置hasError
      for (var i = 0; i < this.error_list.length; i++) {
        if (
          this.error_list[i].gateway_block_registerAddress_hasError == true ||
          this.error_list[i].gateway_endia_hasError == true
        ) {
          this.error_list[i].hasError = true;
          //禁用选项
          this.deviceConfig_local.scanCMD_config[i].CMD_enable = false;
        } else {
          this.error_list[i].hasError = false;
        }
      }

      //将通道引用 SerialChannelReferencedCheck 和 RemoteSlaveChannelReferencedCheck fill为false
      this.deviceConfig_local.SerialChannelReferencedCheck.fill(false);
      this.deviceConfig_local.RemoteChannelReferencedCheck.fill(false);

      //遍历规则
      for (var i = 0; i < this.deviceConfig_local.scanCMD_config.length; i++) {
        //对读写权限进行约束
        if (
          this.deviceConfig_local.scanCMD_config[i].modbus_CMD == 1 ||
          this.deviceConfig_local.scanCMD_config[i].modbus_CMD == 2
        ) {
          //读线圈或读离散输入
          this.deviceConfig_local.scanCMD_config[i].RW_permission = 1;
        }

        //重新计算modbus_registerSize=modbus_registerCount*sizeof(modbus_registerType)
        this.deviceConfig_local.scanCMD_config[i].modbus_registerSize =
          this.deviceConfig_local.scanCMD_config[i].modbus_registerCount *
          this.register_type_size_endian_tf[
            this.deviceConfig_local.scanCMD_config[i].modbus_registerType
          ].real_size;

        //重新计算通道引用 SerialChannelReferencedCheck 和 RemoteChannelReferencedCheck
        if (
          this.deviceConfig_local.scanCMD_config[i].CMD_enable &&
          this.deviceConfig_local.scanCMD_config[i].channel_id != -1
        ) {
          if (this.deviceConfig_local.scanCMD_config[i].channel_type == 0) {
            //串口通道
            this.deviceConfig_local.SerialChannelReferencedCheck[
              this.deviceConfig_local.scanCMD_config[i].channel_id
            ] = true;
          } else {
            //远程从机通道
            this.deviceConfig_local.RemoteChannelReferencedCheck[
              this.deviceConfig_local.scanCMD_config[i].channel_id
            ] = true;
          }
        }
      }
    },
  },
  created() {
    //页面创建后 拉取 设备配置
    this.$store.dispatch("getConfig");
  },
  computed: {
    ...mapState(["deviceConfig_local"]),
    //从vuex获取设备配置信息
    getConfig() {
      if (this.$store.state.deviceConfig_local != undefined) {
        return this.$store.state.deviceConfig_local;
      } else return {};
    },
    getConfig_scanCMD_config() {
      if (this.$store.state.deviceConfig_local != undefined) {
        if (this.scanCMD_config_cache == undefined) {
          this.scanCMD_config_cache =
            this.$store.state.deviceConfig_local.scanCMD_config.slice(0, 10);
        }
        return this.scanCMD_config_cache;
      } else return {};
    },
    checkChannelNum() {
      return this.getChannelList(0).length + this.getChannelList(1).length;
    },
  },
};
</script>

<style scoped>
/* 选中行的样式 */
.table-primary {
  background-color: #cfe2ff !important;
}

/* 可拖拽行的光标样式 */
.draggable-row {
  cursor: default;
}

/* 右键菜单样式 */
.context-menu {
  position: fixed !important;
  z-index: 1000;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0;
  padding: 0;
  min-width: 120px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.context-menu-item {
  padding: 8px 12px;
  cursor: pointer;
}

.context-menu-item:hover {
  background-color: #f8f9fa;
}

/* 拖拽时的视觉反馈 */
.draggable-row.drag-over {
  border-top: 2px solid #0d6efd;
}
</style>
