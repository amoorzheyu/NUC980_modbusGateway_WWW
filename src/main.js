import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locals'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import {install} from '@icon-park/vue-next/es/all';
import JsonEditorVue from 'json-editor-vue3'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

const app = createApp(App)

app.use(router)
app.use(store)
// app.use(ElementUI)
app.use(JsonEditorVue)
app.use(i18n)
app.component('JsonEditorVue', JsonEditorVue);
// Install
install(app); // use default prefix 'icon', eg: icon is People, name is icon-people.
install(app, 'i'); // use custom prefix 'i', eg: icon is People, name is i-people.

app.mount('#app')