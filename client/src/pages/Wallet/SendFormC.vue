<template>
  <card>
    <div class="row">
      <div class="col-md-4 px-md-1">
        <label>Amount</label>
        <input
          class="form-control"
          placeholder="0.01"
          type="number"
          step="0.01"
          v-model="amount"
        >
      </div>
      <div class="col-md-1 pl-md-1">
        <base-input label="Token"
                    placeholder="AVAX"
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
        <label>
          Gas Price (GWEI) <br />
          <small>네트워크 부하에 따라 자동으로 조정됩니다.</small>
        </label>
        <input class="form-control"
               placeholder="gas price"
               disabled
               v-model="gasPrice">
      </div>
    </div>
    <div class="row" style="margin-top: 14px; margin-bottom: 7px;">
      <div class="col-md-5 px-md-1">
        <label>
          Gas Limit <br />
          <small v-if="!isConfirm">가스 한계는 Confirm을 클릭하면 자동으로 계산됩니다.</small>
        </label>
        <input
          v-if="isConfirm"
          class="form-control"
          placeholder="gas price"
          disabled
          v-model="gasLimit"
        >
      </div>
    </div>
    <div class="row" v-if="isConfirm">
      <label>Transaction Fee: &nbsp;&nbsp; {{ maxFeeText }} AVAX</label>
    </div>
    <base-button :loading = "isLoading" slot="footer" type="primary" @click="isConfirm = true" v-if="!isConfirm">Confirm</base-button>
    <base-button :loading = "isLoading" slot="footer" type="primary" @click="deposit" v-if="isConfirm">Send Transaction</base-button>
    <base-button :loading = "isLoading" slot="footer" @click="isConfirm = false" v-if="isConfirm">Cancel</base-button>
  </card>
</template>
<script>
import {setNetwork, numberToBNAvaxC, bnToBigAvaxX, BN, Big, bnToAvaxC } from "@avalabs/avalanche-wallet-sdk";

export default {
  name: 'SendFormC',
  data() {
    return {
      isLoading: false,
      isConfirm: false,
      amount: '',
      gasBNPrice: new BN(225000000000),
      to_address: '',
      gasLimit: 21000
    };
  },
  computed: {
    maxFee() {
      return this.gasBNPrice.mul(new BN(this.gasLimit));
    },
    maxFeeText() {
      return bnToAvaxC(this.maxFee);
    },
    gasPrice() {
      return Big(bnToBigAvaxX(this.gasBNPrice)).toFixed(0);
    },
  },
  methods: {
    async deposit(message) {
      try {
        if(this.amount === null || this.amount === '' || this.amount < 0.01) {
          alert('0.01 이상의 값을 입력해주세요');
          this.isConfirm = false;
          return
        }
        this.isLoading = true;
        const myWallet = this.$store.state.wallet;
        await myWallet.resetHdIndices();
        await myWallet.updateUtxosX();
        const amount = numberToBNAvaxC(this.amount);
        await myWallet.sendAvaxC(this.to_address, amount, this.gasBNPrice, this.gasLimit);
        this.isConfirm = true;
        this.isLoading = false;
        alert('성공적으로 전송이 완료되었습니다.');
        this.isConfirm = false;
      } catch (error) {
        alert('전송이 실패했습니다.' + error);
        this.isConfirm = false;
        this.isLoading = false;
      }
    },
  }
}
</script>
<style>
.btn + .btn {
  margin-left: .5rem;
}
</style>
