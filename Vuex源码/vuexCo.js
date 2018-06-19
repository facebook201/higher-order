/** 安装Vuex Vuex本身是一个对象
 *  里面存在一个静态方法 install
 * 
 */

export default {
  Store,
  install,
  version: '__VERSION__',
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers
};

// install 静态方法

export function install (_Vue) {
  if(Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once'
      )
    }
  }
  return
  Vue = _Vue;
  applyMixin(Vue);
}

/** applyMixin 方法 
 *  区分了2.0 版本 和 1.0 版本
 *  主要是将
 **/

function vuexInit() {
  const options = this.$options;
  /**
   * 把options.store保存在所有组件的this.$store中 所以在实例化Store对象实例后 可以
   * 通过this.$store访问到这个实例
   */
  if (options.store) {
    this.$store = typeof options.store === 'function'
      ? options.store()
      : options.store;
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store;
  }
}


/**
 * Vuex 核心概念之Store
 */

 export class Store {
   constructor(options = {}) {
    if (!Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue)
    }

    if (process.env.NODE_ENV !== 'production') {
      assert(Vue, `must call Vue.use(Vuex) before creating a store instance.`)
      assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`)
      assert(this instanceof Store, `store must be called with the new operator.`)
    }

    const {
      plugin = [],
      strict = false
    } = options;

    this._committing = false;
    this._actions = Object.create(null);
    this._actionSubscribers = [];
    this._mutations = Object.create(null);
    this._wrappedGetters = Object.create(null);
    this._modules = new ModuleCollection(options)
    this._modulesNamespaceMap = Object.create(null)
    this._subscribers = []
    this._watcherVM = new Vue()
    
   }
 }