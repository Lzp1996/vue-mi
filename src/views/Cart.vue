<template>
  <div class="cart">
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-header">
            <li class="col-1"><span class="checkbox" :class="{'checked': selectedAll}" @click="toggleAll"></span>全选</li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list" v-for="(item, index) of list" :key="index">
            <li class="cart-item">
              <div class="item-check">
                <span class="checkbox" :class="{'checked': item.productSelected}" @click="updateCart(item)"></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.productMainImage" alt="">
                <span>{{item.productName + '' + item.productSubtitle}}</span>
              </div>
              <div class="item-price">{{item.productPrice}}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item, '-')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;" @click="updateCart(item, '+')">+</a>
                </div>
              </div>
              <div class="item-total">{{item.productTotalPrice}}</div>
              <div class="item-del" @click="deleteCart(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrapper clearfix">
          <div class="cart-tip fl">
            <a href="/">继续购物</a>
            共 <span>{{list.length}}</span>件商品, 已选择 <span>{{checkedNum}}</span>件
          </div>
          <div class="total fr">
            合计：<span>{{cartTotalPrice}}</span>元
            <a href="javasipt:;" @click="order" >去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import ServiceBar from '../components/ServiceBar'
import NavFooter from '../components/NavFooter'
export default {
  name: 'Cart',
  components: { NavFooter, ServiceBar },
  data () {
    return {
      cartTotalPrice: 0,
      selectedAll: false,
      checkedNum: 0,
      list: []
    }
  },
  mounted () {
    this.getCartList()
  },
  methods: {
    getCartList () {
      this.axios.get('/carts').then(res => {
        console.log(res)
        this.list = res.cartProductVoList || []
        this.selectedAll = res.selectedAll
        this.cartTotalPrice = res.cartTotalPrice
        this.checkedNum = this.list.filter(item => item.productSelected).length
      })
    },
    toggleAll () {
      const url = this.selectedAll ? '/carts/unSelectAll' : '/carts/selectAll'
      this.axios.put(url).then(res => {
        this.list = res.cartProductVoList || []
        this.selectedAll = res.selectedAll
        this.cartTotalPrice = res.cartTotalPrice
        this.checkedNum = this.list.filter(item => item.productSelected).length
      })
    },
    deleteCart (item) {
      this.axios.delete(`/carts/${item.productId}`).then(res => {
        this.list = res.cartProductVoList || []
        this.selectedAll = res.selectedAll
        this.cartTotalPrice = res.cartTotalPrice
        this.checkedNum = this.list.filter(item => item.productSelected).length
      })
    },
    updateCart (item, type) {
      let quantity = item.quantity
      // eslint-disable-next-line no-unused-vars
      let selected = item.productSelected
      if (type === '-') {
        if (quantity === 1) {
          this.$message.warning('商品至少保留一件')
          return
        }
        --quantity
      } else if (type === '+') {
        if (quantity > item.productStock) {
          this.$message.warning('商品不能超过库存')
          return
        }
        ++quantity
      } else {
        selected = !item.productSelected
      }
      this.axios.put(`/carts/${item.productId}`, {
        quantity,
        selected
      }).then(res => {
        this.list = res.cartProductVoList || []
        this.selectedAll = res.selectedAll
        this.cartTotalPrice = res.cartTotalPrice
        this.checkedNum = this.list.filter(item => item.productSelected).length
      })
    },
    order () {
      const isCheck = this.list.every(item => !item.productSelected)
      if (isCheck) {
        this.$message.warning('请选择一件商品')
      } else {
        this.$router.push('/order/confirm')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 @import "../assets/scss/base";
 @import "../assets/scss/btn";
  .cart {
    .wrapper {
      background-color: #F5F5F5;
      padding: 30px 0 114px;
      .cart-box {
        background-color: white;
        font-size: 14px;
        color: #999999;
        text-align: center;
        .checkbox {
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #e5e5e5;
          vertical-align: middle;
          margin-right: 17px;
          cursor: pointer;
          &.checked {
            background: url("../../public/imgs/icon-gou.png") #FF6600  no-repeat center;
            border: none;
            background-size: 16px 12px;
          }
        }
        .cart-item-header {
          display: flex;
          height: 80px;
          line-height: 80px;
          .col-1 {
            flex: 1;
          }
          .col-2 {
            flex: 2;
          }
          .col-3 {
            flex: 3;
          }
        }
        .cart-item-list {
          .cart-item {
            display: flex;
            align-items: center;
            height: 125px;
            border-top: 1px solid #e5e5e5;
            font-size: 16px;
            .item-check {
              flex: 1;
            }
            .item-name {
              flex: 3;
              font-size: 18px;
              color: #333333;
              display: flex;
              align-items: center;
              img {
                width: 80px;
                height: 80px;
                vertical-align: middle;
              }
              span {
                margin-left: 30px;
              }
            }
            .item-price {
              flex: 1;
              color: #333333;
            }
            .item-num {
              flex: 2;
              .num-box {
                display: inline-block;
                width: 150px;
                height: 40px;
                line-height: 40px;
                border: 1px solid #e5e5e5;
                font-size: 14px;
                a {
                  display: inline-block;
                  width: 50px;
                  color: #333333;
                }
                span {
                  display: inline-block;
                  width: 50px;
                  color: #333333;
                }
              }
            }
            .item-total {
              flex: 1;
              color: #FF6600;
            }
            .item-del {
              flex: 1;
              width: 14px;
              height: 12px;
              background: url("../../public/imgs/icon-close.png") no-repeat center;
              background-size: contain;
              cursor: pointer;
            }
          }
        }
      }
      .order-wrapper {
        font-size: 14px;
        color: #666666;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
        .cart-tip {
          margin-left: 30px;
          a {
            color: #666666;
            margin-right: 35px;
          }
          span {
            color: #FF6600;
            margin: 0 5px;
          }
        }
        .total {
          font-size: 14px;
          color: #FF6600;
          span {
            font-size: 24px;
          }
          a {
            display: inline-block;
            width: 202px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 17px;
            margin-left: 35px;
            color: white;
            background-color: #FF6600;
          }
        }
      }
    }
  }
</style>
