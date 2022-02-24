<template>
  <div class="col-lg-6" :class="{'text-right': isRTL}">
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
          <p> P-fuji16u0pku6aqa5qatpd84s556tp8j5lg52rzwuzcm </p>
        </div>
      </div>
    </card>
  </div>
</template>
<script>

export default {
  name: "Address",
  components: {
  },
  data() {
    return {
      walletAddress: {
        chartCategories_description: [
          "X-Chain 은 코인을 받기 위한 주소입니다. 입금할 때마다 주소는 변경됩니다. 이전 주소를 계속 사용할 수 있습니다.",
          "P-Chain 은 스테이킹 보상, cross chain transfers 을 할 수 있습니다.",
          "C-Chain 은 이더리움가상머신(EVM)과 상호작용 합니다."],
        activeIndex: 0,
      },
      sendWalletAddress: {
        activeIndex: 0,
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
    bigLineChartCategories() {
      return this.$t('dashboard.chartCategories');
    },
    walletAddresses() {
      return this.$t('dashboard.walletAddresses');
    },
    sendWalletAddresses() {
      return this.$t('dashboard.sendWalletAddresses');
    }
  },
  methods: {
    initWalletAddress(index) {
      this.walletAddress.activeIndex = index;
    },
    initSendWalletAddress(index) {
      this.sendWalletAddress.activeIndex = index;
    },
  },
  mounted() {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = 'ar';
      this.$rtl.enableRTL();
    }
    this.initBigChart(0);
  },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = 'en';
      this.$rtl.disableRTL();
    }
  }
};
</script>
<style scoped>

</style>