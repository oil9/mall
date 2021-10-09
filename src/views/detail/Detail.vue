<template>
<div id="detail">
    <detail-nav-bar @TacClick="TacClick" :current-index="currentIndex">
        
    </detail-nav-bar>
     
    <scroll class="content" ref="scroll" @scroll="contentScroll">
       
       
        
        <detail-swiper :topImages="topImages">

    </detail-swiper>
    <detail-base-info :goods="goods">

    </detail-base-info>
    <detail-shop-info :shop="shop">

    </detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad">

    </detail-goods-info>
    <detail-param-info ref="param" :param-info="paramInfo">

    </detail-param-info>
    <detail-comment-info ref="comment" :comment-info="commentInfo">

    </detail-comment-info>
    <goods-list  ref="recommend" :goods="goodsList"></goods-list>
    </scroll>
    <top-back @click.native="backTop" v-show="showBackTop"></top-back>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
   
</div>

</template>

<script>
import {getDetail} from 'network/detail'
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import TopBack from 'components/content/topback/TopBack'
import DetailBottomBar from './childComps/DetailBottomBar'
import {Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

export default {
 name: 'Detail',
 components: {
   DetailNavBar,
   DetailSwiper,
   DetailBaseInfo,
   DetailShopInfo,
   DetailGoodsInfo,
   DetailParamInfo,
   DetailCommentInfo,
   Scroll,
   GoodsList,
   TopBack,
   DetailBottomBar
 
 },
 data() {
     return {
         iid:null,
         topImages:[],
         goods:{},
         shop:{},
         detailInfo:{},
         paramInfo:{},
         commentInfo:{},
         goodsList:[],
         showBackTop:false,
         scrollList:[],
         currentIndex:0
     }
 },
 created() {
     this.iid=this.$route.query.iid
     this.getDetail(this.iid)
     this.getRecommend()
 },
 methods: {
     addToCart(){
         
         const obj={}
         obj.iid=this.iid
         obj.imgURL =this.topImages[0]
         obj.title=this.goods.title
         obj.desc = this.goods.desc
         obj.price = this.goods.realPrice

         this.$store.commit('addCart',obj)
     },
     imageLoad() {
         this.$refs.scroll.refresh()
         this.scrollList =[]
         this.scrollList.push(0)
         this.scrollList.push(this.$refs.param.$el.offsetTop)
         this.scrollList.push(this.$refs.comment.$el.offsetTop)
         this.scrollList.push(this.$refs.recommend.$el.offsetTop)
         this.scrollList.push(Number.MAX_VALUE)


     },
     getDetail(iid) {
         getDetail(iid).then(res=>{
             console.log(res);
             const data = res.result
             this.topImages =data.itemInfo.topImages
             this.goods= new Goods(data.itemInfo,data.columns,data.shopInfo.services)
             this.shop =new Shop(data.shopInfo)
             this.detailInfo =data.detailInfo
             this.paramInfo =new GoodsParam(data.itemParams.info, data.itemParams.rule)

             if(data.rate.list) {
                 this.commentInfo =data.rate.list[0];
             }


         })
     },
     getRecommend() {
         getRecommend().then(res=>{
             this.goodsList= res.data.list
         })
     },
     backTop() {
         this.$refs.scroll.scrollTo(0,0)
        
     },
     contentScroll (position) {
         this.showBackTop = position.y <-1000
         this.ListScrollTheme(-position.y)

     },
     ListScrollTheme(position) {
         let length=this.scrollList.length
         for(let i=0;i<length;i++) {
             if(position >=this.scrollList[i] && position< this.scrollList[i+1]) {
                 if(this.currentIndex !==i) {
                     this.currentIndex =i
                 }
                 break;
             }

         }


     },
     TacClick(index) {
         this.$refs.scroll.scrollTo(0,-this.scrollList[index],0)

     }
      }
 }
</script>

<style  scoped>
#detail{
    position: relative;
    height: 100vh;
    z-index: 1;
}
.content{
    position:absolute;
    top:44px;
    bottom: 49px;
    left:0;
    right:0;
}
</style>