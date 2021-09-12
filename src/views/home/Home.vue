<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners" />

    <recommend-views :recommend="recommend" />


  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import { getHomeMultidata } from 'network/home'
  import { Swiper, SwiperItem } from 'components/common/swiper'
  import RecommendViews from './childComps/RecommendViews'
  export default {
    name: "Home",
    components: {
      NavBar,
      Swiper,
      SwiperItem,
      RecommendViews
    },
    data() {
      return {
        banner: [],
        recommend: []
      }
    },
    created() {
      //请求数据
      getHomeMultidata().then(res => {
        console.log(res);
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>