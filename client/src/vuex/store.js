// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import {bnToAvaxC, bnToAvaxX} from "@avalabs/avalanche-wallet-sdk";
const { TestnetConfig, MainnetConfig } = require('@avalabs/avalanche-wallet-sdk');

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        networkId: 'testnet',
        currentNetwork: TestnetConfig,
        wallet: {},
        balances: {
            unlocked: {
                X: 0,
                P: 0,
                C: 0,
            },
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
        refreshBalance(state) {
            if (!state.wallet) {
                return;
            }

            const balances = state.wallet.getAvaxBalance();
            const xAvax = bnToAvaxX(balances.X.unlocked);
            const cAvax = bnToAvaxC(balances.C);
            const pAvax = bnToAvaxX(balances.P.unlocked);
            state.balances.unlocked = {
                X: xAvax,
                C: cAvax,
                P: pAvax,
            };
        },
        setWallet(state, wallet){
            state.isSignIn = true;
            state.wallet = wallet;
        }
    }
});
