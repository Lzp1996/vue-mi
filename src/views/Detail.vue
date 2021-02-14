<template>
    <div class="detail">
      <product-param title="手机详情">
        <template v-slot:buy>
          <button class="btn">购买</button>
        </template>
      </product-param>
      <div class="wrapper">
        <div class="container clearfix">
          <div class="swiper">
            <swiper :options="swiperOption">
              <swiper-slide><img src="/imgs/detail/phone-1.jpg" alt=""></swiper-slide>
              <swiper-slide><img src="/imgs/detail/phone-2.jpg" alt=""></swiper-slide>
              <swiper-slide><img src="/imgs/detail/phone-3.jpg" alt=""></swiper-slide>
              <swiper-slide><img src="/imgs/detail/phone-4.jpg" alt=""></swiper-slide>
              <!-- Optional controls -->
              <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
          </div>
          <div class="content">
            <h2 class="item-title">小米9</h2>
            <p class="item-info">相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红<br/>外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏</p>
            <div class="delivery">小米自营</div>
            <div class="item-pice">2599元<span class="del">2999元</span></div>
            <div class="line"></div>
            <div class="item-addr">
              <i class="icon-loc"></i>
              <div class="addr">北京 北京市 朝阳区 安定门街道</div>
              <div class="stock">有现货</div>
            </div>
            <div class="item-version clearfix">
              <h2>选择版本</h2>
              <div class="phone fl checked">6GB+64GB 全网通</div>
              <div class="phone fr">4GB+64GB 移动4G</div>
            </div>
            <div class="item-color">
              <h2>选择颜色</h2>
              <div class="phone checked">
                <span class="color"></span>
                深空灰
              </div>
            </div>
            <div class="item-total">
              <div class="phone-info clearfix">
                <div class="fl">小米9 6GB+64GB 全网通 深灰色</div>
                <div class="fr">2599元</div>
              </div>
              <div class="phone-total">总计：2599元</div>
            </div>
            <div class="btn-group">
              <a href="javascript:;" class="btn fl" @click="addCart">加入购物车</a>
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
  name: 'Detail',
  components: {
    ProductParam,
    swiper,
    swiperSlide
  },
  data () {
    return {
      id: this.$route.params.id,
      product: {},
      swiperOption: {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  methods: {
    getProductInfo () {
      const id = this.id
      this.axios.get(`/products/${id}`).then(res => {
        this.product = res
      })
    },
    addCart () {
      this.axios.post('/carts', {
        productId: this.id,
        selected: true
      }).then(res => {
        this.$store.commit('setCartCount', res.cartTotalQuantity)
        this.$router.push('/cart')
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
  .detail {
    .wrapper {
      .swiper{
        float:left;
        width:642px;
        height:617px;
        margin-top:5px;
        img{
          width:100%;
          height:100%;
        }
      }
      .content {
        float:right;
        width:584px;
        height:870px;
        .item-title {
          font-size: 28px;
          padding: 30px 0;
          height: 26px;
        }
        .item-info {
          font-size: 14px;
          height: 36px;
        }
        .delivery {
          font-size: 16px;
          color: #FF6600;
          margin: 26px 0;
          height: 15px;
        }
        .item-pice {
          font-size: 20px;
          height: 19px;
          color: #FF6600;
          .del {
            font-size: 16px;
            color: #999999;
            margin-left: 10px;
            text-decoration: line-through;
          }
        }
        .line {
          height: 0;
          margin: 20px 0;
          border-top: 1px solid #e5e5e5;
        }
        .item-addr {
          height: 108px;
          background-color: white;
          border: 1px solid #e5e5e5;
          box-sizing: border-box;
          padding: 30px 0 0 50px;
          font-size: 14px;
          line-height: 14px;
          position: relative;
          .icon-loc {
            position: absolute;
            top: 27px;
            left: 30px;
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url("../../public/imgs/detail/icon-loc.png") no-repeat center;
            background-size: contain;
          }
          .addr {
            color: #666666;
          }
          .stock {
            margin-top: 15px;
            color: #FF6600;
          }
        }
        .item-version, .item-color {
          margin-top: 30px;
          h2 {
            font-size: 18px;
            margin-bottom: 20px;
          }
          .phone {
            width: 287px;
            height: 50px;
            line-height: 50px;
            font-size: 16px;
            border: 1px solid #e5e5e5;
            color: #333333;
            box-sizing: border-box;
            text-align: center;
            cursor: pointer;
            span {
              color: #666666;
              margin-left: 15px;
            }
            .color {
              display: inline-block;
              width: 14px;
              height: 14px;
              background-color: #666666;
            }
            &.checked {
              border: 1px solid #FF6600;
              color: #FF6600;
            }
          }
        }
        .item-total {
          height: 108px;
          background-color: white;
          padding: 30px;
          font-size: 14px;
          margin: 30px 0;
          box-sizing: border-box;
          color: black;
          .phone-total {
            font-size: 24px;
            color: #FF6600;
            margin-top: 18px;
          }
        }
      }
    }
  }
</style>
