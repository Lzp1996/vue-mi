<template>
    <div class="header">
      <div class="topbar">
        <div class="container">
          <div class="topbar-menu">
            <a href="javascript:;">小米商城</a>
            <a href="javascript:;">MUI</a>
            <a href="javascript:;">云服务</a>
            <a href="javascript:;">协议规则</a>
          </div>
          <div class="topbar-user">
            <a href="/#/login" v-if="!username">登录</a>
            <a href="/#/login" v-if="username">{{username}}</a>
            <a href="/#/order/list" v-if="username">我的订单</a>
            <a href="javascript:;" class="my-cart" ><span class="icon-cart"></span>购物车{{cartCount}}</a>
          </div>
        </div>
      </div>
      <div class="nav-header">
       <div class="container">
         <div class="nav-logo">
            <div class="wrapper">
              <a href="javascript:;"></a>
            </div>
         </div>
         <div class="nav-menu">
           <div class="item-menu">
             <span>小米手机</span>
             <div class="children">
               <ul>
                 <li class="product" v-for="(item, index) of productList" :key="index">
                   <a :href="'/#/product/'+item.id" target="_blank">
                     <div class="pro-img"><img :src="item.mainImage" alt=""></div>
                     <div class="pro-name">{{item.name}}</div>
                     <div class="pro-price">{{item.price | currentcy}}</div>
                   </a>
                 </li>
               </ul>
             </div>
           </div>
           <div class="item-menu">
             <span>红米手机</span>
           </div>
           <div class="item-menu">
             <span>电视</span>
           </div>
         </div>
         <div class="nav-search">
           <div class="wrapper">
             <input type="text" >
             <a href="javascript:;"></a>
           </div>
         </div>
       </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'NavHeader',
  data () {
    return {
      productList: []
    }
  },
  computed: {
    username () {
      return this.$store.state.username
    },
    cartCount () {
      return this.$store.state.cartCount
    }
  },
  filters: {
    currentcy (val) {
      if (!val) return '0.00'
      return `￥${val.toFixed(2)}元`
    }
  },
  methods: {
    getProductList () {
      this.axios.get('/products', {
        categoryId: '100012'
      }).then(res => {
        this.productList = res.list.slice(4, 10)
      })
    }
  },
  mounted () {
    this.getProductList()
  }
}
</script>

<style lang="scss">
  @import "../assets/scss/base";
  .header{
    .topbar {
      height: 39px;
      line-height: 39px;
      background-color: #333333;
      color: #B0B0B0;
      .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        a {
          display: inline-block;
          color: #B0B0B0;
          margin-right: 17px;
        }
        .my-cart {
          width: 110px;
          background-color: #FF6600;
          text-align: center;
          color: white;
          .icon-cart {
            display: inline-block;
            width: 16px;
            height: 12px;
            background: url("../../public/imgs/icon-cart.png") no-repeat;
            background-size: contain;
            margin-right: 7px;
          }
        }
      }
    }
    .nav-header {
      .container {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 112px;
      }
        .nav-logo{
          .wrapper {
            width: 55px;
            height: 55px;
            background-color: #FF6600;
            overflow: hidden;
            a {
              display: inline-block;
              width: 110px;
              height: 55px;
              &:before {
                display: inline-block;
                content: '';
                width: 55px;
                height: 55px;
                background: url("../../public/imgs/logo-mi.png") no-repeat;
                background-size: contain;
                transition: margin .3s;
              }
              &:after {
                display: inline-block;
                content: '';
                width: 55px;
                height: 55px;
                background: url("../../public/imgs/mi-home.png") no-repeat;
                background-size: contain;
              }
              &:hover:before {
                margin-left: -55px;
                transition: margin .3s;
              }
            }
          }
        }
        .nav-menu{
          display: flex;
          flex: 0 0 600px;
          height: 112px;
          line-height: 112px;
          .item-menu {
            color: #333333;
            font-weight: bold;
            font-size: 16px;
            margin-right: 17px;
            span {
              cursor: pointer;
            }
            &:hover {
              .children{
                opacity: 1;
                height: 220px;
              }
            }
            .children {
              position: absolute;
              top: 112px;
              left: 0;
              width: 1226px;
              height: 0px;
              overflow: hidden;
              opacity: 0;
              margin: 0 auto;
              border-top: 1px solid #E0E0E0;
              box-shadow: 0 7px 6px rgba(0, 0, 0, .3);
              background: white;
              transition: all .3s;
              z-index: 100;
              .product {
                position: relative;
                float: left;
                width: 16.6%;
                height: 220px;
                font-size: 12px;
                line-height: 12px;
                text-align: center;
                a {
                  display: inline-block;
                }
                img {
                  width: auto;
                  height: 111px;
                  margin-top: 11px;
                }
                .pro-img{
                  height: 137px;
                }
                .pro-name {
                  font-weight: bold;
                  margin-top: 19px;
                  margin-bottom: 8px;
                }
                .pro-price {
                  color: #FF6600;
                }
                &:before {
                  position: absolute;
                  right: 0;
                  top: 15px;
                  content: '';
                  width: 1px;
                  height: 100px;
                  border-right: 1px solid black;
                }
                &:last-child:before {
                  display: none;
                }
              }
            }
          }
        }
        .nav-search{
          width: 319px;
          .wrapper {
            display: flex;
            align-items: center;
            height: 50px;
            border: 1px solid #E0E0E0;
            input {
              width: 264px;
              height: 50px;
              border: none;
              border-right: 1px solid #e5e5e5;
              box-sizing: border-box;
              padding-left: 14px;
            }
            a {
              display: inline-block;
              width: 18px;
              height: 18px;
              background: url("../../public/imgs/icon-search.png") no-repeat;
              background-size: contain;
              margin-left: 17px;
            }
          }
        }
    }
  }
</style>
