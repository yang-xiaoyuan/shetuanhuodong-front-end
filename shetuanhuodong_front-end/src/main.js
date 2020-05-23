import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//定义全局变量
Vue.prototype.Name = {
      username:'',
      team:''
    };

//定义全局函数
Vue.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Vue.prototype.remove = function(val) {
    var index = this.indexOf(val);
        if (index > -1) {
        this.splice(index, 1);
    }
};