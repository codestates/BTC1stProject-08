<template>
  <card>
    <div class="row">
<!--      <div class="col-md-10 pr-md-1">-->
<!--        <base-input label="Amount"-->
<!--                  placeholder="Amount"-->
<!--                  v-model="model.amount"-->
<!--                  disabled>-->
<!--        </base-input>-->
<!--      </div>-->
      <div class="col-md-4 px-md-1">
            <label>Amount</label>
            <input class="form-control"
                   placeholder="0.01"
                   type="number"
                   step="0.01"
                   v-model="amount">
      </div>
      <div class="col-md-1 pl-md-1">
        <base-input label="Token"
                    placeholder="AVAX"
                    v-model="token"
                    disabled>
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5 px-md-1">
        <base-input label="To Address"
                    placeholder="xxx"
                    v-model="to_address">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5 px-md-1">
        <base-input>
          <label>MEMO(Optional)</label>
          <textarea rows="4" cols="80"
                    class="form-control"
                    placeholder="Here can be your description"
                    v-model="memo">

              </textarea>
        </base-input>
      </div>
    </div>
    <div class="row">
      <label>Transaction Fee&nbsp;&nbsp;&nbsp;</label>
      <p>10</p>
    </div>
    <div class="row">
      <label>Total AVAX&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <p>10</p>
    </div>
    <base-button :loading = "isLoading" slot="footer" type="primary" @click="deposit">Send</base-button>
  </card>
</template>
<script>
import {setNetwork, MnemonicWallet, BN, TestnetConfig} from "@avalabs/avalanche-wallet-sdk";

export default {
    name: 'SendFormX',
    data() {
      return {
        isLoading: false,
        amount: 0.01,
        token: 'AVAX',
        to_address: '',
        memo: '',
        transactionFee: 0,
        totalAvax: 0
      };
    },
    methods: {
      async deposit() {
        try {
          this.isLoading = true;
          const newMnemonic = 'fantasy trim fun junk wisdom cement rally infant blush twist mom dilemma museum flat dad bulk hunt lawn unable huge sunny almost equip song';
          const myWallet = MnemonicWallet.fromMnemonic(newMnemonic);
          setNetwork(TestnetConfig);
          await myWallet.resetHdIndices();
          await myWallet.updateUtxosX();
          const amount = new BN(this.amount);
          // this.transactionFee = transa
          await myWallet.sendAvaxX(this.to_address, amount, this.memo);
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
