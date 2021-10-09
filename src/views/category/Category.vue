<template>
<div class="Category">
    <nav-bar class="nav-bar">
        <div slot="center">分类商品</div>
    </nav-bar>
    <div class="content">
        <tab-menu :categories="categories">
        </tab-menu>

    </div>
</div>

</template>

<script>
import {getCategory,getSubcategory} from 'network/category'
import TabMenu from './childComps/TabMenu'
import NavBar from 'components/common/navbar/NavBar'
export default {
 name: 'Category',
 components:{
     NavBar,
     TabMenu
 },
 data() {
     return {
         categories:[],
         categoryData:{}
     }
 },
 created () {
     this._getCategory()
    //  this._getSubcategory()
    
 },
 methods: {
     _getCategory(){
         getCategory().then(res=>{
         this.categories =res.data.category.list
         for (let i=0; i<this.categories.length;i++) {
             this.categoryData[i] ={
                 subcategories:{},
                 categoryDetail:{
                     'pop':[],
                     'new':[],
                     'sell':[]
                 }
             }
         }
           this._getSubcategories(0)
        
     })
     },
      _getSubcategories(index) {
      
		const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          console.log(res);
          
        })
      },
     
 },
 mounted () {
     
     
 }
 }
</script>

<style  scoped>
.nav-bar{
    background-color: rgb(255, 142, 153);
    color:#fff;
}
.content{
   position: absolute;
   top:44px;
   left:0;
   right:0;
   bottom: 49px;
}
</style>