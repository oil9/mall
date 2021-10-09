<template>
<div class="top-back">
<img src="~assets/img/common/top.png" alt="">
</div>

</template>

<script>
export default {
 name: 'TopBack',
 }
</script>

<style  scoped>
.top-back {
    position:fixed;
    bottom:55px;
    right:10px;
    z-index: 9;
    width: 45px;
    height: 45px;
}
.top-back img {
    width: 100%;
}
</style>