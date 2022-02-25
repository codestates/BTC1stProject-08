// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import { bnToAvaxC, bnToAvaxX, bnToAvaxP } from "@avalabs/avalanche-wallet-sdk";
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
        async setNetwork(state, netid){
            /**
             *  Avalnche 네트워크 셋팅 Mutate
             *
             */
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
        async refreshBalance(state) {
            if (!state.wallet) {
                return;
            }

            await state.wallet.resetHdIndices();
            await state.wallet.updateUtxosX()
            await state.wallet.updateUtxosP()
            await state.wallet.updateAvaxBalanceC()

            const xAvax = bnToAvaxX(state.wallet.getAvaxBalanceX().unlocked)
            const pAvax = bnToAvaxP(state.wallet.getAvaxBalanceP().unlocked);
            const cAvax = bnToAvaxC(state.wallet.getAvaxBalanceC());

            const xBalancesLocked = bnToAvaxX(state.wallet.getAvaxBalanceX().locked);
            const pBalancesLocked = bnToAvaxX(state.wallet.getAvaxBalanceP().locked);
            const pBalancesStakeableLocked = bnToAvaxX(state.wallet.getAvaxBalanceP().lockedStakeable);

            state.balances.unlocked = {
                X: xAvax,
                C: cAvax,
                P: pAvax,
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
