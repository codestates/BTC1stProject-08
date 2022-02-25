<template>
  <div class="col-lg-6">
    <card type="chart">
      <template slot="header">

        <a href="#" onclick="refreshBalance" style="float: left; padding: 10px" ><i><span class="material-icons">restart_alt</span></i></a>
        <h3 style="float: left; margin-top: 7px" class="card-title">Balance</h3>
      </template>
      <!-- card body : balance 데이터 가져와서 뿌려주는 부분 -->
      <div class="chart-area">
        <div class="chart-area row">
          <div class="col-1"></div>
          <div class="col-md-4">
            <label>Available (X)</label>
            <h4>{{ availableX }} AVAX</h4>
            <label>Available (P)</label>
            <h4>{{ availableP }} AVAX</h4>
            <label>Available (C)</label>
            <h4>{{ availableC }} AVAX</h4>
          </div>
          <div class="col-md-4">
            <label>Locked (X)</label>
            <h4>{{ LockedX }} AVAX</h4>
            <label>Locked (P)</label>
            <h4>{{ LockedP }} AVAX</h4>
            <label>Locked Stakeable (P)</label>
            <h4>{{ LockedPS }} AVAX</h4>
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
export default {
  name: "Balance",
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    availableX() {
      return this.$store.state.balances.unlocked.X;
    },
    availableC() {
      return this.$store.state.balances.unlocked.C;
    },
    availableP() {
      return this.$store.state.balances.unlocked.P;
    },
    LockedX() {
      return this.$store.state.balances.locked.X;
    },
    LockedP() {
      return this.$store.state.balances.locked.P;
    },
    LockedPS() {
      return this.$store.state.balances.locked.PS;
    }

  },
  methods: {
    refreshBalance() {
      this.$store.commit('refreshBalance');
    }
  },
  mounted() {
    this.$store.commit('refreshBalance');
  },
};
</script>


<style scoped>

</style>