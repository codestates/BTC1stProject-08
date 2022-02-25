<template>
  <div class="m-auto">
    <div class="col-lg-12" style="height:600px">
      <card type="tasks" style="height:100%">
        <div class="m-auto" style="height : 100%" >
          <div class="low" style="display:flex; height:99%">
                  <div style="width: 50%">
                    <card type="chart" style=" height: 100%">
                      <div style="height: 15%;">
                        <h3 style="margin-bottom:0px">⦿ 귀하의 니모닉을 입력하세요</h3>
                        <h6 style="margin-left:28px">- 단어와 단어 사이는 공백 한개 입니다.</h6>
                      </div>
                      <div style="height: 65%; margin: 0px 5px 0px 5px;">
                        <textarea class="m-auto" v-model="mnemonic" :label="mnemonic" style="
                          width: 80%;
                          resize: none;
                          min-height: 80%;
                          display: flex;
                          position: relative;
                        "></textarea>
                      </div>
                      <div style="text-align:center; height: 20%">
                        <!-- <base-button v-on:click="toSignIn">로그인</base-button>  -->
                        <base-button :loading="isLoginLoading" type="primary" @click="toSignIn">로그인</base-button>
                      </div>
                    </card>
                  </div>
                  <div style="width: 50%">
              <card type="chart" style=" height: 100%">
                <div style="height: 80%">
                  <div style="height:100%; margin:5px 5px 10px 10px">
                    <h4>
                      아발란체 Avalanche(AVAX)
                    </h4>
                    <h5 style="margin-left:14px">
                      Avalanche는 "분산형 애플리케이션을 위한 프로그래밍 가능한 개방형 스마트 계약 플랫폼" 입니다.
                    </h5>
                    <h4 style="margin-left:14px">
                      기존 사용자가 아니라면 '새로운 지갑 생성' 버튼을 눌러
                    </h4>
                    <h4 style="margin-left:14px">
                      새로운 지갑을 만들 수 있습니다.
                    </h4>
                  </div>
                </div>
                <div style="text-align:center">
                  <!-- <base-button v-on:click="toSignUp">새로운 지갑 생성</base-button>  -->
                  <base-button :loading = "isLoading" type="primary" @click="toSignUp">새로운 지갑 생성</base-button>
                </div>
              </card>
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
  import BaseButton from '@/components/BaseButton';
  import { MnemonicWallet } from "@avalabs/avalanche-wallet-sdk";

  export default {
    name: 'Login',
    components: {
      BaseButton,
    },
    mounted() {
      if (this.$store.state.isSignIn) {
        this.$router.back();
      }
    },
    data() {
      return {
        mnemonic: '',
        isLoginLoading: false,
      }
    },
    methods: {
      async toSignIn() {
        this.isLoginLoading = true;
        const invalidMnemonic = this.mnemonic.split(' ').length === 24;
        if (!invalidMnemonic) {
          alert('유효하지 않은 니모닉입니다.');
        } else {
          try {
            const wallet = await MnemonicWallet.fromMnemonic(this.mnemonic);
            await wallet.resetHdIndices();
            await wallet.updateUtxosX();

            this.$store.commit('setWallet', wallet);
            await this.$router.push('/wallet');
          } catch(e) {
            alert('로그인에 실패하였습니다. 귀하의 니모닉을 다시 확인해주세요.');
          }
        }

        this.isLoginLoading = false;
      },
      async toSignUp() {
        await this.$router.push('/register');
      }
    },
  };
</script>
<style>
</style>
