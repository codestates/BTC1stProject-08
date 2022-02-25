<template>
  <div class="col-lg-6">
    <card type="chart">
      <template slot="header">
        <a href="/wallet/wallet"><h3 class="card-title"><i><span class="material-icons">restart_alt</span></i> Balance</h3></a>
      </template>
      <!-- card body : balance 데이터 가져와서 뿌려주는 부분 -->
      <div class="chart-area">
        <div class="chart-area row">
          <div class="col-1"></div>
          <div class="col-md-4">
            <label>Available (X)</label>
            <h4>{{ availableX }} AVAX</h4>
            <label>Available (P)</label>
            <h4>1.899000001 AVAX</h4>
            <label>Available (C)</label>
            <h4>1.899000001 AVAX</h4>
          </div>
          <div class="col-md-4">
            <label>Locked (X)</label>
            <h4>1.899000001 AVAX</h4>
            <label>Locked (P)</label>
            <h4>1.899000001 AVAX</h4>
            <label>Locked (C)</label>
            <h4>1.899000001 AVAX</h4>
          </div>
          <div class="col-md-3">
            <label>Staking</label>
            <h4>0 AVAX</h4>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import {MnemonicWallet, bnToAvaxX } from "@avalabs/avalanche-wallet-sdk";

export default {
  name: "Balance",
  components: {
  },
  data() {
    return {
      balance: {
        // availableX: this.$store.state.wallet.(),
        // availableP: 0,
        availableC: 0,
      },
      locked: {
        lockedX: 0,
        lockedP: 0,
        lockedC: 0,
      },
      staking: 0
    }
  },
  computed: {
    availableX() {

      const result = this.$store.state.wallet.getAvaxBalanceX();
      const xAvax = bnToAvaxX(result.unlocked);
      const xAvax2 = bnToAvaxX(result.locked);
      console.log(xAvax, xAvax2);
      return xAvax;
    },
  },
  methods: {
    async getBalance() {
      const mnemonic = "dust egg camera liberty drift grow mandate middle garment toy make gravity code bag toy tortoise gorilla bomb jar limb main habit boil truth";
      const myWallet = MnemonicWallet.fromMnemonic(mnemonic);
      // const addressP = myWallet.;
      // const addressC = myWallet.getAddressC();
      //
      // this.balance.availableX = addressX.balanceX;
    }

  },
  mounted() {
    this.getBalance();
  },
  beforeDestroy() {

  }
};
</script>


<style scoped>

</style>