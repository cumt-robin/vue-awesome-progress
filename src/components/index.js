import VueAwesomeProgress from "./index.vue";

VueAwesomeProgress.install = function(Vue) {
    Vue.component(VueAwesomeProgress.name, VueAwesomeProgress);
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueAwesomeProgress)
}

export default VueAwesomeProgress
