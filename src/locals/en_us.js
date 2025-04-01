// en.js
export default {
    loading: 'Loading...',
    saving: 'Saving...',
    success: 'Success!',
    guiEditor: "GUI Editor",
	codeEditor: "Code Editor",
    theSerial: "Serial ",
    msg: {
        // 该项被寄存器映射设置引用，无法修改状态或者删除。如果需要改动，请从寄存器映射设置中移除相关的项目，并在保存后再改动串口配置项
        delErrMsg_referenced: "This item is referenced by the register mapping setting and cannot be modified or deleted. If you need to make changes, please remove the relevant items from the register mapping setting and then make changes to the channel configuration after saving.",
	},

    nav: {
        welcome: 'Welcome',
        changePassword: 'Change Password',
        toky: 'TOKY',
        modbusSmartGateway: 'Modbus Smart Gateway',
        updateConfig_local: 'Discard Staging Config',
        reboot: 'Reboot',
        rebootConfirm: 'Are you sure you want to reboot?',
        refresh: 'Refresh',
        userManual: 'User Manual',
    },
    login: {
        login: 'Login',
        userName: 'User name',
        password: 'Password',
        userNamePlaceholder: 'Enter User Name',
        passwordPlaceholder: 'Please Enter Password',
        loginFailurePrompt: 'Login Failed',
        logOut: 'Log Out',
    },
    menu: {
        home: "Introduction",
        general: "General",
        gateway: "Gateway",
        serial: "Serial",
        remote: "Remote",
        scanCMD: "Mapping",
        logViewer: "Log",
    },
    home: {
        title: 'Introduction',
        deviceName: 'Device Name',
        deviceFirmwareVersion: 'Device Firmware Version',
        deviceDHCPStatus: 'Device DHCP Status',
        deviceMAC: 'Device MAC',
        deviceIPv4Address: 'Device IPv4 Address',
        deviceIPv4Mask: 'Device IPv4 Mask',
        deviceIPv4Gateway: 'Device IPv4 Gateway',
        deviceIPv4DNSServer: 'Device IPv4 DNS Server',
        serialChannelNumber: 'Serial Channel Number',
        remoteChannelNumber: 'Remote Channel Number',
        gatewayChannelNumber: 'Gateway Channel Number',
        channelProgrammingCapacity: 'Channel Programming Capacity',
        productSerialNumberSN: 'Product Serial Number',
    },
    logViewer: {
        title: 'Log',
        export: 'Export',
        exportLog: 'Export Log',
    },
    general: {
        networkSettings: {
            "title": "Network Settings",
            "deviceNameLabel": "Device Name",
            "ipv4AddressLabel": "IPv4 Address",
            "ipv4MaskLabel": "IPv4 Network Mask",
            "ipv4GatewayLabel": "IPv4 Gateway",
            "dnsLabel": "DNS",
            "saveButton": "Save"
        },
        eth0Info: {
            "title": "eth0",
            "dhcpLabel": "DHCP",
            "ipv4Address": "Device IPv4 Address",
            "ipv4Mask": "Device IPv4 Mask",
            "ipv4Gateway": "Device IPv4 Gateway",
            "dnsServer": "Device IPv4 DNS Server",
            "macAddress": "Device MAC"
        },
        changePassword: {
            "title": "Change Password",
            "newPasswordLabel": "New Password",
            "confirmPasswordLabel": "Confirm New Password",
            "saveButton": "Save"
        },
        programUpdate: {
            "title": "Program Update",
            "frontendVersionLabel": "Frontend Program Version",
            "backendVersionLabel": "Backend Program Version",
            "executeUpdateButton": "Execute Program Update"
        },
        configFileManagement: {
            "title": "Configuration File Management",
            "importConfigFileButton": "Import Configuration File",
            "exportConfigFileButton": "Export Configuration File",
            "restoreFactoryConfigButton": "Restore Factory Configuration",
            "restoreFactoryConfigConfirm": "Are you sure you want to restore the factory configuration?",
            "importConfigFileConfirm": "Are you sure you want to import the configuration file?",

            "configFileFilter": "Configuration Filter",
            "configFileFilter_introduce": "Select the configuration part to be imported/exported",
			"networkAdapter": "Network Adapter Config",
			"gatewaySetting": "Gateway Config",
			"serialSetting": "Serial Port Config",
			"remoteSlave": "Remote Slave Config",
			"registerMapping": "Register Mapping Config"
        },
        "uploadConfig": {
            "successMessage": {
                "title": "Save Success",
                "mode": "OK",
                "body": "Save Success!\nRedirecting to\nhttp://"
            },
            "errorMessage": {
                "title": "Save Failed",
                "mode": "ERROR",
                "body": "code:{{errorCode}}"
            }
        }
    },
    modalVue: {
        confirm: "Confirm"
    },
    gateway: {
        "title": "Gateway Channel",
        "capacity": "Capacity: ",
        "bar": {
            "channel": "Channel",
            "enable": "Enable",
            "protocol": "Modbus Protocol",
            "networkModel": "Network Model",
            "devicePort": "Device Port",
            "remoteAddress": "Remote Address",
            "remotePort": "Remote Port"
        },
        "item": {
            "tcpServer": "TCP Server",
            "tcpClient": "TCP Client",
            "udp": "UDP",
            "delete": "Delete"
        },
        "bottom": {
            "add": "Add",
            "save": "Save"
        },
        "modal": {
            "title": "Success"
        },
        "msg": {
            "addErrMsg": "Exceed maximum capacity: ",
            "addErrMsgUnit": " cases",
            "saveErrMsg": "Save failed, code:"
        }
    },
    "serial": {
        "title": "Serial Port Channel",
        "capacity": "Capacity: ",
        "bar": {
            "channel": "Channel",
            "enable": "Enable",
            "serialDevice": "Serial ID",
            "serialModel": "Serial Mode",
            "modbusAddress": "Modbus Address",
            "modbusTimeout": "Modbus Timeout (ms)",
            "modbusInterval": "Modbus Command Interval (ms)",
            "baudrate": "Baud Rate",
            "dataBit": "Data Bit",
            "stopBit": "Stop Bit",
            "parityBit": "Parity Bit",
            "networkModel": "Network Mode",
            "devicePort": "Device Port",
            "remoteAddress": "Remote Address",
            "remotePort": "Remote Port",
            "hints": {
                "serialDevice": "Fill in the device tree path in Linux, e.g., /dev/ttyS1",
                "serialModel": "DTU Mode: Serial to Network Transparent Transmission<br><br>RTU Master Mode: Must be set as mode when using 'register mapping'<br><br>RTU Slave Mode: Similar to 'Gateway Channel,' accessing 'gateway registers' via the serial port<br><br>DTU MRTU Mode: Enable 'intelligent command caching,' different from regular DTU, the gateway intelligently caches frequently accessed instructions and actively polls the serial port slave. Suitable for scenarios where the serial port mounts a large number of low-speed slaves. MODBUS-RTU mode is used for accessing serial devices from the network end<br><br>DTU MTCP Mode: Different from DTU MRTU mode, MODBUS-TCP mode is used for accessing serial devices from the network end",
                "modbusAddress": "In RTU Slave Mode, this serial port will serve as a slave device that can be polled by the upper computer device, requiring a Modbus address to be set",
                "devicePort": "Set the network communication port for the device",
                "remoteAddress": "Set the IP address for remote communication, only valid in TCP client mode",
                "remotePort": "Set the port number for remote communication, only valid in TCP client mode"
            }
        },
        "item": {
            "deviceExistedMsg": "Duplicate serial devices found enabled",
            "noneParity": "None",
            "oddParity": "Odd",
            "evenParity": "Even",
            "tcpServer": "TCP Server",
            "tcpClient": "TCP Client",
            "udp": "UDP",
            "delete": "Delete"
        },
        "bottom": {
            "add": "Add",
            "save": "Save"
        },
        "modal": {
            "title": "Success"
        },
        "msg": {
            "addErrMsg": "Exceeded maximum capacity: ",
            "addErrMsgUnit": " items",
            "saveErrMsg": "Save failed, code: "
        }
    },
    "remote": {
        "title": "Remote Channel",
        "capacity": "Capacity: ",
        "bar": {
            "channel": "Channel",
            "enable": "Enable",
            "modbusTimeout": "Modbus Instruction Timeout (ms)",
            "modbusInterval": "Modbus Instruction Interval (ms)",
            "networkModel": "Network Mode",
            "devicePort": "Device Port",
            "remoteAddress": "Remote Address",
            "remotePort": "Remote Port"
        },
        "item": {
            "tcpServer": "TCP Server",
            "tcpClient": "TCP Client",
            "udp": "UDP",
            "delete": "Delete"
        },
        "bottom": {
            "add": "Add",
            "save": "Save"
        },
        "modal": {
            "title": "Success"
        },
        "msg": {
            "addErrMsg": "Exceeded Maximum Capacity: ",
            "addErrMsgUnit": " items",
            "saveErrMsg": "Save Failed, Code:"
        }
    },
    "scanCMD": {
        "title": "Register Mapping",
        "capacity": "Capacity: ",
        "bar": {
            "sn": "Serial Number",
            "enable": "Enable",
            "interfaceType": "Interface Type",
            "interfaceChannel": "Interface Channel",
            "channelProtocol": "Channel Protocol",
            "modbusAddress": "Modbus Address",
            "modbusFunctionCode": "Modbus Function Code",
            "modbusRegAddress": "Modbus Register Address",
            "modbusRegType": "Modbus Register Type",
            "byteOrderedExpression": "Byte Order Expression",
            "modbusRegNumber": "Modbus Register Number",
            "occupiedRegister": "Occupied Register",
            "smartAddress": "Smart Address",
            "mappedRegAddress": "Gateway Mapped Register Address",
            "rw": "Read/Write Permissions",
            "errorValue": "Error Value",
            "interval": "Scan Interval",
            "hints": {
                "interfaceChannel": "If the required channel ID is not in the dropdown, check the corresponding 'Channel Type' configuration",
                "byteOrderedExpression": "Use lowercase letters to express, with the letter 'a' as the start of the low byte data and 'h' as the end of the high byte data, with each letter representing one byte (1 byte = 8 bits) of byte order.<br>eg:<br>Expression 'abcd' represents big-endian byte order, where the high-order byte of the data is stored at the low memory address, and the low-order byte is stored at the high memory address. Supports irregular byte orders, such as 'acbd'",
                "rw": "Under some special Modbus instructions, it is read-only mode",
                "errorValue": "Automatically fills the gateway register with the 'Error Value' in case of communication failure"
            }
        },
        "item": {
            "channelType": {
                "serialChannel": "Serial Channel",
                "remoteSalveChannel": "Remote Slave Channel"
            },
            "modbusFC": {
                "option1": "1 Read Coil Status",
                "option2": "2 Read Input Status",
                "option3": "3 Read Holding Register",
                "option4": "4 Read Input Register"
            },
            "modbusRegType": {
                "bool": "Boolean",
                "int8": "8-bit Signed Integer",
                "uint8": "8-bit Unsigned Integer",
                "int16": "16-bit Signed Integer",
                "uint16": "16-bit Unsigned Integer",
                "int32": "32-bit Signed Integer",
                "uint32": "32-bit Unsigned Integer",
                "int64": "64-bit Signed Integer",
                "uint64": "64-bit Unsigned Integer",
                "float": "Single Precision Float",
                "double": "Double Precision Float"
            },
            "rw": {
                "readOnly": "Read Only",
                "writeOnly": "Write Only",
                "both": "Read/Write"
            },
            "delete": "Delete",
            "errorMsg": "Address Conflict! Turn on 'Smart Address' for one-click correction",
        },
        "bottom": {
            "add": "Add",
            "save": "Save"
        },
        "modal": {
            "title": "Success"
        },
        "msg": {
            "addErrMsg": "Exceeds maximum capacity: ",
            "addErrMsgUnit": " entries",
            "saveErrMsg": "Save failed, code: ",
            "endiaLengthErrMsg": "Byte order expression length error, should be",
            "endiaLengthErrMsgUnit": " bytes",
            "endiaInitialErrMsg": "Byte order expression error, should start with the letter 'a' and should not have transitions",
            "endiaLetterErrMsg": "No duplicate letters allowed",
            "endiaExprErrMsg": "Byte order expression error, can only use lowercase letters a~h",
            "configCheck": "Checking configuration, please wait",
            "noAvailableChannel": "No Available Channel: Please go to 'Serial Port Settings' or 'Remote Slave Settings' to add 'RTU Master' type channels first",
        }
    },
    "factory": {
        "title": "Factory Settings",
        "finishButton": "Finish",
        "serialNumber": "Device Serial Number (SN)",
        "serialNumberInputHint": "Please enter a 16-digit device serial number",
        "save": "Save",
        "macAddress": "MAC Address",
        "copyButton": "Copy",
        "msg": {
            "copyOkMsg": "Copy successful",
            "snNullErrMsg": "Serial number cannot be empty",
            "snLengthErrMsg": "Serial number must be 16 digits",
            "snExprErrMsg": "Serial number must be alphanumeric",
            "saveErrMsg": "Save failed"
        }
    }
}
