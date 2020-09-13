<template>
  <div id="header-wrap">
    <div @click="navMenuBtn" class="left header-icon">
      <svg-icon iconClass="xuanx" className="xuanx"></svg-icon>
    </div>
    <div class="right">
      <div class="user-info left">
        {{ username }}
      </div>
      <div class="header-icon left" @click="exit">
        <svg-icon iconClass="exit" className="exit"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    username() {
      return this.$store.state.username
    },
  },
  methods: {
    navMenuBtn() {
      this.$store.commit('SET_COLLAPSE')
    },
    exit() {
      this.$router.push('/Login')
    },
  },
}
</script>
<style scoped lang="scss">
#header-wrap {
  line-height: 60px;
  background-color: #ccc;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
}
.left {
  float: left;
}
.right {
  float: right;
}
.header-icon {
  padding: 0 16px;
  svg {
    font-size: 20px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  border-right: 1px solid #fff;
}
</style>
