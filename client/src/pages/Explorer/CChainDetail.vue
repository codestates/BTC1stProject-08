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
              <label>Hash</label>
              <h5 class="title d-inline"> : {{chainDetails.hash}}</h5><br>
              <label>Block</label>
              <h5 class="title d-inline"> : {{chainDetails.block}}</h5><br>
              <label>Gas Price</label>
              <h5 class="title d-inline"> : {{chainDetails.gasPrice}} AVAX</h5><br>
              <label>Max Fee Per Gas</label>
              <h5 class="title d-inline"> : {{chainDetails.maxFeePerGas}} AVAX</h5><br>
              <label>To</label>
              <h5 class="title d-inline"> : {{chainDetails.to}}</h5><br>
              <label>From</label>
              <h5 class="title d-inline"> : {{chainDetails.from}}</h5><br>
              <label>Time</label>
              <h5 class="title d-inline"> : {{chainDetails.time}}</h5><br>
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
import BaseTable from "@/components/BaseTable";
import moment from "moment";

export default {
  name: 'CChain',
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
      transactions: [],
      addressDetails: {
        columns: ['type', 'amount'],
        data: [],
      },
      chainDetails: {
        hash: '',
        block: '',
        gasPrice: '',
        maxFeePerGas: '',
        to: '',
        time: '',
        from: '',
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
        const { data } = await this.$axios.get('/api/tx/ctransactions?page=1');
        console.log(data);
        this.transactions = data.data.map(t => ({
          id: t.txId,
          txbyte: `${t.txByte}`.substring(0, 20) + '...',
          time: moment(t.txTime).format('YYYY-MM-DD hh:mm:ss'),
          index: t.txIndex
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
      const isAddress = this.keyword.startsWith('0x9');
      if (isAddress) {
        alert('C-체인의 지갑 정보는 조회되지 않습니다.')
        // try {
        //   const { data } = await this.$axios.post(`${Network.apiNetwork.protocol}://${Network.apiNetwork.host}/ext/bc/X`,{
        //     "jsonrpc":"2.0",
        //     "id"     : 1,
        //     "method" :"avm.getAllBalances",
        //     "params" :{
        //       "address": this.keyword,
        //     }
        //   });
        //
        //   this.balance = this.parseXBalance(data.result.balances.find(data => data.asset === 'AVAX').balance);
        //   this.addressDetails.data = [
        //     {
        //       type: 'Locked',
        //       amount: '0 AVAX',
        //     },
        //     {
        //       type: 'Unlocked',
        //       amount: `${this.balance} AVAX`,
        //     },
        //     {
        //       type: 'Staked',
        //       amount: '0 AVAX',
        //     },
        //     {
        //       type: 'Total Balance',
        //       amount: '0 AVAX',
        //     },
        //   ];
        //   this.type = 'address';
        // } catch (error) {
        //   console.info(error);
        // }
      } else {
        // transaction search
        try {
          const { data } = await this.$axios.get(`/api/tx/ctransaction?txId=${this.keyword}`);
          console.log(">>>",data)
          if(data.status === 200) {
            this.chainDetails = {
              hash: data.data.hash,
              block: data.data.block,
              gasPrice: this.parseXBalance(data.data.gasPrice),
              maxFeePerGas: this.parseXBalance(data.data.maxFeePerGas),
              to: data.data.toAddr,
              time: data.data.createdAt,
              from: data.data.fromAddr,
            }
            this.type = 'transaction';
            // console.log(this.chainDetails);
          }else {
            console.log(' get C-chain transaction failed...', data.status);
          }
        } catch (error) {
          alert('정보가 조회되지 않았습니다.');
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
