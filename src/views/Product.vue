<template>
    <div class="product">
      <product-param :title="product.name">
        <template v-slot:buy>
          <button class="btn" @click="buy">去购买</button>
        </template>
      </product-param>
      <div class="content">
        <div class="item-bg">
          <h2>{{product.name}}</h2>
          <h3>{{product.subtitle}}</h3>
          <p>
            <a href="" >全球首款双频 GP</a>
            <span>|</span>
            <a href="" >骁龙845</a>
            <span>|</span>
            <a href="" >AI 变焦双摄</a>
            <span>|</span>
            <a href="" >红外人脸识别</a>
          </p>
          <div class="price">
            <span>￥<em>{{product.price}}</em></span>
          </div>
        </div>
        <div class="item-bg2"></div>
        <div class="item-bg3"></div>
        <div class="item-swiper">
          <swiper :options="swiperOption">
            <swiper-slide><img src="/imgs/product/gallery-2.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-3.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-4.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
          <p class="desc">小米8 AI变焦双摄拍摄</p>
        </div>
        <div class="item-video">
          <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
          <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
          <div class="video-bg" @click="showSlide = true"></div>
          <div class="video-box">
            <div class="mask" v-if="showSlide"></div>
            <div class="video" :class="{'slide': showSlide}">
              <span class="icon-close" @click="closeVideo"></span>
              <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import ProductParam from '../components/ProductParam'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'Product',
  data () {
    return {
      showSlide: false,
      product: {},
      swiperOption: {
        autoplay: true,
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  components: {
    ProductParam,
    swiper,
    swiperSlide
  },
  methods: {
    closeVideo () {
      this.showSlide = false
    },
    buy () {
      const id = this.$route.params.id
      this.$router.push(`/detail/${id}`)
    },
    getProductInfo () {
      const id = this.$route.params.id
      this.axios.get(`/products/${id}`).then(res => {
        this.product = res
      })
    }
  },
  mounted () {
    this.getProductInfo()
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/btn";
  .product {
    .btn {
      margin-left: 10px;
    }
    .content {
      .item-bg {
        background: url("../../public/imgs/product/product-bg-1.png") no-repeat center;
        height: 718px;
        text-align: center;
        h2 {
          font-size: 80px;
          padding-top: 55px;
        }
        h3 {
          font-size: 24px;
          letter-spacing: 10px;
        }
        p {
          margin-top: 21px;
          margin-bottom: 40px;
          a {
            font-size: 16px;
            color: #333333;
          }
          span {
            margin: 0 15px;
          }
        }
        .price {
          font-size: 30px;
          color: #333333;
          em {
            font-style: normal;
            font-size: 38px;
          }
        }
      }
      .item-bg2 {
        background: url("../../public/imgs/product/product-bg-2.png") no-repeat center;
        height: 480px;
        background-size: contain;
      }
      .item-bg3 {
        background: url("../../public/imgs/product/product-bg-3.png") no-repeat center;
        height: 638px;
        background-size: contain;
      }
      .item-swiper {
        margin: 40px 0;
        .desc {
          font-size: 18px;
          color: #333333;
          text-align: center;
        }
        img {
          width: 100%;
        }
      }
      .item-video {
        height: 1044px;
        background-color: #070708;
        margin-bottom: 76px;
        color: #ffffff;
        text-align: center;
        h2 {
          font-size: 60px;
          padding-top: 82px;
          margin-bottom: 47px;
        }
        p {
          font-size: 24px;
          margin-bottom: 58px;
        }
        .video-bg {
          background: url("../../public/imgs/product/gallery-1.png") no-repeat center;
          background-size: contain;
          width: 1226px;
          height: 540px;
          margin: 0 auto 120px;
          cursor: pointer;
        }
        .video-box {
          .mask {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #333333;
            opacity: .5;
            z-index: 10;
          }
          .video {
            position: fixed;
            top: -50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 1000px;
            height: 536px;
            z-index: 10;
            opacity: 0;
            transition: all .5s;
            &.slide {
              opacity: 1;
              top: 50%;
            }
            .icon-close {
              position: absolute;
              top: 20px;
              right: 20px;
              display: inline-block;
              width: 20px;
              height: 20px;
              background: url("../../public/imgs/icon-close.png") no-repeat center;
              background-size: contain;
              cursor: pointer;
              z-index: 20;
            }
            video {
              width: 100%;
              height: 100%;
              outline: none;
              object-fit: cover;
            }
          }
        }
      }
    }
  }
</style>
