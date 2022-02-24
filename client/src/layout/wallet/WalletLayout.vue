<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/wallet" :name="$t('sidebar.send')" icon="send"/>
        <sidebar-link to="/cross_chain" :name="$t('sidebar.cross_chain')" icon="currency_exchange"/>
        <sidebar-link to="/manage_keys" :name="$t('sidebar.manage_keys')" icon="qr_code_2"/>
        <sidebar-link to="/login" :name="$t('sidebar.login')" icon="qr_code_2"/>
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
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
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
