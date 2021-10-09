<template>
<div class="tab-bar">
    <slot></slot>
</div>

</template>

<script>
export default {
 name: 'TabBar',
 }
</script>

<style  scoped>
.tab-bar{
    display: flex;
    position: fixed;
    background-color: #f6f6f6;
    height: 49px;
    /* line-height: 49px; */
   
    left: 0;
    right:0;
    bottom: 0;

  }

</style>