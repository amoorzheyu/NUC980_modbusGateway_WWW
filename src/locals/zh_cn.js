// zh.js
export default {
	loading: '加载中...',
	saving: '保存中...',
	success: '成功!',
	guiEditor: "图形化编辑器",
	codeEditor: "代码编辑器",
	theSerial: "串口",
	msg: {
		delErrMsg_referenced: "该项被寄存器映射设置引用，无法修改状态或者删除。如果需要改动，请从寄存器映射设置中移除相关的项目，并在保存后再改动配置项。",
	},

	nav: {
		welcome: '欢迎',
		changePassword: '修改密码',
		toky: '东崎仪表',
		modbusSmartGateway: 'Modbus智能网关',
		updateConfig_local: '放弃暂存区配置',
		reboot: '重启',
		rebootConfirm: '确定要重启吗？',
		refresh: '刷新',
		userManual: '用户手册',
	},
	login: {
		login: '登录',
		userName: '用户名',
		password: '密码',
		userNamePlaceholder: '请输入用户名',
		passwordPlaceholder: '请输入密码',
		loginFailurePrompt: '登陆失败',
		logOut: '退出登录',
	},
	menu: {
		home: "概述",
		general: "基本设置",
		gateway: "网关设置",
		serial: "串口设置",
		remote: "远程从机",
		scanCMD: "映射设置",
		logViewer: "日志",
	},
	home: {
		title: '概述',
		deviceName: '设备名称',
		deviceFirmwareVersion: '设备固件版本',
		deviceDHCPStatus: '设备DHCP状态',
		deviceMAC: '设备MAC',
		deviceIPv4Address: '设备IPv4地址',
		deviceIPv4Mask: '设备IPv4掩码',
		deviceIPv4Gateway: '设备IPv4网关',
		deviceIPv4DNSServer: '设备IPv4 DNS服务器',
		serialChannelNumber: '串口通道数量',
		remoteChannelNumber: '远程通道数量',
		gatewayChannelNumber: '网关通道数量',
		channelProgrammingCapacity: '通道编程容量',
		productSerialNumberSN: '产品序列号SN',
	},
	logViewer: {
		title: '日志',
		export: '导出',
		exportLog: '导出日志',
	},
	general: {
		networkSettings: {
			"title": "网络适配器",
			"deviceNameLabel": "设备名称",
			"ipv4AddressLabel": "IPv4地址",
			"ipv4MaskLabel": "Ipv4网络掩码",
			"ipv4GatewayLabel": "IPv4网关",
			"dnsLabel": "DNS",
			"saveButton": "保存"
		},
		eth0Info: {
			"title": "eth0",
			"dhcpLabel": "DHCP",
			"ipv4Address": "设备IPv4地址",
			"ipv4Mask": "设备IPv4掩码",
			"ipv4Gateway": "设备IPv4网关",
			"dnsServer": "设备IPv4 DNS服务器",
			"macAddress": "设备MAC"
		},
		changePassword: {
			"title": "修改密码",
			"newPasswordLabel": "新密码",
			"confirmPasswordLabel": "确认新密码",
			"saveButton": "保存"
		},
		programUpdate: {
			"title": "程序更新",
			"frontendVersionLabel": "前端程序版本",
			"backendVersionLabel": "后端程序版本",
			"executeUpdateButton": "执行程序更新"
		},
		configFileManagement: {
			"title": "配置文件管理",
			"importConfigFileButton": "导入配置文件",
			"exportConfigFileButton": "导出配置文件",
			"restoreFactoryConfigButton": "恢复出厂配置",
			"restoreFactoryConfigConfirm": "确定要恢复出厂配置吗？",
			"importConfigFileConfirm": "确定要导入配置文件吗？",

			"configFileFilter": "配置文件过滤器",
			"configFileFilter_introduce": "选择需要被导入/导出的配置部分",
			"networkAdapter": "网络适配器配置",
			"gatewaySetting": "网关配置",
			"serialSetting": "串口配置",
			"remoteSlave": "远程从机配置",
			"registerMapping": "映射配置"
		},
		"uploadConfig": {
			"successMessage": {
				"title": "保存成功",
				"mode": "OK",
				"body": "保存成功!\n即将跳转到新地址\nhttp://"
			},
			"errorMessage": {
				"title": "保存失败",
				"mode": "ERROR",
				"body": "code:{{errorCode}}"
			}
		}
	},
	modalVue: {
		confirm: "确定"
	},
	gateway: {
		"title": "网关通道",
		"capacity": "容量：",
		"bar": {
			"channel": "通道",
			"enable": "启用",
			"protocol": "通信协议",
			"networkModel": "网络模式",
			"devicePort": "设备端口",
			"remoteAddress": "远程地址",
			"remotePort": "远程端口"
		},
		"item": {
			"tcpServer": "TCP服务器",
			"tcpClient": "TCP客户端",
			"udp": "UDP",
			"delete": "删除"
		},
		"bottom": {
			"add": "添加",
			"save": "保存"
		},
		"modal": {
			"title": "成功"
		},
		"msg": {
			"addErrMsg": "超过最大容量: ",
			"addErrMsgUnit": " 条",
			"saveErrMsg": "保存失败，code:"
		}
	},
	serial: {
		"title": "串口设置",
		"capacity": "容量：",
		"bar": {
			"channel": "串口通道",
			"enable": "启用",
			"serialDevice": "串口序号",
			"serialModel": "串口模式",
			"modbusAddress": "Modbus地址",
			"modbusTimeout": "Modbus超时时间(ms)",
			"modbusInterval": "Modbus指令间隔(ms)",
			"baudrate": "波特率",
			"dataBit": "数据位",
			"stopBit": "停止位",
			"parityBit": "校验位",
			"networkModel": "网络模式",
			"devicePort": "设备端口",
			"remoteAddress": "远程地址",
			"remotePort": "远程端口",
			"hints": {
				"serialDevice": "填写Linux中的设备树路径，比如/dev/ttyS1",
				"serialModel": "DTU模式：串口到网络透传<br><br>RTU Master模式：使用“寄存器映射”时必须设置为此模式<br><br>RTU Slave模式：通过串口访问“寄存器映射”中的“网关寄存器”，和“网关通道”功能类似<br><br>DTU MRTU模式：开启“智能指令缓存”，和普通DTU不同的是，网关将智能缓存频繁访问的指令，并且主动轮询串口从机。适合用于串口挂载大量低速从机的情景。对于网络端访问串口设备时采用MODBUS-RTU模式<br><br>DTU MTCP模式：和DTU MRTU模式不同的是，对于网络端访问串口设备时采用MODBUS-TCP模式",
				"modbusAddress": "RTU Slave模式中，该串口将作为一个从设备可供上位机设备轮询，需要设置一个Modbus地址",
				"devicePort": "设置设备的网络通信端口",
				"remoteAddress": "设置远程通信的IP地址，仅在TCP客户端模式下有效",
				"remotePort": "设置远程通信的端口号，仅在TCP客户端模式下有效",
				"add": "在当前行下一行添加一个新行",
			}
		},
		"item": {
			"deviceExistedMsg": "发现已启用的串口设备重复",
			"noneParity": "无",
			"oddParity": "奇校验",
			"evenParity": "偶校验",
			"tcpServer": "TCP服务器",
			"tcpClient": "TCP客户端",
			"udp": "UDP",
			"delete": "删除",
			"add": "添加"
		},
		"bottom": {
			"add": "添加",
			"save": "保存"
		},
		"modal": {
			"title": "成功"
		},
		"msg": {
			"addErrMsg": "超过最大容量: ",
			"addErrMsgUnit": " 条",
			"saveErrMsg": "保存失败，code:"
		}
	},
	remote: {
		"title": "远程从机设置",
		"capacity": "容量：",
		"bar": {
			"channel": "远程通道",
			"enable": "启用",
			"modbusTimeout": "Modbus指令超时(ms)",
			"modbusInterval": "Modbus指令间隔(ms)",
			"networkModel": "网络模式",
			"devicePort": "设备端口",
			"remoteAddress": "远程地址",
			"remotePort": "远程端口",
		},
		"item": {
			"tcpServer": "TCP服务器",
			"tcpClient": "TCP客户端",
			"udp": "UDP",
			"delete": "删除"
		},
		"bottom": {
			"add": "添加",
			"save": "保存"
		},
		"modal": {
			"title": "成功"
		},
		"msg": {
			"addErrMsg": "超过最大容量: ",
			"addErrMsgUnit": " 条",
			"saveErrMsg": "保存失败，code:"
		}
	},
	scanCMD: {
		"title": "寄存器映射",
		"capacity": "容量：",
		"bar": {
			"sn": "序号",
			"enable": "启用",
			"interfaceType": "接口类型",
			"interfaceChannel": "接口通道",
			"channelProtocol": "通道协议",
			"modbusAddress": "modbus地址",
			"modbusFunctionCode": "modbus指令功能码",
			"modbusRegAddress": "modbus寄存器地址",
			"modbusRegType": "modbus寄存器类型",
			"byteOrderedExpression": "字节序表达式",
			"modbusRegNumber": "modbus寄存器数量",
			"occupiedRegister": "占用寄存器",
			"smartAddress": "智能地址",
			"mappedRegAddress": "网关映射寄存器地址",
			"rw": "读写权限",
			"errorValue": "异常设定值",
			"interval": "指令扫描间隔",
			"hints": {
				"interfaceChannel": "如果下拉框中没有出现需要的通道id，请返回对应的“通道类型”配置项中检查",
				"byteOrderedExpression": "使用小写字母表达，从字母'a'为低位数据起始，最长到'h'为高位数据结束，每一个字母编程一个字节(1byte=8bit)的字节序。<br>eg:<br>表达式'abcd'表示大端字节序，即数据的高位字节存储在内存的低地址处，低位字节存储在内存的高地址处。支持异形字节序，比如'acbd'",
				"rw": "部分特殊的modbus指令下为只读模式",
				"errorValue": "通讯失败时，自动将网关寄存器填充为'异常设定值'",
			}
		},
		"item": {
			"channelType": {
				"serialChannel": "串口通道",
				"remoteSalveChannel": "远程从机通道",
			},
			"modbusFC": {
				"option1": "1读线圈状态",
				"option2": "2读输入状态",
				"option3": "3读保持寄存器",
				"option4": "4读输入寄存器"
			},
			"modbusRegType": {
				"bool": "布尔型",
				"int8": "8位有符号整型",
				"uint8": "8位无符号整型",
				"int16": "16位有符号整型",
				"uint16": "16位无符号整型",
				"int32": "32位有符号整型",
				"uint32": "32位无符号整型",
				"int64": "64位有符号整型",
				"uint64": "64位无符号整型",
				"float": "单精度浮点型",
				"double": "双精度浮点型",
			},
			"rw": {
				"readOnly": "只读",
				"writeOnly": "只写",
				"both": "读/写"
			},
			"delete": "删除",
			"errorMsg": "地址冲突！开启“智能地址”一键纠错"
		},
		"bottom": {
			"add": "添加",
			"save": "保存"
		},
		"modal": {
			"title": "成功"
		},
		"msg": {
			"addErrMsg": "超过最大容量: ",
			"addErrMsgUnit": " 条",
			"saveErrMsg": "保存失败，code:",
			"endiaLengthErrMsg": "字节序表达式长度错误，应该为",
			"endiaLengthErrMsgUnit": "个字节",
			"endiaInitialErrMsg": "字节序表达式错误，应该从字母'a'开始，且不能有跳变",
			"endiaLetterErrMsg": "不能有重复字母",
			"endiaExprErrMsg": "字节序表达式错误，只能使用小写字母a~h",
			"configCheck": "正在检查配置，请等待",
			"noAvailableChannel": "没有可用的通道：请先前往“串口设置”或者“远程从机设置”添加“RTU Master”类型的通道",
		}
	},
	"factory": {
		"title": "出厂设置",
		"finishButton": "完成",
		"serialNumber": "设备序列号SN",
		"serialNumberInputHint": "请输入16位设备序列号",
		"save": "保存",
		"macAddress": "MAC地址",
		"copyButton": "一键复制",
		"msg": {
			"copyOkMsg": "复制成功",
			"snNullErrMsg": "SN不能为空",
			"snLengthErrMsg": "SN必须为16位",
			"snExprErrMsg": "SN必须为数字和字母",
			"saveErrMsg": "保存失败"
		}
	}
}
