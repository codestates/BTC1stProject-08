<template>
  <div class="col-lg-6" :class="{'text-right': isRTL}">
    <card type="chart">
      <template slot="header">
        <a href="/wallet"><h3 class="card-title"><i><span class="material-icons">restart_alt</span></i> Balance</h3></a>
      </template>
      <!-- card body : balance 데이터 가져와서 뿌려주는 부분 -->
      <div class="chart-area">
        <div class="chart-area row">
          <div class="col-1"></div>
          <div class="col-md-4">
            <label>Available (X)</label>
            <h4>1.899000001 AVAX</h4>
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
export default {
  name: "Balance",
  components: {
  },
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {

  },
  mounted() {

  },
  beforeDestroy() {

  }
};
</script>
<script>
export default {
  name: "Balance"
}
</script>

<style scoped>

</style>