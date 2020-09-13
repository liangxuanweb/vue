<template>
  <div>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'"><Nav></Nav></el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <el-main><Main></Main></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Home/Header'
import Nav from '@/components/Home/Nav'
import Main from '@/components/Home/Main'
export default {
  name: 'Home',
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse
    },
  },
  components: {
    Header,
    Nav,
    Main,
  },
}
</script>
<style scoped>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #fff;
}
.el-aside {
  transition: all 0.5s;
  overflow: hidden;
}
</style>
