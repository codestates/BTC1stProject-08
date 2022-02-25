<template>
  <div class="m-auto">     
    <div class="col-lg-12" style="height:600px">
      <card type="tasks" :header-classes="{'text-right': isRTL}" style="height:100%">
        <template slot="header">
          <base-dropdown menu-on-right=""
                              tag="div"
                              title-classes="btn btn-link btn-icon"
                              aria-label="Settings menu"
                              >
            <i slot="title" class="tim-icons icon-settings-gear-63"></i>
            <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.action')}}</a>
          </base-dropdown>
        </template>
            
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
                        <base-button :loading = "isLoading" type="primary" @click="toSignIn">로그인</base-button>
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
import BaseButton from '../../components/BaseButton.vue';
import {setNetwork, MnemonicWallet, BN, TestnetConfig} from "@avalabs/avalanche-wallet-sdk";
import * as Network from '@avalabs/avalanche-wallet-sdk';

  export default {
    components: {
        BaseButton
    },
    data() {
      return {
        mnemonic: '',
        isLoading: false,
      }
    },
    computed: {
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
      bigLineChartCategories() {
        return this.$t('dashboard.chartCategories');
      },
      walletAddresses() {
        return this.$t('dashboard.walletAddresses');
      }
    },
    methods: {
      initWalletAddress(index) {
        
        
      },
      async toSignIn(){
        this.isLoading  = true;
        if( this.mnemonic.split(' ').length === 24) {          
          try{
            let wallet = await MnemonicWallet.fromMnemonic(this.mnemonic);
            await wallet.resetHdIndices()
            await wallet.updateUtxosX()
            console.log(wallet);
          }catch(e){
            console.log(e)
            console.log('로그인이 실패하였습니다 귀하의 니모닉을 확인해주세요')
          }
        }
        else {
            console.log(this.mnemonic.split(' '));
        }
        console.log('로그인');
        this.isLoading = false;
      },
      async toSignUp(){
        try{
          let newMnemonic = MnemonicWallet.generateMnemonicPhrase()
          let myWallet = MnemonicWallet.fromMnemonic(newMnemonic)
          console.log(`my new mnemonic ${newMnemonic}`);
          console.log(myWallet)
          let addressX = myWallet.getAddressX()
          console.log(`xaddress :  ${addressX}`)
          let addressP = myWallet.getAddressP()
          console.log(`paddress :  ${addressP}`)
          let addressC = myWallet.getAddressC()
          console.log(`caddress :  ${addressC}`)
        }catch(e)
        {
          console.log(e)
          console.log('회원가입 실패');
        }
      }
    },
    mounted() {
      this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
      this.initBigChart(0);
    },
    beforeDestroy() {
      if (this.$rtl.isRTL) {
        this.i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    }
  };
</script>
<style>
</style>
