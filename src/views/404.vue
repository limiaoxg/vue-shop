<template>
  <div class="notfound-container">
    <div class="header">
      <van-nav-bar left-arrow left-text="返回" @click-left="$router.go(-1)" />
    </div>
    <div class="content">
      <van-empty image="error" description="404 暂无该页面~" />
    </div>
  </div>
</template>

<script lang='ts' setup>

</script>

<style scoped>
</style>
