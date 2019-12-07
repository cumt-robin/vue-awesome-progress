
import "./styles/index.css";
import Vue from "vue"
import App from "./App"
import router from "./router";
import VueAwesomeProgress from "./components/index.js"
Vue.use(VueAwesomeProgress)

new Vue({
    el: "#app",
    router,
    components: { App },
    render: h => h(App)
})
