<template>
  <div>
    <div class="row">
      <Balance></Balance>
      <Address></Address>
<!-- ManageKeysInfo -->
      <div class="col-lg-12 col-md-12">
        <card type="tasks" :header-classes="{'text-right': isRTL}">
          <template slot="header">
            <h6 class="title d-inline">My Keys</h6>
          </template>
          <!-- <div class="table-full-width table-responsive"> -->
            <div class="col-lg-12">
              <manage-keys-info></manage-keys-info>
            </div>
          <!-- </div> -->
        </card>
      </div>
    </div>
  </div>  
</template>

<script>
  import Balance from "@/pages/Wallet/Balance";
  import Address from "@/pages/Wallet/Address";
  import ManageKeysInfo from "@/pages/Wallet/ManageKeysInfo";

  
  export default {
    components: {
      Balance,
      Address,
      ManageKeysInfo
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
