<template>
    <div class="index">
      <div class="container">
        <div class="swiper-box">
          <div class="nav-menu">
            <ul class="menu-wrapper">
              <li class="menu-item">
                <a href="javascript:;">手机 电话卡</a>
                <div class="children">
                  <ul class="productList">
                    <li class="pro-item">
                      <a href="">
                        <div class="pro-img">
                          <img src="/imgs/item-box-1.png" alt="">
                        </div>
                        <p class="pro-name">小米CC</p>
                      </a>
                    </li>
                    <li class="pro-item">
                      <a href="">
                        <div class="pro-img">
                          <img src="/imgs/item-box-1.png" alt="">
                        </div>
                        <p class="pro-name">小米CC</p>
                      </a>
                    </li>
                    <li class="pro-item">
                      <a href="">
                        <div class="pro-img">
                          <img src="/imgs/item-box-1.png" alt="">
                        </div>
                        <p class="pro-name">小米CC</p>
                      </a>
                    </li>
                    <li class="pro-item">
                      <a href="">
                        <div class="pro-img">
                          <img src="/imgs/item-box-1.png" alt="">
                        </div>
                        <p class="pro-name">小米CC</p>
                      </a>
                    </li>
                    <li class="pro-item">
                      <a href="">
                        <div class="pro-img">
                          <img src="/imgs/item-box-1.png" alt="">
                        </div>
                        <p class="pro-name">小米CC</p>
                      </a>
                    </li>
                    <li class="pro-item">
                      <a href="">
                        <div class="pro-img">
                          <img src="/imgs/item-box-1.png" alt="">
                        </div>
                        <p class="pro-name">小米CC</p>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="menu-item">
                <a href="javascript:;">电视 盒子</a>
              </li>
              <li class="menu-item">
                <a href="javascript:;">笔记本 平板</a>
              </li>
              <li class="menu-item">
                <a href="javascript:;">家电 插线板</a>
              </li>
              <li class="menu-item">
                <a href="javascript:;">出行 穿戴</a>
              </li>
              <li class="menu-item">
                <a href="javascript:;">智能 路由器</a>
              </li>
              <li class="menu-item">
                <a href="javascript:;">电源 配件</a>
              </li>
              <li class="menu-item">
                <a href="javascript:;">生活 箱包</a>
              </li>
            </ul>
          </div>
          <swiper v-bind:options="swiperOption">
            <!-- slides -->
            <swiper-slide><img src="/imgs/slider/slide-1.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/slider/slide-2.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/slider/slide-3.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/slider/slide-4.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/slider/slide-5.jpg" alt=""></swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <div class="ads-box">
          <a href="" ><img src="/imgs/ads/ads-1.png" alt=""></a>
          <a href="" ><img src="/imgs/ads/ads-2.jpg" alt=""></a>
          <a href="" ><img src="/imgs/ads/ads-3.png" alt=""></a>
          <a href="" ><img src="/imgs/ads/ads-4.jpg" alt=""></a>
        </div>
        <div class="banner">
          <a href="/#/product/30">
            <img v-lazy="'/imgs/banner-1.png'" alt="">
          </a>
        </div>
        <div class="product-box">
          <div class="container">
            <h2>手机</h2>
            <div class="wrapper">
              <div class="banner-left">
                  <a href="/#/product/35"><img src="/imgs/mix-alpha.jpg" alt=""></a>
              </div>
              <div class="list-box">
                <div class="list" v-for="(item, index) of productList" :key="index">
                  <div class="item" v-for="(subItem, j) of item" :key="j">
                    <span class="new-pro" v-if="j % 2 === 0">新品</span>
                    <span class="new-pro" v-else>旧品</span>
                    <div class="item-img">
                      <img v-lazy="subItem.mainImage" alt="">
                    </div>
                    <div class="item-info">
                      <h3>{{subItem.name}}</h3>
                      <p>{{subItem.subtitle}}</p>
                      <p class="price" @click="addCart(subItem.id)">{{subItem.price | currentcy}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <service-bar></service-bar>
      <Modal
        title="购物提示"
        sure-text="查看购物车"
        btn-type="1"
        :showModal="showModal"
        @submit="gotoCart"
        @cancel="showModal = false"
      >
        <template v-slot:body>
          商品添加成功
        </template>
      </Modal>
    </div>
</template>

<script>
import ServiceBar from '../components/ServiceBar'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Modal from '../components/Modal'
export default {
  name: 'index',
  data () {
    return {
      showModal: false,
      productList: [],
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: 'cube',
        cubeEffect: {
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  components: {
    Modal,
    swiper,
    swiperSlide,
    ServiceBar
  },
  filters: {
    currentcy (val) {
      if (!val) return ''
      return `￥${val.toFixed(2)}元`
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.axios.get('/products', {
        params: {
          categoryId: 100012,
          pageSize: 8
        }
      }).then(res => {
        this.productList = [res.list.slice(0, 4), res.list.slice(4, 8)]
      })
    },
    addCart (id) {
      this.showModal = true
      this.axios.post('/carts', {
        productId: id,
        selected: true
      }).then(res => {
        this.$store.commit('setCartCount', res.cartTotalQuantity)
        this.showModal = true
      }).catch(() => {
        this.showModal = true
      })
    },
    gotoCart () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
 @import "../assets/scss/base";
  .index {
    .container {
      .swiper-box {
        .nav-menu {
          position: absolute;
          top: 0;
          left: 0;
          width: 264px;
          height: 451px;
          z-index: 10;
          padding:26px 0;
          background-color:#55585a7a;
          box-sizing: border-box;
          .menu-wrapper{
            .menu-item {
              height: 50px;
              line-height: 50px;
              padding-left: 15px;
              a {
                position: relative;
                display: block;
                font-size: 16px;
                color: #ffffff;
                &:after {
                  position: absolute;
                  right: 30px;
                  top: 17.5px;
                  content: '';
                  display: inline-block;
                  width: 10px;
                  height: 15px;
                  background: url("../../public/imgs/icon-arrow.png") no-repeat;
                  background-size: contain;
                  color: white;
                }
              }
              .children {
                display: none;
                position: absolute;
                left: 264px;
                top: 0;
                width:962px;
                height:451px;
                background-color: white;
                ul {
                  display: flex;
                  justify-content: space-between;
                  height: 75px;
                  li {
                    flex: 1;
                    height: 75px;
                    font-size:15px;
                    line-height:15px;
                    padding-left: 23px;
                    .pro-name {
                      margin-top: 8px;
                      color: #333333;
                    }
                    img {
                      width: 42px;
                      height: 35px;
                      margin-right: 15px;
                    }
                  }
                }
              }
              &:hover {
                background-color: #FF6600;
                .children {
                  display: block;
                }
              }
            }
          }
        }
        height: 451px;
        .swiper-button-prev{
          left:274px;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .ads-box {
        display: flex;
        justify-content: space-between;
        text-align: center;
        align-items: center;
        margin-top: 14px;
        margin-bottom: 31px;
        img {
          width:296px;
          height:167px;
        }
      }
      .banner{
        margin-bottom:50px;
      }
      .product-box {
        padding: 30px 0 50px;
        .container {
          h2 {
            height: 21px;
            line-height: 21px;
            margin-bottom: 20px;
          }
          .wrapper {
            display: flex;
            .banner-left {
              margin-right: 16px;
              img {
                width: 224px;
                height: 619px;
              }
            }
            .list-box {
              .list {
                display: flex;
                justify-content: space-between;
                text-align: center;
                align-items: center;
                width: 986px;
                margin-bottom: 14px;
                &:last-child {
                  margin-bottom: 0;
                }
                .item{
                  width: 236px;
                  height: 302px;
                  text-align: center;
                  span {
                    display: inline-block;
                    width: 64px;
                    height: 24px;
                    line-height: 24px;
                    font-size: 12px;
                    color: white;
                    background-color: red;
                  }
                  .item-img {
                    img {
                      width: 100%;
                      height: 195px;
                    }
                  }
                  .item-info {
                    h3 {
                      font-size: 14px;
                      color: #333333;
                      line-height: 14px;
                      font-weight: bold;
                    }
                    p {
                      color: #999999;
                      line-height: 13px;
                      margin: 6px auto 13px;
                    }
                    .price {
                      font-size: 16px;
                      color: red;
                      font-weight: bold;
                      cursor: pointer;
                      &:after {
                        display: inline-block;
                        content: '';
                        width: 22px;
                        height: 22px;
                        background: url("../../public/imgs/icon-cart-hover.png") no-repeat center;
                        background-size: contain;
                        margin-left: 5px;
                        vertical-align: middle;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
