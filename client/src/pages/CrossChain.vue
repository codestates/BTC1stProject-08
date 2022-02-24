<template>
  <div>

    <div class="row">

      <div class="col-lg-6" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <a href="/dashboard"><h3 class="card-title"><i><span class="material-icons">restart_alt</span></i> Balance</h3></a>
          </template>
          <!-- card body -->
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
<!--                  <label v-for="(option, index) in bigLineChartCategories"-->
<!--                         :key="option"-->
<!--                         class="btn btn-sm btn-primary btn-simple"-->
<!--                         :class="{active: bigLineChart.activeIndex === index}"-->
<!--                         :id="index">-->
<!--                    <input type="radio"-->
<!--                           @click="initBigChart(index)"-->
<!--                           name="options" autocomplete="off"-->
<!--                           :checked="bigLineChart.activeIndex === index">-->
<!--                    {{option}}-->
<!--                  </label>-->
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
<!--            <line-chart style="height: 100%"-->
<!--                        ref="bigChart"-->
<!--                        chart-id="big-line-chart"-->
<!--                        :chart-data="bigLineChart.chartData"-->
<!--                        :gradient-colors="bigLineChart.gradientColors"-->
<!--                        :gradient-stops="bigLineChart.gradientStops"-->
<!--                        :extra-options="bigLineChart.extraOptions">-->
<!--            </line-chart>-->
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
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import TaskList from './Dashboard/TaskList';
  import UserTable from './Dashboard/UserTable';
  import config from '@/config';

  export default {
    components: {
      LineChart,
      BarChart,
      TaskList,
      UserTable
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
        bigLineChart: {
          allData: [
            [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
            [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
            [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [{ }],
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          },
          extraOptions: chartConfigs.purpleChartOptions,
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
          categories: [],
        },
        purpleLineChart: {
          extraOptions: chartConfigs.purpleChartOptions,
          chartData: {
            labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            datasets: [{
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [80, 100, 70, 80, 120, 80],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.2, 0],
        },
        greenLineChart: {
          extraOptions: chartConfigs.greenChartOptions,
          chartData: {
            labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
            datasets: [{
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80],
            }]
          },
          gradientColors: ['rgba(66,134,121,0.15)', 'rgba(66,134,121,0.0)', 'rgba(66,134,121,0)'],
          gradientStops: [1, 0.4, 0],
        },
        blueBarChart: {
          extraOptions: chartConfigs.barChartOptions,
          chartData: {
            labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
            datasets: [{
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80, 100, 45],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
        }
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
      initBigChart(index) {
        let chartData = {
          datasets: [{
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index]
          }],
          labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        }
        this.$refs.bigChart.updateGradients(chartData);
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      }
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
