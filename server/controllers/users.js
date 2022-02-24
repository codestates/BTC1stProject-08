const avalancheWalletSdk = require('@avalabs/avalanche-wallet-sdk');
const {
TestnetConfig, LocalnetConfig, DefaultConfig, isFujiNetwork, BN,
} = require('@avalabs/avalanche-wallet-sdk');
const {router} = require('../routes');
const { asyncWrapper } = require('../utils/asyncWrapper');

const createWallet = asyncWrapper(async (req) => {
    // Create a new wallet
    const newMnemonic = 'fantasy trim fun junk wisdom cement rally infant blush twist mom dilemma museum flat dad bulk hunt lawn unable huge sunny almost equip song';
    const myWallet = avalancheWalletSdk.MnemonicWallet.fromMnemonic(newMnemonic);
    avalancheWalletSdk.setNetwork(TestnetConfig);
    console.log(myWallet);
    // console.log(newMnemonic);
    const addressX = myWallet.getAddressX();
    const addressP = myWallet.getAddressP();
    const addressC = myWallet.getAddressC();

    const balance = myWallet.balanceX;
    console.log(addressX, addressP, addressC);

    // Mnemonic wallets need to find their HD index on startup
    await myWallet.resetHdIndices();

// Update the UTXOs
    await myWallet.updateUtxosX();

    const to = 'X-fuji1l4sgqm33xfu5u54298n8ktxes2j4v9rcxkae66';
    const amount = new BN(1);
    console.log(amount);
    await myWallet.sendAvaxX(to, amount);

    return {
        status: 200,
        message: '성공',
        data: {},
    };
});

const findUser = asyncWrapper(async (req) => {
    console.log(req.body);

    return {
        status: 200,
        message: '성공',
        data: {},
    };
});

module.exports = {
    findUser,
    createWallet,
};
