<template>
  <div>
    <div class="row">
      <Balance></Balance>
      <Address></Address>
      <manage-keys-info></manage-keys-info>
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
