<template>
  <card>
    <div class="row">
      <div class="col-md-4 px-md-1">
        <label>Source Chain</label>
        <select class="form-control" aria-label="Default select example" :value="sourceIndex" @change="onChangeSourceIndex">
          <option :value="chain.value" :key="chain.label" v-for="chain in chains">
            {{ chain.label }}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 px-md-1">
        <label>Destination Chain</label>
        <select class="form-control" aria-label="Default select example" :value="targetIndex" @change="onChangeTargetIndex">
          <option :value="chain.value" :key="chain.label" v-for="chain in targetChains">
            {{ chain.label }}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 px-md-1">
        <label>Transfer Amount</label>
        <input class="form-control" type="number" step="0.01" placeholder="0.01" v-model="transferAmount" @change="onChangeTransferAmount">
      </div>
    </div>
    <div class="row">
      <label style="padding-right: 10px">Fee</label>
    </div>
    <div class="row">
      <label style="padding-right: 10px">Expert Fee</label>
      <p>10</p>
    </div>
    <div class="row">
      <label style="padding-right: 10px">Import Fee</label>
      <p>10</p>
    </div>
    <div class="row">
      <label style="padding-right: 10px">Total</label>
      <label><p>10</p></label>
    </div>
    <base-button slot="footer" type="primary" fill @click="cross" :loading="isLoading">CONFIRM</base-button>
  </card>
</template>
<script>
  import { ChainTypeIndex } from '@/dictionary/chainTypeDictionary';
  import {BN, MnemonicWallet, setNetwork, TestnetConfig} from "@avalabs/avalanche-wallet-sdk";
  export default {
    data() {
      return {
        isLoading: false,
        chains: [
          {
            value: ChainTypeIndex.xChain,
            label: 'X Chain',
          },
          {
            value: ChainTypeIndex.cChain,
            label: 'C Chain',
          },
          {
            value: ChainTypeIndex.pChain,
            label: 'P Chain',
          },
        ],
        sourceIndex: ChainTypeIndex.xChain,
        targetIndex: ChainTypeIndex.cChain,
        transferAmount: 0,
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
      },
      onChangeTargetIndex({ target }) {
        this.targetIndex = Number(target.value);
      },
      onChangeTransferAmount({ target }) {
        this.transferAmount = Number(target.value);
      },
      async cross() {
        try {
          this.isLoading = true;
          const newMnemonic = 'fantasy trim fun junk wisdom cement rally infant blush twist mom dilemma museum flat dad bulk hunt lawn unable huge sunny almost equip song';
          const myWallet = MnemonicWallet.fromMnemonic(newMnemonic);
          setNetwork(TestnetConfig);
          await myWallet.resetHdIndices();
          await myWallet.updateUtxosX();

          // const addressX = myWallet.getAddressX();
          // const addressP = myWallet.getAddressP();
          // const addressC = myWallet.getAddressC();

          console.log(this.transferAmount);

          const amount = new BN(2);
          // const gasPrice = new BN(this.gasPrice);
          // const gasLimit = 0;
          await myWallet.exportXChain(amount, 'C');
        } catch (error) {
          console.info(error);
          this.isLoading = false;
        }
      },
    }
  }
</script>
<style>
</style>
