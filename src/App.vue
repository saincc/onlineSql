<template>
  <div id="app">
    <el-container>
      <el-aside width="15%" style="opacity: 0.8;">
        <el-menu
            :default-active="this.$route.path"
            router mode="vertical"
            class="el-menu-vertical-demo tac "
            @open="handleOpen"
            @close="handleClose">
          <h5>在线sql执行</h5>
          <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
            {{ item.navItem }}
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container style="opacity: 0.8;">
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      navList:[
        {name:'/',navItem: '首页'},
        {name:'/info',navItem: '使用须知'}
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*background-image: url("./assets/bg.png");*/
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow: hidden;
  background-position: center top;
  background-size: cover;
  background-color: #cccccc20;
  /*filter: blur(2px);*/
}

.tac {
  height: 100%;
}
</style>
