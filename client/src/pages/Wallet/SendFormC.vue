<template>
  <card>
    <div class="row">
      <div class="col-md-4 px-md-1">
        <base-input label="Amount"
                  placeholder="Amount"
                  v-model="amount">
        </base-input>
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
        <label>
          Gas Price (GWEI) <br />
          <small>Adjusted automatically according to network load.</small>
        </label>
        <base-input placeholder="xxx"
                    v-model="gasPrice">
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
    <base-button slot="footer" type="primary" fill>Save</base-button>
  </card>
</template>
<script>
import {BN, MnemonicWallet, setNetwork, TestnetConfig} from "@avalabs/avalanche-wallet-sdk";

export default {
    name: 'SendFormC',
    data() {
      return {
        isLoading: false,
        amount: 100,
        token: 'AVAX',
        to_address: 'TAVAXsdf87sdfskjdfhskjdfsdfs',
        gasPrice: 31,
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
          // const addressX = myWallet.getAddressX();
          // const addressP = myWallet.getAddressP();
          // const addressC = myWallet.getAddressC();

          // const balance = myWallet.balanceX;

          const amount = new BN(this.amount);
          const gasPrice = new BN(this.gasPrice);
          const gasLimit = 0;
          await myWallet.sendAvaxC(this.to_address, amount, gasPrice, gasLimit);
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
