<template>
<div class="bottom-bar">
    <div class="check-content">
    <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
    <span>全选</span>
    </div>
    <div class="price">
        合计：{{totalPrice}}
    </div>
    <div class="count"> 
        去计算:({{checkedLength}})
    </div>
</div>
</template>

<script>
import CheckButton from './CheckButton'
export default {
 name: 'CartBottomBar',
 components:{
     CheckButton
 },
 computed: {
     totalPrice () {
         return '￥' + this.$store.state.cartList.filter(item=> {
             return item.checked
         }).reduce((preValue,item) =>{
             return preValue +item.price *item.count
         },0).toFixed(2)
     },
     checkedLength() {
         return this.$store.state.cartList.filter(item=> item.checked).length
     },
     isSelectAll() {
        if(this.$store.state.cartList.length ===0 ) 
            return false
            return !(this.$store.state.cartList.filter(item=> !item.checked).length)
     }
 },
 methods: {
     checkClick() {
         if (this.isSelectAll) {
             this.$store.state.cartList.forEach(item=>item.checked=false)
         }else {
             this.$store.state.cartList.forEach(item=>item.checked=true)
         }
     }
 }
 }
</script>

<style  scoped>
.bottom-bar{
    display: flex;
    height: 40px;
    background-color: #eee;
    line-height: 40px;
}
.check-content {
    display: flex;
    width: 60px;
    align-items: center;
}
.check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
}
.price {
    flex: 1;
}
.count {
    width: 90px;
    background-color: red;
    text-align: center;
    color:#fff;
}
</style>