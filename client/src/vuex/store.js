// store.js
import Vue from 'vue';
import Vuex from 'vuex';
const Network = require('@avalabs/avalanche-wallet-sdk');

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        networkId: 'testnet',
        Network: Network,
        wallet: {},
        myWallet: {
            addressX: '',
            xBalance: 0,
            addressP: '',
            pBalance: 0,
            addressC: '',
            cBalance: 0,
        },
        isSignIn: false,
        isLoding: false
    },
    getters: {
        async getWallet(state) {
            return state.wallet;
        },
    },
    mutations: {
        async setNetwork(state){
            /**
             *  Avalnche 네트워크 셋팅 Mutate
             *
             */
            if(state.networkId === 'testnet'){
                await state.Network.setNetwork(Network.TestnetConfig);
            }

            if(state.networkId === 'mainnet'){
                await state.Network.setNetwork(Network.MainnetConfig);
            }
        },
        async doSignIn(state,mnemonic){
            console.log(mnemonic)
            state.isLoding=true;
            if( mnemonic.split(' ').length === 24) {          
                try{
                    state.wallet = await state.Network.MnemonicWallet.fromMnemonic(mnemonic);
                    await state.wallet.resetHdIndices()
                    state.isSignIn = true;
                    console.log(state.wallet);
                }catch(e){
                    state.isSignIn = false;
                    console.log(e)
                    console.log('로그인이 실패하였습니다 귀하의 니모닉을 확인해주세요')
                }
            }
            else {
                console.log(this.mnemonic.split(' '));
            }
            state.isLoding = false;
        }
        ,
        setWallet(state, wallet){
            state.isSignIn = true;
            state.wallet = wallet;
        }
    }
});
