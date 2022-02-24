<template>
  <div>

    <div class="row">

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

      <div class="col-lg-6" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">{{walletAddress.chartCategories_description[walletAddress.activeIndex]}}</h5>
              </div>
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle"
                     :class="isRTL ? 'float-left' : 'float-right'"
                     data-toggle="buttons">
                  <!-- 데이터 가져와서 각각 체인 주소 보여줘야함 -->
                  <label v-for="(option, index) in walletAddresses"
                         :key="option"
                         class="btn btn-sm btn-primary btn-simple"
                         :class="{active: walletAddress.activeIndex === index}"
                         :id="index">
                    <input type="radio"
                           @click="initWalletAddress(index)"
                           name="options" autocomplete="off"
                           :checked="walletAddress.activeIndex === index">
                    {{option}}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <div class="col-sm-11">
              <h2>Derived Platform Wallet Address</h2>
              <p> P-fuji16u0pku6aqa5qatpd84s556tp8j5lg52rzwuzcm </p>
            </div>
          </div>
        </card>
      </div>

      <div class="row">
        <div class="col-lg-12 col-md-12">
          <card type="tasks" :header-classes="{'text-right': isRTL}">
            <template slot="header">
              <h6 class="title d-inline">{{$t('dashboard.tasks', {count: 5})}}</h6>
              <p class="card-category d-inline">{{$t('dashboard.today')}}</p>
              <base-dropdown menu-on-right=""
                             tag="div"
                             title-classes="btn btn-link btn-icon"
                             aria-label="Settings menu"
                             :class="{'float-left': isRTL}">
                <i slot="title" class="tim-icons icon-settings-gear-63"></i>
                <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.action')}}</a>
                <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.anotherAction')}}</a>
                <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.somethingElse')}}</a>
              </base-dropdown>
            </template>
            <div class="table-full-width table-responsive">
              <task-list></task-list>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import TaskList from './Dashboard/TaskList';

  export default {
    components: {
      TaskList,
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
      }
    },
    methods: {
      initWalletAddress(index) {
        // console.log(index);
        // let addressData = {
        //   datasets: [{
        //     description: this.walletAddress.chartCategories_description[index]
        //     }],
        //   }
        this.walletAddress.activeIndex = index;
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
