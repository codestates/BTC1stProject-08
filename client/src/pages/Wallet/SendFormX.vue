<template>
  <card>
    <div class="row">
      <div class="col-md-4 px-md-1">
            <label>Amount</label>
            <input class="form-control"
                   placeholder="0.00"
                   type="number"
                   step="0.01"
                   v-model="amount">
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
      <label>Transaction Fee: &nbsp;&nbsp;0.001 AVAX</label>
    </div>
    <base-button :loading = "isLoading" slot="footer" type="primary" @click="deposit">Send</base-button>
  </card>
</template>
<script>
import { numberToBNAvaxX } from "@avalabs/avalanche-wallet-sdk";

export default {
    name: 'SendFormX',
    data() {
      return {
        isLoading: false,
        amount: '',
        to_address: '',
        memo: '',
      };
    },
    methods: {
      async deposit() {
        try {
          if(this.amount === null || this.amount === '' || this.amount < 0.01) {
            alert('0.01 이상의 값을 입력해주세요');
            return
          }
          this.isLoading = true;
          const myWallet = this.$store.state.wallet;
          await myWallet.resetHdIndices();
          await myWallet.updateUtxosX();
          const amount = numberToBNAvaxX(this.amount);
          await myWallet.sendAvaxX(this.to_address, amount, this.memo);
          this.isLoading = false;
          alert('성공적으로 전송이 완료되었습니다.');
        } catch (error) {
          alert('전송이 실패했습니다.' + error);
          this.isLoading = false;
        }
      },
    }
  }
</script>
<style>
</style>
