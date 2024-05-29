// 引入组件
import VueApiUi from './VueApiUi.vue'

// 为组件提供 install 安装方法，供按需引入
VueApiUi.install = (Vue) => {
    Vue.component(VueApiUi.name, VueApiUi)
}

// 导出组件
export default VueApiUi
