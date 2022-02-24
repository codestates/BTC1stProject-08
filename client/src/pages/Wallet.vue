<template>
  <div>
    <div class="row">
      <Balance></Balance>
      <Address></Address>
  <!--source chain -->
      <div class="col-lg-12 col-md-12">
          <card type="tasks" :header-classes="{'text-right': isRTL}">
            <template slot="header">
              <h6 class="title d-inline">Source Chain</h6>
            </template>
            <div class="table-full-width table-responsive">
              <div class="col-lg-12">
                <div class="btn-group btn-group-toggle"
                     :class="isRTL ? 'float-left' : 'float-left'"
                     data-toggle="buttons">
                  <!-- 데이터 가져와서 각각 체인 주소 보여줘야함 -->
                  <label v-for="(option, index) in chanTypes"
                         :key="option"
                         class="btn btn-sm btn-primary btn-simple"
                         :class="{active: activeIndex === index}"
                         :id="index">
                    <input type="radio"
                           @click="onClickChainType(index)"
                           name="options" autocomplete="off"
                           :checked="activeIndex === index">
                    {{option}}
                  </label>
                </div>
                <send-form-x v-if="isXChain"></send-form-x>
                <send-form-c v-else></send-form-c>
              </div>
            </div>
          </card>
        </div>

    </div>
  </div>
</template>
<script>
  import Balance from "@/pages/Wallet/Balance";
  import Address from "@/pages/Wallet/Address";
  import SendFormX from "@/pages/Wallet/SendFormX";
  import SendFormC from "@/pages/Wallet/SendFormC";
  import { ChainType } from "@/dictionary/chainTypeDictionary"

  export default {
    components: {
      Balance,
      Address,
      SendFormX,
      SendFormC,
    },
    data() {
      return {
        activeIndex: 0,
      }
    },
    computed: {
      isXChain() {
        return this.activeIndex === 0;
      },
      walletAddresses() {
        return this.$t('dashboard.walletAddresses');
      },
      chanTypes() {
        return [ChainType.xChain, ChainType.cChain];
      },
      isRTL() {
        return this.$rtl.isRTL;
      }
    },
    methods: {
      onClickChainType(index) {
        this.activeIndex = index;
      },
    },
  };
</script>
<style>
</style>
