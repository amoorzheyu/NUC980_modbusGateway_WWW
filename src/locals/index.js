// index.js
import { createI18n } from 'vue-i18n'
import zh_cn from './zh_cn'
import en_us from './en_us'

const messages = {
    en_us,
    zh_cn,
}
const language = (navigator.language || 'en_us').toLowerCase().replace('-', '_');// 这是获取浏览器的语言
const i18n = createI18n({
    // 使用 Composition API 模式，则需要将其设置为false
    legacy: false,
    // 全局注入 $t 函数
    globalInjection: true,
    locale: localStorage.getItem('lang') || language || 'en_us', // 首先从缓存里拿，没有的话就用浏览器语言，
    fallbackLocale: 'en_us', // 设置备用语言
    messages,
})

export default i18n

