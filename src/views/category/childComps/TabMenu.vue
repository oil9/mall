<template>
<scroll id="tab-menu">
    <div class="menu-list">
    <div class="menu-list-item" @click="itemClick(index)" :class="{active: currentIndex ===index}"  v-for="(item,index) in categories" :key="index" >
        {{item.title}}

    </div>

</div>
</scroll>


</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
 name: 'TabMenu',
 components: {
   Scroll  
 },
 data() {
     return {
         currentIndex:0
     }
 },
 props: {
     categories:{
         type:Array,
         default() {
             return []
         }
     }
 },
 methods: {
     itemClick(index) {
         this.currentIndex =index
         
     }
 }
 }
</script>

<style  scoped>
#tab-menu{
    height: 100%;
}
.menu-list-item{
    width: 86px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    background-color: rgb(246, 246, 246);
    
   
}
.active {
    background-color: #fff;
    border-left: 2px solid rgb(255, 129, 152);
    color:rgb(255, 129, 152);
}
</style>