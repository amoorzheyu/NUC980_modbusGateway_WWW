<template>
    <div class="shadow rounded p-3 bg-white">
        <div class="mb-3">
            <h2 class="fw-lighter">{{ $t('home.title') }}</h2>
            <hr>
        </div>
        <!-- 设备信息 -->
        <ul class="list-group shadow-sm">
            <li class="list-group-item" v-for="(items, key, index) in translatedDeviceConfig" :key="index">
                <div class="row justify-content-between">
                    <span class="col-xs-12 col-sm-6 fw-bold">{{ key }}</span>
                    <span class="col-xs-12 col-sm-6 text-sm-end">{{ items }}</span>
                </div>
            </li>
            <li class="list-group-item">
                <div class="row justify-content-between">
                    <span class="col-xs-12 col-sm-6 fw-bold">{{ $t('home.productSerialNumberSN') }}</span>
                    <span class="col-xs-12 col-sm-6 text-sm-end">{{ this.deviceConfig.sn }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "Home",
    // ...其他部分不变...
    computed: {
        ...mapState(['deviceConfig']),
        // ...其他computed属性不变...

        //翻译设备配置信息的JSON键值对
        translatedDeviceConfig() {
            const translation = {
                device_name: 'deviceName',
                device_FW_Ver: 'deviceFirmwareVersion',
                device_MAC: 'deviceMAC',
                device_DHCP: 'deviceDHCPStatus',
                device_IPv4: 'deviceIPv4Address',
                device_IPv4_mask: 'deviceIPv4Mask',
                device_IPv4_gateway: 'deviceIPv4Gateway',
                device_IPv4_DNS: 'deviceIPv4DNSServer',
                serial_max_count: 'serialChannelNumber',
                remote_max_count: 'remoteChannelNumber',
                gateway_max_count: 'gatewayChannelNumber',
                scanCMD_max_count: 'channelProgrammingCapacity'
            };

            if (this.deviceConfig.config_static !== undefined) {
                return Object.keys(this.deviceConfig.config_static).reduce((translatedConfig, key) => {
                    if (key in translation) {
                        translatedConfig[this.$t('home.' + translation[key])] = this.deviceConfig.config_static[key];
                    }
                    return translatedConfig;
                }, {});
            } else {
                return {};
            }
        }
    }
};
</script>
