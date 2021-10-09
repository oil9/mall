<template>
<div id="home">
    <nav-bar class="nav-bar">
        <div slot="center">购物车</div>
    </nav-bar>
    <scroll class="content" @scroll="contextScroll" ref="scroll" @pullingUp="loadMore">
        <home-swiper :banners="banners"/>
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <tab-control class="tab-control" @tabClick="tabClick"></tab-control>
        <goods-list :goods="goods[currenType].list"></goods-list>
    </scroll>
    <top-back @click.native="backTop" v-show="showBackTop"/>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getMultiData,getProductData} from 'network/home'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import TopBack from 'components/content/topback/TopBack'
export default {
 name: 'Home',
 data() {
     return {
         banners:[],
         recommends:[],
         goods:{
             'pop':{page:1,list:[]},
             'new':{page:1,list:[]},
             'sell':{page:1,list:[]}

         },
         currenType:'pop',
        showBackTop:false,
        saveY:0,
        
     }
 },
 components:{
     NavBar,
     HomeSwiper,
     RecommendView,
     FeatureView,
     TabControl,
     GoodsList,
     Scroll,
     TopBack,
 },
 created() {
    this.getMultiData()
    this.getProductData('pop')
    this.getProductData('new')
    this.getProductData('sell')
    this.$bus.$on('imgLoad',()=>{
        this.$refs.scroll.refresh()
    })
 },
 activated() {
     this.$refs.scroll.scrollTo(0,this.saveY,0)
     this.$refs.scroll.refresh()

 },
 deactivated () {
     this.saveY =this.$refs.scroll.scrollY
     
 },
 methods:{
    getMultiData() {
        getMultiData().then(res=>{
            console.log(res);
            this.banners =res.data.banner.list
            this.recommends =res.data.recommend.list
     })

     },
     getProductData(type) {
         const page = this.goods[type].page
        getProductData(type,page).then(res=>{
         const newList =res.data.list
         this.goods[type].list.push(...newList)
         this.goods[type].page+=1   
         this.$refs.scroll.finishedPullUp()
     })
     },
     tabClick(index) {
         switch(index) {
             case 0:
                 this.currenType ='pop'
                 break
            case 1:
                this.currenType ='new'
                break
            case 2:
                this.currenType ='sell'
         }

     },
     contextScroll(position) {
         this.showBackTop = position.y < -1000
     },
     backTop() {
         this.$refs.scroll.scrollTo(0,0)  
     },
     loadMore(){
         this.getProductData(this.currenType)
     }
     
 }

 }
</script>

<style  scoped>
#home {
    height: 100vh;
    position: relative;
  }

.nav-bar {
    background-color: var(--color-tint);
    position:fixed;
    left:0;
    right: 0;
    top:0;
    z-index: 9;
  }

.tab-control {
    position:sticky;
    top:44px;
    z-index: 9;
  }

.content {
      position: absolute;
      top:44px;
      bottom: 49px;
      left:0;
      right:0;

  }
</style>