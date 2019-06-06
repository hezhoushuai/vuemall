<template>
  <div class="cart-total" v-if="cartGoodsTotal !== 0">{{cartGoodsTotal}}</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'cartGoodsTotal'
    ])
  }
}
</script>

<style lang="scss" scoped>
 .cart-total {
    height: 1rem;
    width: 1rem;
    line-height: 1rem;
    text-align: center;
    background: #BF1111;
    border-radius: 50%;
    font-size: 12px;
    color: #ffffff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
