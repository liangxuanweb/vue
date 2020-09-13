<template>
  <div class="nav-wrap">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#344a5f"
      text-color="#fff"
      active-text-color="#ffd04b"
      :unique-opened="true"
      router
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <template v-for="(item, index) in router">
        <el-submenu :index="index + ''" v-if="!item.hidden" :key="index">
          <template slot="title">
            <!-- <i class="el-icon-location"></i> -->
            <svg-icon
              :iconClass="item.meta.icon"
              :className="item.meta.icon"
            ></svg-icon>
            <span>{{ item.meta.name }}</span>
          </template>
          <el-menu-item-group
            v-for="(subItem, index) in item.children"
            :key="index"
          >
            <el-menu-item :index="subItem.path + ''">{{
              subItem.meta.name
            }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      router: this.$router.options.routes,
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse
    },
  },
}
</script>
<style scoped lang="scss">
.nav-wrap {
  width: auto;
  height: 100vh;
  background-color: #344a5f;
  svg {
    margin-right: 20px;
  }
}
.el-menu {
  border-right: none;
}
</style>
