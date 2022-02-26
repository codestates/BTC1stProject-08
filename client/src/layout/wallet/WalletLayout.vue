<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link v-if="isLogin" to="/wallet" :name="$t('sidebar.send')" icon="send"/>
        <sidebar-link v-if="isLogin" to="/cross_chain" :name="$t('sidebar.cross_chain')" icon="currency_exchange"/>
        <sidebar-link v-if="isLogin" to="/manage_keys" :name="$t('sidebar.manage_keys')" icon="qr_code_2"/>
      </template>
      <template slot="explorer-links">
        <sidebar-link to="/c-chain" name="C Chain" icon="layers"/>
        <sidebar-link to="/x-chain" name="X Chain" icon="monetization_on"/>
        <sidebar-link to="/p-chain" name="P Chain" icon="savings"/>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
  },
  computed: {
    isLogin() {
      return this.$store.state.isSignIn;
    },
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
