const {router} = require('../routes');
const { Transactions } = require("../database");
const { asyncWrapper } = require('../utils/asyncWrapper');
const avaxNet = require('@avalabs/avalanche-wallet-sdk'); 
avaxNet.setNetwork(avaxNet.TestnetConfig);



/**
 * 모든 체인내 트렌젝션 전체 조회
 * 
 * @req : page (number)
 */
const alltransaction = asyncWrapper(async (req) => {
    try {
        let pageNum = req.query.page; // 요청 페이지 넘버
        let offset = 0;

        if (pageNum > 1) {
            offset = 20 * (pageNum - 1);
        }

        let tras = await Transactions.findAll({
            offset: offset,
            limit: 20,
            order:[["id","DESC"]]
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


/**
 *  X - Chain 내 발생 트랜젝션 전체 조회
 * 
 * @req : page (number)
 */
const xTransactions = asyncWrapper(async (req) => {
    try {
        let pageNum = req.query.page; // 요청 페이지 넘버
        let offset = 0;

        if (pageNum > 1) {
            offset = 20 * (pageNum - 1);
        }

        let tras = await Transactions.findAll({
            where: { txChain : "X-Chain"},
            offset: offset,
            limit: 20,
            order:[["id","DESC"]]
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


/**
 *  P - Chain 내 발생 트랜젝션 전체 조회
 * 
 * @req : page (number)
 */
const pTransactions = asyncWrapper(async (req) => {
    try {
        let pageNum = req.query.page; // 요청 페이지 넘버
        let offset = 0;
        if (pageNum > 1) {
            offset = 20 * (pageNum - 1);
        }

        let tras = await Transactions.findAll({
            where: { txChain : "P-Chain"},
            offset: offset,
            limit: 20,
            order:[["id","DESC"]]
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


/**
 *  C - Chain 내 발생 트랜젝션 전체 조회
 * 
 * @req : page (number)
 */
//TODO : C-Chain API call rejected because chain is not done bootstrapping
const cTransactions = asyncWrapper(async (req) => {
    try {
        let pageNum = req.query.page; // 요청 페이지 넘버
        let offset = 0;

        if (pageNum > 1) {
            offset = 20 * (pageNum - 1);
        }

        let tras = await Transactions.findAll({
            where: { txChain : "C-Chain"},
            offset: offset,
            limit: 20,
            order:[["id","DESC"]]
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



/**
 *  X or P - Chain 단일 트랜젝션 조회
 * 
 * @req : txId (String)
 */
const normaltransaction = asyncWrapper(async (req) => {
    try {
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

/**
 *  C - Chain 단일 트랜젝션 조회
 * 
 *  @req : txId (String)
 */
const ctransaction = asyncWrapper(async (req) => {
    try {
        const txid = req.query.txId;
        const tx = await avaxNet.getTxEvm(txid);
        return {
            status: 200,
            message: '성공',
            data: tx || null,
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
    xTransactions,
    pTransactions,
    cTransactions,
    normaltransaction,
    ctransaction,
};
