<template>
  <div class="col-lg-6" >
    <card type="chart">
      <template slot="header">
        <div class="row">
          <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
            <h5 class="card-category">{{walletAddress.chartCategories_description[walletAddress.activeIndex]}}</h5>
          </div>
          <div class="col-sm-6">
            <div class="btn-group btn-group-toggle"
                 :class="isRTL ? 'float-left' : 'float-right'"
                 data-toggle="buttons">
              <!-- 데이터 가져와서 각각 체인 주소 보여줘야함 -->
              <label v-for="(option, index) in walletAddresses"
                     :key="option"
                     class="btn btn-sm btn-primary btn-simple"
                     :class="{active: walletAddress.activeIndex === index}"
                     :id="index">
                <input type="radio"
                       @click="initWalletAddress(index)"
                       name="options" autocomplete="off"
                       :checked="walletAddress.activeIndex === index">
                {{option}}
              </label>
            </div>
          </div>
        </div>
      </template>
      <div class="chart-area">
        <div class="col-sm-11">
          <h2>Derived Platform Wallet Address</h2>
          <p> {{ walletAddress.activeAddress }}</p>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import { ChainType } from "@/dictionary/chainTypeDictionary"

export default {
  name: "Address",
  components: {
  },
  beforeCreate() {
  },
  data() {
    return {
      walletAddress: {
        chartCategories_description: [
          "X-Chain 은 코인을 받기 위한 주소입니다. 입금할 때마다 주소는 변경됩니다. 이전 주소를 계속 사용할 수 있습니다.",
          "P-Chain 은 스테이킹 보상, cross chain transfers 을 할 수 있습니다.",
          "C-Chain 은 이더리움가상머신(EVM)과 상호작용 합니다."],
        activeIndex: 0,
        activeAddress: "",
      },
    }
  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    walletAddresses() {
      return [ChainType.xChain, ChainType.pChain, ChainType.cChain];
    },
    xWalletAddress() {
      return this.$store.state.address.X;
    }
  },
  methods: {
    initWalletAddress(index) {
      this.walletAddress.activeIndex = index;
      const addressList = [this.$store.state.address.X, this.$store.state.address.P, this.$store.state.address.C];
      this.walletAddress.activeAddress = addressList[this.walletAddress.activeIndex]
    },
  },
  mounted() {
    console.log("mounted");
    this.$store.commit('refreshAddress');
    this.walletAddress.activeAddress = this.$store.state.address.X;
  },
  beforeDestroy() {

  }
};
</script>
<style scoped>

</style>