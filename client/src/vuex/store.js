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
            locked: {
                X: 0,
                P: 0,
                PS: 0,
            },
        },
        address: {
            X: '',
            P: '',
            C: '',
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
            const xBalancesUnlocked = bnToAvaxX(balances.X.unlocked);
            const cBalances = bnToAvaxC(balances.C);
            const pBalancesUnlocked = bnToAvaxX(balances.P.unlocked);
            const xBalancesLocked = bnToAvaxX(balances.X.locked);
            const pBalancesLocked = bnToAvaxX(balances.P.locked);
            const pBalancesStakeableLocked = bnToAvaxX(balances.P.lockedStakeable);
            state.balances.unlocked = {
                X: xBalancesUnlocked,
                C: cBalances,
                P: pBalancesUnlocked,
            };
            state.balances.locked = {
                X: xBalancesLocked,
                P: pBalancesLocked,
                PS: pBalancesStakeableLocked,
            }
        },
        setWallet(state, wallet){
            state.isSignIn = true;
            state.wallet = wallet;
        },
        refreshAddress(state) {
            if (!state.wallet) {
                return;
            }
            const XAddress = state.wallet.getAddressX();
            const PAddress = state.wallet.getAddressP();
            const CAddress = state.wallet.getAddressC();
            state.address = {
                X: XAddress,
                P: PAddress,
                C: CAddress,
            }
        }
    }
});
