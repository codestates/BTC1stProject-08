<template>
  <div class="m-auto">
    <div class="col-lg-12" style="height:600px">
      <base-search :keyword="keyword" @click="onSearch" @change="setKeyword" />

      <div class="row" v-if="isAddressType">
        <div class="col-lg-12">
          <card>
            <div class="search-result-card">
              <div class="left-side">
                Address
              </div>
              <div>
                <div>{{ keyword }}</div>
                <div>Balance {{balance}} AVAX</div>
              </div>
            </div>
          </card>
        </div>
      </div>
      <div class="row" v-if="isAddressType">
        <div class="col-lg-12 address-info-wrapper">
          <base-table
              :columns="addressDetails.columns"
              :data="addressDetails.data"
          >
          </base-table>
        </div>
      </div>

      <!-- 트랜잭션 -->
      <div class="row" v-if="this.type === 'transaction'">
        <card>
          <div class="row">
            <div class="col-md-12">
              <label>Chain ID</label>
              <h5 class="title d-inline"> : {{chainDetails.chainID}}</h5><br>
              <label>Value</label>
              <h5 class="title d-inline"> : {{chainDetails.value}}</h5><br>
              <label>type</label>
              <h5 class="title d-inline"> : {{chainDetails.type}}</h5><br>
              <label>Burned</label>
              <h5 class="title d-inline"> : {{chainDetails.burned}} AVAX</h5><br>
              <label>Time</label>
              <h5 class="title d-inline"> : {{chainDetails.time}}</h5><br>
              <label>From</label>
              <h5 class="title d-inline"> : {{chainDetails.from[0]}}</h5><br>
              <label>Balance</label>
              <h5 class="title d-inline"> : {{chainDetails.from_balance}} AVAX</h5><br>
              <label>To</label>
              <h5 class="title d-inline"> : {{chainDetails.to[0]}}</h5><br>
              <label>Balance</label>
              <h5 class="title d-inline"> : {{chainDetails.to_balance}} AVAX</h5><br>
            </div>
          </div>
        </card>
      </div>

      <div class="row">
        <div class="col-lg-12 address-info-wrapper">
          <card>
            <div>Latest Transaction</div>
            <br />
            <base-table
                :columns="['index', 'id', 'txByte', 'time']"
                :data="transactions"
            >
            </base-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { bnToAvaxX } from '@avalabs/avalanche-wallet-sdk'
import BaseSearch from '@/components/BaseSearch';
import { Network } from '@/dictionary/networkDictionary';
import BaseTable from "@/components/BaseTable";
import moment from "moment";

export default {
  name: 'XChain',
  components: {
    BaseTable,
    BaseSearch,
  },
  mounted() {
    this.getTransactions();
    setInterval(() => {
      this.getTransactions();
    }, 1000 * 60);
  },
  data() {
    return {
      loading: false,
      searched: false,
      type: null,
      keyword: '',
      balance: 0,
      unLocked: 0,
      transactions: [],
      lockedStakeable: 0,
      lockedNotStakeable: 0,
      // utxoIDs: 0,
      locked: 0,
      addressDetails: {
        columns: ['type', 'amount'],
        data: [],
      },
      chainDetails: {
        chainID: '',
        value: '',
        type: '',
        burned: '',
        time: '',
        from: '',
        from_balance: '',
        to: '',
        to_balance: '',
      }
    }
  },
  computed: {
    isAddressType() {
      return this.type === 'address';
    }
  },
  methods: {
    async getTransactions() {
      try {
        const { data } = await this.$axios.get('/api/tx/ptransactions?page=1');
        this.transactions = data.data.map(t => ({
          id: t.txId,
          txbyte: `${t.txByte}`.substring(0, 20) + '...',
          time: moment(t.txTime).format('YYYY-MM-DD hh:mm:ss'),
          index: t.txIndex,
        }));
      } catch (error) {
        console.info(error);
      }
    },
    parseXBalance(balance) {
      return bnToAvaxX(balance);
    },
    setKeyword(value) {
      this.keyword = value;
    },
    async onSearch() {
      if (this.loading) {
        return;
      }

      if (!this.keyword) {
        alert('검색어를 입력해주세요.');
        return;
      }

      this.loading = true;
      const isAddress = this.keyword.startsWith('P-fuji');
      if (isAddress) {
        try {
          const { data } = await this.$axios.post(`${Network.apiNetwork.protocol}://${Network.apiNetwork.host}/ext/bc/P`,{
            "jsonrpc":"2.0",
            "id"     : 1,
            "method" :"platform.getBalance",
            "params" :{
              "address": this.keyword,
            }
          });
          this.balance = this.parseXBalance(data.result.balance);
          this.unLocked = this.parseXBalance(data.result.unlocked);
          this.lockedStakeable =this.parseXBalance(data.result.lockedStakeable);
          this.lockedNotStakeable = this.parseXBalance(data.result.lockedNotStakeable);
          // this.utxoIDs = data.result.utxoIDs.txID;
          this.locked = (this.balance - this.unLocked);
          this.addressDetails.data = [
            {
              type: 'Locked',
              amount: `${this.locked} AVAX`,
            },
            {
              type: 'Unlocked',
              amount: `${this.unLocked} AVAX`,
            },
            {
              type: 'Staked',
              amount: '0 AVAX', //우선 api 상 확인 안되어서 0 처리 함
            },
            {
              type: 'Total Balance',
              amount: `${this.balance} AVAX`,
            },
          ];
          console.log('this.addressDetails.data',this.addressDetails.data);
          this.type = 'address';
        } catch (error) {
          console.info(error);
        }
      } else {
        // transaction search
        try {
          const { data } = await this.$axios.get(`/api/tx/normaltransaction?txId=${this.keyword}`);
          if(data.status === 200) {
            this.chainDetails = {
              chainID: data.data.id,
              value: data.data.outputTotals.key,
              type: data.data.type,
              txBlockId: data.data.txBlockId,
              burned: this.parseXBalance(data.data.txFee),
              time: data.data.timestamp,
              from: data.data.inputs[0].output.addresses,
              from_balance: this.parseXBalance(data.data.inputs[0].output.amount),
              to: data.data.outputs[0].addresses,
              to_balance: this.parseXBalance(data.data.outputs[0].amount),
            }
            this.type = 'transaction';
            // console.log(this.chainDetails);
          }else {
            console.log(' get P-Chain transaction failed...', data.status);
          }
        } catch (error) {
            console.info(error);
        }

      }

      this.searched = true;
      this.loading = false;
    },
  },
};
</script>
<style lang="scss">
.search-result-card {
  display: flex;
  color: white;

  .left-side {
    padding-top: 6px;
    margin-right: 1rem;
    font-size: 11px;
  }
}
</style>
