<template>
  <div>
    <notifications></notifications>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
  // import axios from 'axios'

  export default {
    created() {
      // this.corsRequest();
      if (!this.$store.state.isSignIn) {
        this.$router.push('/login');
      }
      
      this.$store.commit('setNetwork', 'testnet');
    },
    methods: {
      disableRTL() {
        if (!this.$rtl.isRTL) {
          this.$rtl.disableRTL();
        }
      },
      toggleNavOpen() {
        let root = document.getElementsByTagName('html')[0];
        root.classList.toggle('nav-open');
      },
      // corsRequest() {
      //   axios.get("/api/users")
      //   .then((res) => {
      //     console.log('#### corsRequest res', res)
      //   })
      //   .catch((error) => {
      //     console.log('#### corsRequest error', error)
      //   })
      // },
    },
    mounted() {
      this.$watch('$route', this.disableRTL, { immediate: true });
      this.$watch('$sidebar.showSidebar', this.toggleNavOpen);
    },

  };
</script>

<style lang="scss"></style>
