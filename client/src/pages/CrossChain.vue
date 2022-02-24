<template>
  <div>

    <div class="row">
      <Balance></Balance>
      <Address></Address>
  <!--source chain -->
      <div class="col-lg-12 col-md-12">
          <card type="tasks" :header-classes="{'text-right': isRTL}">
            <template slot="header">
              <h6 class="title d-inline">{{$t('dashboard.sourceChain')}}</h6>
            </template>
            <div class="table-full-width table-responsive">
              <div class="col-lg-12">
                <div class="btn-group btn-group-toggle"
                     :class="isRTL ? 'float-left' : 'float-left'"
                     data-toggle="buttons">
                  <!-- 데이터 가져와서 각각 체인 주소 보여줘야함 -->
                  <label v-for="(option, index) in sendWalletAddresses"
                         :key="option"
                         class="btn btn-sm btn-primary btn-simple"
                         :class="{active: sendWalletAddress.activeIndex === index}"
                         :id="index">
                    <input type="radio"
                           @click="initSendWalletAddress(index)"
                           name="options" autocomplete="off"
                           :checked="sendWalletAddress.activeIndex === index">
                    {{option}}
                  </label>
                </div>
                <cross-chain-form :model="model"></cross-chain-form>
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
  import CrossChainForm from "@/pages/Wallet/CrossChainForm";

  export default {
    components: {
      Balance,
      Address,
      CrossChainForm
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
        model: {
          source_chain: 'P Chain',
          Destination_Chain: 'AVAX',
          amount: '100',
          balance: '100',
          export_fee: '100',
          import_fee: '100',
          total: '100',
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
<style>
</style>
