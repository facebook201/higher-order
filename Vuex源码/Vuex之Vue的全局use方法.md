#### Vue.use(plugin)

* 参数
  * {Object | Function} plugin
* 用法 
  * 安装Vue插件 如果插件是一个对象 必须提供install方法 如果是一个函数 他会被作为install方法 install 方法调用时 会将Vue作为参数传入 且只会被安装一次



```javascript
/**
 * @param Vue函数传进去 然后再Vue加上全局静态方法use
 * @param use方法里面也有一个参数 plugin 可以是函数或者对象
 */
function initUse(Vue) {
  Vue.use = function(plugin) {
    // 首先看看是否已经有了这个方法
    // 定义一个数组 _installedPlugins
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }
	
    // 保存参数 传到plugin方法里面
    const args = toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if(typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    installedPlugins.push(plugin);
    return this;
  }
}
```



#### Vuex的核心

Vuex的核心是store仓库  store就是一个容器

* Vuex的状态存储是响应式的 当组件从store中读取状态的时候 若store发生变化 那么相应的组件会更新
* 不能直接改吧store的状态 改变store中的状态的唯一途径是显式提交mutation 这样可以方便地跟踪每一个状态的变化



#### 安装

```javascript
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
```



#### Vuex的install方法

```javascript
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
// 把_Vue 赋值给 Vue 并执行了 applyMixin(Vue) 方法。

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

```







































