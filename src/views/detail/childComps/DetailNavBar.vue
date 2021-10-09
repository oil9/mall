<template>
<nav-bar>
<img slot="left" class="back" @click="backClick" src="~assets/img/common/back.svg" alt="">
<div slot="center" class="title">
      <div class="title-item"
           v-for="(item, index) in titles" :key="index"
           :class="{active: currentIndex ===index}"
           @click="itemClick(index)">
        {{item}}
      </div>
    </div>
  </nav-bar>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
 name: 'DetailNavBar',
 
 props:{
     titles:{
         type:Array,
         default:() =>{
             return ['商品', '参数', '评论', '推荐']
         }
     },
     currentIndex:{
         type:Number,
         default:0
     }


 },
 components: {
     NavBar
 },
 methods:{
     backClick() {
         this.$router.back()
     },
     itemClick(index) {
        //  this.currentIndex =index
         this.$emit('TacClick',index)
     }
 }
 }
</script>

<style  scoped>
.title{
    display: flex;
}
.title-item {
    flex:1;
}
.back {
    margin-top:10px
}
.title-item.active{
    color:red
}
</style>