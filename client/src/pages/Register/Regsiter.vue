<template>
  <div class="m-auto">
    <div class="row">
      <div class="col-md-6">
        <card type="tasks">
          <div class="mnemonic-card-wrapper">
            <div :key="index" v-for="(value, index) in mnemonicCards" class="mnemonic-card">
              <p class="index">{{ index }}.</p>
              <p class="phrase_word">{{ value }}</p>
            </div>
          </div>
          <card class="mnemonic-copy-wrapper">
            {{ mnemonic }}
          </card>
          <div>
            <base-button block @click="regenerate">REGENERATE</base-button>
          </div>
        </card>
      </div>
      <div class="col-md-6">
        <div>
          <h3 class="title">This is your key phrase.</h3>
          <p>Use these 24 words in sequential order to recover your Avalanche Wallet</p>
          <br /><br />
          <p class="attention">ATTENTION!</p>
          <p>STORE THIS KEY PHRASE IN A SECURE LOCATION. ANYONE WITH THIS KEY PHRASE CAN ACCESS YOUR AVALANCHE WALLET. THERE IS NO WAY TO RECOVER LOST KEY PHRASES.</p>
          <p>
            <base-checkbox v-model="signed" @change="signed=!signed">I wrote down my key phrase in a secure location.</base-checkbox>
          </p>
        </div>
        <br />
        <div>
          <base-button type="primary" :loading="isLoading" :disabled="!signed" block @click="accessWallet">ACCESS WALLET</base-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MnemonicWallet } from "@avalabs/avalanche-wallet-sdk";

export default {
  name: 'Register',
  mounted() {
    if (this.$store.state.isSignIn) {
      this.$router.back();
    }

    this.regenerate();
  },
  data() {
    return {
      mnemonicCards: new Array(24).fill(null),
      mnemonic: '',
      isLoading: false,
      signed: false,
    }
  },
  methods: {
    regenerate() {
      const mnemonic = MnemonicWallet.generateMnemonicPhrase();
      this.mnemonicCards = mnemonic.split(' ');
      this.mnemonic = mnemonic;
    },
    async accessWallet() {
      this.isLoading = true;
      const wallet = new MnemonicWallet(this.mnemonic);
      this.$store.commit('setWallet', wallet);
      this.isLoading = false;
      await this.$router.push('/wallet');
    },
  },
};
</script>
<style lang="scss">
.mnemonic-card-wrapper {
  background-color: #2f324d;
  padding: 14px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 6px;
  border-radius: 3px;
}

.mnemonic-copy-wrapper {
  background-color: #2f324d;
  color: #fff;
  margin-top: 1rem;
}

.title {
  margin-bottom: 5px;
}

.mnemonic-card {
  background-color: #fff;
  display: flex;
  border-radius: 2px;

  .index {
    padding-top: 6px;
    margin-left: 10px;
    margin-right: 5px;
    font-size: 12px;
    text-align: center;
    align-self: center;
    color: black;
  }

  .phrase_word {
    width: 100%;
    padding-top: 6px;
    font-size: 12px;
    text-align: center;
    align-self: center;
    color: black;
  }
}

.attention {
  color: #e33535;
  font-weight: bold;
}
</style>
