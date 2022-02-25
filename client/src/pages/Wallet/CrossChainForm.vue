<template>
  <div>
    <div class="col-md-6" style="float:left">
      <div>
        <div class="row">
          <div class="col-md-6">
            <label>Source Chain</label>
            <select class="form-control" aria-label="Default select example" :value="sourceIndex" @change="onChangeSourceIndex">
              <option :value="chain.value" :key="chain.label" v-for="chain in chains">
                {{ chain.label }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label style="padding-top:5%">Destination Chain</label>
            <select class="form-control" aria-label="Default select example" :value="targetIndex" @change="onChangeTargetIndex">
              <option :value="chain.value" :key="chain.label" v-for="chain in targetChains">
                {{ chain.label }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label style="padding-top:5%">Transfer Amount</label>
            <input class="form-control" type="number" step="0.01" placeholder="0.01" v-model="transferAmount" @change="onChangeTransferAmount">
          </div>
        </div>
        <div class="row">
          <label style="padding-left: 5%; padding-top:5% ">Fee</label>
        </div>
        <div class="row">
          <label style="padding-left: 5%; padding-right:5%">Expert Fee</label>
          <p>10</p>
        </div>
        <div class="row">
          <label style="padding-left: 5%; padding-right:5%">Import Fee</label>
          <p>10</p>
        </div>        
        <div class="row">
          <label style="padding-left: 5%; padding-right:5%">Total</label>
          <label><p>10</p></label>
        </div>
        
        <base-button slot="footer" type="primary" fill @click="cross" :loading="isLoading">CONFIRM</base-button>
      </div>
    </div>
    <div class="row" style="width:50%; float:right">
      <div class="">
        <card class="iner-card flow-left">
          <label class="label-name">Source</label>
          <p>{{this.source}}</p>
        </card>
        <card class="iner-card flow-right">
          <label class="label-name">Destination</label>
          <p>{{this.target}}</p>
        </card>
        <card class="iner-card flow-left">
          <label class="label-name">ExPort</label>
          <p>Transaction</p>
          <p>{{this.exportTx}}</p>
        </card>
        <card class="iner-card flow-right">
          <label class="label-name">ImPort</label>
          <p>Transaction</p>
          <p>{{this.importTx}}</p>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
  import { ChainTypeIndex } from '@/dictionary/chainTypeDictionary';
  import {BN, MnemonicWallet, waitTxX } from "@avalabs/avalanche-wallet-sdk";
import Card from '../../components/Cards/Card.vue';
  export default {
  components: { Card },
    data() {
      return {
        isLoading: false,
        chains: [
          {
            value: ChainTypeIndex.xChain,
            label: 'X Chain',
          },
          {
            value: ChainTypeIndex.pChain,
            label: 'P Chain',
          },
          {
            value: ChainTypeIndex.cChain,
            label: 'C Chain',
          },
        ],
        sourceIndex: ChainTypeIndex.xChain,
        targetIndex: ChainTypeIndex.cChain,
        transferAmount: 0,
        source:'X-Chain',
        target:'C-Chain',
        wallet: null,
        exportTx: '',
        importTx: '',
      }
    },
    computed: {
      targetChains() {
        return this.chains.filter(c => c.value !== this.sourceIndex);
      }
    },
    methods: {
      onChangeSourceIndex({ target }) {
        this.sourceIndex = Number(target.value);
        this.source = Number(target.value) === 0 ? 'X-Chain':  Number(target.value) === 1 ? 'P-Chain' : 'C-Chain';
      },
      onChangeTargetIndex({ target }) {
        this.targetIndex = Number(target.value);
        this.target = Number(target.value) === 0 ? 'X-Chain':  Number(target.value) === 1 ? 'P-Chain' : 'C-Chain';
      },
      onChangeTransferAmount({ target }) {
        this.transferAmount = Number(target.value);
      },
      async cross() {
        const amt = this.transferAmount * 1000000000;
          switch(this.sourceIndex){
            case 0:
              this.exportX(amt)
              break;
            case 1:
              this.exportP(amt)
              break;
            case 2:
              this.exportC(amt);
              break;
            default:
              break;
          }
      },
      async exportX(amount) {
        this.isLoading = true;
        this.wallet.resetHdIndices().then(async() => {
            await this.wallet.updateUtxosX()
            // const gasPrice = new BN(this.gasPrice);
            // const gasLimit = 0;
            console.log(amount);
            let ammount = new BN(amount);
            this.exportTx = await this.wallet.exportXChain(ammount,(this.targetIndex === 1 ? 'P' : 'C'))  //TODO 타겟 'C' or 'P'
            console.log(this.exportTx);
            setTimeout(()=>{ this.allimport()},2000);
        })  
      },
      async exportP(amount) {
          this.isLoading = true;
          this.wallet.resetHdIndices().then(async() => {
              await this.wallet.updateUtxosX()
              // const gasPrice = new BN(this.gasPrice);
              // const gasLimit = 0;
              console.log(amount);
              let ammount = new BN(amount);
              this.exportTx = await this.wallet.exportPChain(ammount,(this.targetIndex === 2 ? 'C' : 'X')) //TODO 타겟 'C' or 'P'
              console.log(this.exportTx);
              setTimeout(()=>{ this.allimport()},2000);
          })
      },
      async exportC(amount) {
          this.isLoading = true;
          this.wallet.resetHdIndices().then(async() => {
              await this.wallet.updateUtxosX()
              // const gasPrice = new BN(this.gasPrice);
              // const gasLimit = 0;
              console.log(amount);
              let ammount = new BN(amount);
              this.exportTx = await this.wallet.exportCChain(ammount,(this.targetIndex === 0 ? 'X' : 'P')) //TODO 타겟 'C' or 'P'
              console.log(this.exportTx);
              setTimeout(()=>{ this.allimport()},2000);
          })
      },
      async allimport(){
        this.wallet.resetHdIndices()
        .then(async()=>{
            try{
                this.importTx = await this.wallet.importX('P')
            }catch(e){
                console.log(e)
            }
            try{
                this.importTx = await this.wallet.importX('C')
            }catch(e){
                console.log(e)
            }
            try{
                this.importTx = await this.wallet.importP('X')
            }catch(e){
                console.log(e)
            }
            try{
                this.importTx = await this.wallet.importP('C')
            }catch(e){
                console.log(e)
            }
            try{
                this.importTx = await this.wallet.importC('P')
            }catch(e){
                console.log(e)
            }
            try{
                this.importTx = await this.wallet.importC('X')
            }catch(e){
                console.log(e)
            }
        })
        this.isLoading = false;
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.wallet = this.$store.state.wallet;
        // 전체 화면내용이 렌더링된 후에 아래의 코드가 실행됩니다.
      })
    },
  }
</script>
<style>
.export-chain {
  background-color: #bcbdc7;
  width: 90%;
}
  .iner-card {
    background-color:rgb(85, 16, 235);
    width: 45%;
    margin: 2% 2% 2% 2%;
  }

  .flow-right {
    float: right;
  }

  .flow-left {
    float: left;
  }
</style>
