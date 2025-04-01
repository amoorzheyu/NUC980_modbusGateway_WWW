import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import General from '../views/General.vue'
import Serial from '../views/Serial.vue'
import Remote from '../views/Remote.vue'
import Gateway from '../views/Gateway.vue'
import ScanCMD from '../views/ScanCMD.vue'
import LogViewer from '../views/LogViewer.vue'
import Factory from '../views/Factory.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
}, {
    path: '/general',
    name: 'General',
    component: General
}, {
    path: '/serial',
    name: 'Serial',
    component: Serial
}, {
    path: '/remote',
    name: 'Remote',
    component: Remote
}, {
    path: '/gateway',
    name: 'Gateway',
    component: Gateway
}, {
    path: '/scanCMD',
    name: 'ScanCMD',
    component: ScanCMD
}, {
    path: '/factory',
    name: 'Factory',
    component: Factory
}, {
    path: '/logViewer',
    name: 'LogViewer',
    component: LogViewer
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router