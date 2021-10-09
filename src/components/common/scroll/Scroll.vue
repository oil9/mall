<template>
<div class="wrapper" ref="wrapper">
   <div class="content">
       <slot></slot>
   </div>
</div>

</template>

<script>
import BScroll from 'better-scroll'
export default {
 name: 'Scroll',
 data() {
     return {
         scroll:null
     }
 },
 computed:{
     scrollY() {
         return this.scroll.y
     }

 },
 mounted () {
     this.scroll =new BScroll(this.$refs.wrapper,{
         probeType:3,
         pullUpLoad:true,
         click:true

     })
     this.scroll.on('scroll',position=>{

         this.$emit('scroll',position)
     })
     this.scroll.on('pullingUp',()=>{
         this.$emit('pullingUp')
     })
 },
 methods: {
     scrollTo(x,y,timeout=500) {
         this.scroll.scrollTo(x,y,timeout)
     },
     refresh() {
         this.scroll.refresh()
     },
     finishedPullUp(){
         this.scroll.finishPullUp()

     }
         
     
 }



 }
</script>

<style  scoped>
.wrapper {
    overflow: hidden;
  }
</style>