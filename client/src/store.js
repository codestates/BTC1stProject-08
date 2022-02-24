// store.js
import Vue from 'vue'
import Vuex from 'vuex'
const Network = require('@avalabs/avalanche-wallet-sdk');
const {MnemonicWallet, BN, bnToAvaxX, bnToAvaxC, bnToAvaxP}= require('@avalabs/avalanche-wallet-sdk');

Vue.use(Vuex);

export const store = new Vuex.Store({
  // ..
    state :
         {
            Network: Network,
            mNemonic: '',
            myWallet: {
                addressX: '',
                xBalance: 0,
                addressP: '',
                pBalance: 0,
                addressC: '',
                cBalance: 0,
            },
            isSignIn: false
        }
    ,
    // .. getter
    getters: {
        getWalletInfo() {
            return myWallet;
        }

    },
    // .. mutation
    mutations: {
        setMnemonic(state, mnemonic) {
            /**
             *  로그인시 
             *  니모닉 임시 저장
             */
            state.mNemonic = mnemonic;
        },
    async setNetwork(state){
        /**
         *  Avalnche 네트워크 셋팅 Mutate
         *   
         */
        if(networkId === 'testnet'){
            await state.Network.setNetwork(Network.TestnetConfig);
        }
        if(networkId === 'mainnet'){
            await state.Network.setNetwork(Network.MainnetConfig);
        }
    },
    async setWallet(state){
        let wallet = MnemonicWallet.fromMnemonic(state.mNemonic);
        await wallet.resetHdIndices()
        await wallet.updateUtxosX()
    
        wallet.resetHdIndices().then(()=>{
            wallet.updateUtxosX()
            wallet.updateUtxosP()
            wallet.updateAvaxBalanceC()
        
            state.myWallet.addressX = wallet.getAddressX()
            console.log(`xaddress :  ${result.addressX}`)
            state.myWallet.xBalance = bnToAvaxX(wallet.getAvaxBalanceX().unlocked)
            console.log( bnToAvaxX(wallet.getAvaxBalanceX().unlocked));

            state.myWallet.addressP = wallet.getAddressP();
            console.log(`paddress :  ${addressP}`);
            state.myWallet.pBalance = bnToAvaxP(wallet.getAvaxBalanceP().unlocked)
            console.log( wallet.getAvaxBalanceP());

            wallet.on('balanceChangedC', (newBalance)=>{
                state.myWallet.addressC = wallet.getAddressC()
                console.log(`caddress :  ${addressC}`);
                state.myWallet.cBalance = bnToAvaxC( wallet.getAvaxBalanceC())
                console.log( bnToAvaxC( wallet.getAvaxBalanceC()));
            })
        }) 
        state.isSignIn = true;
    }
  }
});
