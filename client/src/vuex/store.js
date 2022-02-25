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
        isSignIn: false
    },
    getters: {
        async getWallet(state) {
            return state.wallet;
        },
    },
    mutations: {
        async setNetwork(state,netid){
            /**
             *  Avalnche 네트워크 셋팅 Mutate
             *
             */
            if(netid === 'testnet'){
                await state.Network.setNetwork(Network.TestnetConfig);
                state.networkId = netid;
            }
            
            if(netid === 'mainnet'){
                await state.Network.setNetwork(Network.MainnetConfig);
                state.networkId = netid;
            }
            console.log(`네트워크 상태 :  ${state.networkId}`)
        },
        setWallet(state, wallet){
            state.isSignIn = true;
            state.wallet = wallet;
        }
    }
});
