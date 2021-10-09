<template>
<div class="tab-control">
    <div class="tab-control-item" :class="{active: currentIndex === index}" 
    v-for="(item,index) in title" :key="index" @click="itemClick(index)">
        <span>{{item}}</span>

    </div>
    
</div>

</template>

<script>
export default {
 name: 'TabControl',
 data() {
     return {
         title:['流行','新款','精选'],
         currentIndex:0
     }
 },
 methods:{
     itemClick(index) {
         this.currentIndex =index
         this.$emit('tabClick',index)
     }
 }
 }
</script>

<style  scoped>
.tab-control{
    display: flex;
    line-height: 40px;
    
}
.tab-control-item {
    flex: 1;
    text-align: center;
    
    
}
.tab-control-item span {
    padding: 5px;
    
}
.tab-control-item.active span{
    border-bottom: 2px solid red;
}
.active{
    color:red
}
</style>