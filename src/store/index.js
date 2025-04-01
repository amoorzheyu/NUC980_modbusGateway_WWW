import { createStore } from 'vuex';
//引入vuex-persistedstate
import createPersistedState from 'vuex-persistedstate'

// const baseUrl="http://192.168.3.240"

async function makeRequest(url, method, data = null, headers = {}) {
  // url = baseUrl + url;
    try {
      const options = {
        method,
        headers: {
          ...headers,
        },
        credentials: 'include',
      };
  
      // 获取存储的会话信息（例如access_token）
      // const storedToken = localStorage.getItem('access_token');
      // if (storedToken) {
      //   options.headers.Authorization = `Bearer ${storedToken}`;
      // }
      //获取缓存的账号密码
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      if (username) {
        const basicAuth = btoa(`${username}:${password}`);
        options.headers.Authorization = `Basic ${basicAuth}`;
      }
  
      if (data) {
        const contentType = headers['Content-Type'];
        if (contentType && contentType.toLowerCase() === 'application/json') {
          options.body = JSON.stringify(data);
        } else {
          throw new Error('Invalid Content-Type. Data should be of type "application/json".');
        }
      }
  
      const response = await fetch(url, options);
  
      if (!response.ok) {
        if (response.status === 403) {
          // 会话过期，刷新页面
          sessionStorage.clear();
          window.location.reload();
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
      }
  
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const responseData = await response.json();
        return responseData;
      } else if (contentType && contentType.includes('application/plain')) {
        const responseData = await response.text();
        return responseData;
      } else {
        return response;
      }
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  }
  
  
  
  

export default createStore({
  // 状态
  state: {
    deviceConfig: {},
    deviceConfig_local: {},
    progress: 0,
    log: "",
    TTY_dev: [],
    isLoadingRemoteConfig: false,
    alert_color: "warning",
    alert_context: ""
  },
  mutations: {
    setConfig(state, config) {
      //判断mode是否存在，不存在则添加，并定义值为"normal"
      if (config.mode == undefined) {
        config.mode = "normal";
      }
      // 执行格式转换：select输出字符串格式，需要转换为数字类型,注意，转换前要先判断是否存在对应的字段
      if (config.serial_config != undefined){
        for (var i = 0; i < config.serial_config.length; i++) {
          config.serial_config[i].serial_model = parseInt(
            config.serial_config[i].serial_model
          );
          config.serial_config[i].serial_baudrate = parseInt(
            config.serial_config[i].serial_baudrate
          );
          config.serial_config[i].serial_bytesize = parseInt(
            config.serial_config[i].serial_bytesize
          );
          config.serial_config[i].serial_stopbits = parseInt(
            config.serial_config[i].serial_stopbits
          );
          config.serial_config[i].serial_parity = parseInt(
            config.serial_config[i].serial_parity
          );
          config.serial_config[i].network_config.network_model = parseInt(
            config.serial_config[i].network_config.network_model
          );
        }
      }
      if (config.network_config != undefined){
        for (var i = 0; i < config.remote_config.length; i++) {
          config.remote_config[i].network_config.network_model = parseInt(
            config.remote_config[i].network_config.network_model
          );
        }
      }
      if (config.modbus_config != undefined){
        for (var i = 0; i < config.gateway_config.length; i++) {
          config.gateway_config[i].gateway_model = parseInt(
            config.gateway_config[i].gateway_model
          );
          config.gateway_config[i].network_config.network_model = parseInt(
            config.gateway_config[i].network_config.network_model
          );
        }
      }

      //按照真实大小创建引用检查数组
      config.SerialChannelReferencedCheck = new Array(config.config_static.serial_max_count).fill(false);
      config.RemoteChannelReferencedCheck = new Array(config.config_static.remote_max_count).fill(false);

      if (config.scanCMD_config != undefined) {
        for (var i = 0; i < config.scanCMD_config.length; i++) {
          config.scanCMD_config[i].channel_type = parseInt(
            config.scanCMD_config[i].channel_type
          );
          config.scanCMD_config[i].channel_protocol = parseInt(
            config.scanCMD_config[i].channel_protocol
          );
          config.scanCMD_config[i].modbus_CMD = parseInt(
            config.scanCMD_config[i].modbus_CMD
          );
          //检查通道引用情况
          if (config.scanCMD_config[i].CMD_enable && config.scanCMD_config[i].channel_id != -1) {
            if (config.scanCMD_config[i].channel_type == 0) {
              config.SerialChannelReferencedCheck[config.scanCMD_config[i].channel_id] = true;
            }else config.RemoteChannelReferencedCheck[config.scanCMD_config[i].channel_id] = true;
          }
        }
      }
      //remote-> network_config-> network_model
      if (config.remote_config != undefined) {
        for (var i = 0; i < config.remote_config.length; i++) {
          config.remote_config[i].network_config.network_model = parseInt(
            config.remote_config[i].network_config.network_model
          );
        }
      }
      state.deviceConfig = config;
      //如果本地配置缓存是空的，则将当前配置缓存到本地
      if (Object.keys(state.deviceConfig_local).length === 0) {
        this.commit('updateConfig_local', config);
      }
      //设置加载完成标志
      state.isLoadingRemoteConfig = false;
    },
    //覆盖本地配置
    updateConfig_local(state, config) {
      state.deviceConfig_local = config;
    },
    updateResourceUsage(state, resUsage) {
      state.resUsage = resUsage;
    },
    updateTTY_dev(state, TTY_dev) {
      // 移除ttyS0
      TTY_dev = TTY_dev.filter(device => device !== "ttyS0");
    
      // 匹配tty****USB的正则表达式
      const usbRegex = /^tty\w+USB(\d+)/;
    
      // 找到tty设备中的最大序号
      let maxTtyNumber = 0;
      TTY_dev.forEach(device => {
        if (device.startsWith("ttyS")) {
          const ttyNumber = parseInt(device.replace("ttyS", ""));
          if (ttyNumber > maxTtyNumber) {
            maxTtyNumber = ttyNumber;
          }
        }
      });
    
      // 处理TTY设备名称，生成相应的path和label
      const ttyDevices = TTY_dev.filter(device => device.startsWith("ttyS"))
                               .map(device => {
                                 const ttyNumber = parseInt(device.replace("ttyS", ""));
                                 return {
                                   path: '/dev/' + device,
                                   label: `串口${ttyNumber}`
                                 };
                               });
    
      // 处理USB设备名称，生成相应的path和label
      const usbDevices = TTY_dev.filter(device => usbRegex.test(device))
                               .map(device => {
                                 const match = device.match(usbRegex);
                                 const usbNumber = parseInt(match[1]);
                                 return {
                                   path: '/dev/' + device,
                                   label: `串口${maxTtyNumber + 1 + usbNumber}`
                                 };
                               });
    
      // 合并tty和usb设备并排序
      const processedTTY_dev = ttyDevices.concat(usbDevices)
                                          .sort((a, b) => {
                                            const aNumber = parseInt(a.label.replace("串口", ""));
                                            const bNumber = parseInt(b.label.replace("串口", ""));
                                            return aNumber - bNumber;
                                          });
      state.TTY_dev = processedTTY_dev;
    },
    
    updateProgress(state, progress) {
      state.progress = progress;
    },
    updateGetLog(state, log) {
      state.log = log;
    },
    clearSession(state) {
      // 清空会话信息
      state.deviceConfig = {};
      state.deviceConfig_local = {};
      sessionStorage.clear();
    },
    setIsLoadingRemoteConfig(state, isLoading) {
      state.isLoadingRemoteConfig = isLoading;
    },
    setAlert_color(state, color) {
      state.alert_color = color
    },
    setAlert_context(state, context) {
      state.alert_context = context;
    }
  },
  // 获取器
  getters: {},
  // 动作
  actions: {
    //login，传递参数：用户名和密码
    async login({ commit }, { username, password }) {
      try {
        
          const basicAuth = btoa(`${username}:${password}`);
          const loginOptions = {
            method: 'POST',
            headers: {},
            credentials: 'include',
          };
          loginOptions.headers.Authorization = `Basic ${basicAuth}`;
  
          const loginResponse = await fetch(`/api/login`, loginOptions);
          // const loginResponse = await fetch(`${baseUrl}/api/login`, loginOptions);
  
          if (!loginResponse.ok) {
            return false;
          }
  
          // 保存会话信息
          const loginData = await loginResponse.json();
          if (loginData.user != undefined) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
          }
          // 调用getConfig
          await this.dispatch('getConfig');
           
          // 将响应数据传递给回调函数
          return true;
      } catch (error) {
        console.error(error);
      }
    },
    //logout
    async logout({ commit }, payload) {
      try {
        const response = await makeRequest('/api/logout', 'GET', null, {
          'Accept': 'application/json',
        });
        //clearSession
        commit('clearSession');
        // 将响应数据传递给回调函数
        payload.callback(response);
      } catch (error) {
        console.error(error);
      }
    },
    async reboot({ commit }, payload) {
      try {
        const response = await makeRequest('/api/reboot', 'GET', null, {
          'Accept': 'application/json',
        });
        // 将响应数据传递给回调函数
        payload.callback(response);
      } catch (error) {
        console.error(error);
      }
    },
    async kill({ commit }, payload) {
      try {
        const response = await makeRequest('/api/kill', 'GET', null, {
          'Accept': 'application/json',
        });
        // 将响应数据传递给回调函数
        payload.callback(response);
      } catch (error) {
        console.error(error);
      }
    },

    // 异步获取设备全局配置
    async getConfig({ commit }) {
      //设置弹窗
      commit('setAlert_context', 'loading');
      commit('setAlert_color', 'warning');
      commit('setIsLoadingRemoteConfig', true);
      var retry_conter = 0;
      while (retry_conter++<3) {
        try {
          const response = await makeRequest('/api/getConfig', 'POST', null, {
            'Accept': 'application/json',
          });
          commit('setConfig', response);
          break; // 成功获取数据，跳出循环
        } catch (error) {
          console.error(error);
          // 请求失败，等待1秒后重新发起请求
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    },
    async getResourceUsage({ commit }) {
      try {
        const response = await makeRequest('/api/getResourceUsage', 'GET', null, {
          'Accept': 'application/json',
        });
        commit('updateResourceUsage', response);
      } catch (error) {
        console.error(error);
      }
    },
    async getLog({ commit }) {
      //设置弹窗
      commit('setAlert_context', 'loading');
      commit('setAlert_color', 'warning');
      commit('setIsLoadingRemoteConfig', true);
      try {
        const response = await makeRequest('/api/getLog', 'GET', null, {
          'Accept': 'application/plain',
        });
        commit('updateGetLog', response);
        commit('setIsLoadingRemoteConfig', false);
      } catch (error) {
        console.error(error);
      }
    },
    async getTTY_dev({ commit }) {
      try {
        const response = await makeRequest('/api/getTTY_dev', 'GET', null, {
          'Accept': 'application/json',
        });
        commit('updateTTY_dev', response);
      } catch (error) {
        console.error(error);
      }
    },
    async updateConfig({ commit }, payload) {
      //设置警告弹窗
      commit('setAlert_context', 'saving');
      commit('setAlert_color', 'warning');
      commit('setIsLoadingRemoteConfig', true);
      try {
        const response = await makeRequest('/api/updateConfig', 'POST', this.state.deviceConfig, {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        });
        //设置成功弹窗文本
        commit('setAlert_context', 'success');
        commit('setAlert_color', 'success');
        //设置0.5秒后关闭弹窗
        setTimeout(() => {
          commit('setIsLoadingRemoteConfig', false);
          //记录新的ip地址
          const new_ip = this.state.deviceConfig.network_config.network_ipv4_address;
          //清除本地配置缓存
          commit('updateConfig_local', {});
          //设置跳转
          window.location.href = "http://" + new_ip;
          //刷新页面
          window.location.reload();
        }, 500);
        payload.callback(response); // 将响应数据传递给回调函数
      } catch (error) {
        throw new Error(`Request failed: ${error.message}`);
      }
    },
    async updateSN({ commit }, {SN}) {
      //GET方法，请求http://192.168.3.30/api/serialNumber?sn=23333
      try {
        const response = await makeRequest(`/api/serialNumber?sn=${SN}`, 'GET', null, {
          'Accept': 'application/json',
        });
        // 将响应数据传递给回调函数
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async restoreFactoryConfig({ commit }, payload) {
      try {
        const response = await makeRequest('/api/restoreFactoryConfig', 'GET', null, {
          'Accept': 'application/json',
        });
        payload.callback(response); // 将响应数据传递给回调函数
      } catch (error) {
        throw new Error(`Request failed: ${error.message}`);
      }
    },
    async uploadFile({ commit }, file) {
      try {
        // 发送文件数据
        const sendChunk = async (offset) => {
          const chunk = file.data.subarray(offset, offset + file.chunkSize) || '';
          const opts = {
            method: 'POST',
            body: chunk,
            headers: {
              Authorization: "",
            },
            credentials: 'include',
          };
          //获取缓存的账号密码
          const username = localStorage.getItem('username');
          const password = localStorage.getItem('password');
          if (username) {
            const basicAuth = btoa(`${username}:${password}`);
            opts.headers.Authorization = `Basic ${basicAuth}`;
          }
          const url = `/api/upload?offset=${offset}&name=${encodeURIComponent(file.name)}`;
          const res = await fetch(url, opts);
          if (res.ok && chunk.length > 0) {
              // 更新进度
              const progress = Math.floor((offset + chunk.length) * 100 / file.data.length);
              commit('updateProgress', progress);
              await sendChunk(offset + chunk.length);
          }
          if (!res.ok) throw new Error(res.statusText);
          const text = await res.text();
          return text;
        };
        await sendChunk(0);
      } catch (error) {
          commit('updateProgress', -1);
          throw new Error(`Error uploading file: ${error.message}`);
      }
    },
  },
  //配置vuex-persistedstate
  plugins: [createPersistedState(
  	//配置将vuex的状态储存到sessionStorage中（默认储存到localStorage中）
    { storage: window.sessionStorage }
  )]
});
