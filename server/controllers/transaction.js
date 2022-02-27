const {router} = require('../routes');
const { Transactions } = require("../database");
const { asyncWrapper } = require('../utils/asyncWrapper');
const avaxNet = require('@avalabs/avalanche-wallet-sdk');


const alltransaction = asyncWrapper(async (req) => {
    try {
        let pageNum = req.query.page; // 요청 페이지 넘버
        let offset = 0;

        if (pageNum > 1) {
            offset = 20 * (pageNum - 1);
        }

        let tras = await Transactions.findAll({
            offset: offset,
            limit: 20
        });
        return {
            status: 200,
            message: '성공',
            data: tras,
        };
    } catch (e) {
        console.log(e)
        return {
            status: 400,
            message: '실패',
            data: {},
        };
    }
});


const transaction = asyncWrapper(async (req) => {
    try {
        await avaxNet.setNetwork(avaxNet.TestnetConfig);
        const txid = req.query.txId;
        const tx = await avaxNet.getTx(txid)

        return {
            status: 200,
            message: '성공',
            data: tx,
        };
    } catch (e) { 
        console.log(e)
        return {
            status: 400,
            message: '실패',
            data: {},
        };
    }
})


module.exports = {
    alltransaction,
    transaction
};
