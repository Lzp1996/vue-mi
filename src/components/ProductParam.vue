<template>
  <div class="nav-bar" :class="{'isFixed': isFixed}">
    <div class="container">
      <div class="pro-title">
        {{title}}
      </div>
      <div class="pro-param">
        <a href="javascript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductParam',
  props: {
    title: String
  },
  data () {
    return {
      isFixed: false
    }
  },
  methods: {
    initHeight () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
          document.body.scrollTop
      if (scrollTop > 152) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.initHeight)
  },
  destroyed () {
    window.removeEventListener('scroll', this.initHeight, false)
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/base";
  .nav-bar {
    height: 60px;
    line-height: 60px;
    background-color: white;
    z-index: 19;
    &.isFixed {
      position: fixed;
      top: 0;
      width: 100%;
      overflow: hidden;
    }
    .container{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .pro-title{
        font-size: 18px;
        font-weight: bold;
      }
      .pro-param{
        font-size: 14px;
        span {
          margin: 0 10px;
        }
        a {
          color: #666666;
        }
      }
    }
  }
</style>
