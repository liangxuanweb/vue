<template>
  <div id="main-wrap">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
}
</script>
<style scoped lang="scss">
#main-wrap {
  height: 100%;
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
}
</style>
