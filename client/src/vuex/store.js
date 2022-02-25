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
        isSignIn: false
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
        setWallet(state, wallet){
            state.isSignIn = true;
            state.wallet = wallet;
        }
    }
});
