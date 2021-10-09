<template>
<div class="cart">
 <nav-bar class="nav-bar">
    <div slot="center" >购物车({{length}})</div>
 </nav-bar>
 <scroll class="content" ref="scroll">
    <cart-list/>
 </scroll>
 <cart-bottom-bar class="bottom-bar"/>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import {mapGetters} from 'vuex'
export default {
 name: 'Cart',
 components: {
     NavBar,
     Scroll,
     CartList,
     CartBottomBar
 },
 computed: {
     ...mapGetters({
         length:'cartLength',
         list:'cartList'})
 },
 activated () {
    this.$refs.scroll.refresh()
 }
 }
</script>

<style  scoped>
.cart {
    position: relative;
    height:100vh
}
.content{
    position: absolute;
    top:44px;
    bottom: 89px;
    left:0;
    right:0;
}

.nav-bar {
    background-color: rgb(255, 142, 153);
    color:#fff

}
.bottom-bar {
    position: absolute;
    left:0;
    right:0;
    bottom:49px;
    
}
</style>