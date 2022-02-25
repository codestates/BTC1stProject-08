// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import {bnToAvaxC, bnToAvaxX, bnToAvaxP} from "@avalabs/avalanche-wallet-sdk";
const { TestnetConfig, MainnetConfig } = require('@avalabs/avalanche-wallet-sdk');
const Network = require('@avalabs/avalanche-wallet-sdk')

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        networkId: 'testnet',
        currentNetwork : Network,
        wallet: null,
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
        async setNetwork(state,netid){
            /**
             *  Avalnche 네트워크 셋팅 Mutate
             *
             */
            console.log(netid)
            switch (netid) {
                case 'testnet':
                    await state.currentNetwork.setNetwork(TestnetConfig);
                    state.networkId = netid;
                    break;
                case 'mainnet':
                    await state.currentNetwork.setNetwork(MainnetConfig);
                    state.networkId = netid;
                    break
                default:
                    break;
            }
        },
        refreshBalance(state) {
            if (!state.wallet) {
                return;
            }

            state.wallet.resetHdIndices().then(async () => {
                await state.wallet.updateUtxosX()
                await state.wallet.updateUtxosP()
                await state.wallet.updateAvaxBalanceC()

                const xAvax = bnToAvaxX(state.wallet.getAvaxBalanceX().unlocked)
                const pAvax = bnToAvaxP(state.wallet.getAvaxBalanceP().unlocked);
                const cAvax = bnToAvaxC(state.wallet.getAvaxBalanceC());
                state.balances.unlocked = {
                    X: xAvax,
                    C: cAvax,
                    P: pAvax,
                };
            })
        },
        setWallet(state, wallet){
            state.isSignIn = true;
            state.wallet = wallet;
        }
    }
});
