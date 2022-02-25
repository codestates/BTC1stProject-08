// store.js
import Vue from 'vue';
import Vuex from 'vuex';
const { TestnetConfig, MainnetConfig } = require('@avalabs/avalanche-wallet-sdk');

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        networkId: 'testnet',
        currentNetwork: TestnetConfig,
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
            switch (state.networkId) {
                case 'mainnet':
                    this.state.currentNetwork = MainnetConfig;
                    return;
                default:
                    this.state.currentNetwork = TestnetConfig;
                    return;
            }
        },
        setWallet(state, wallet){
            state.isSignIn = true;
            state.wallet = wallet;
        }
    }
});
