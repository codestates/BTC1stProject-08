<template>
  <div>
    <div class="row">
      <Balance></Balance>
      <Address></Address>
  <!--source chain -->
      <div class="col-lg-12 col-md-12">
          <card type="tasks" :header-classes="{'text-right': isRTL}">
            <template slot="header">
              <h6 class="title d-inline">CROSS CHAIN</h6>
            </template>
            <div class="table-full-width table-responsive">
              <div class="col-lg-12">
                <cross-chain-form></cross-chain-form>
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
    computed: {
      isRTL() {
        return this.$rtl.isRTL;
      },
    },
  };
</script>
<style>
</style>
