const axios = require('axios');
const { Transactions } = require("../database");
const { fuji } = require('../dictionary/avalanchego.dictionary');

module.exports = async () => {
    try {
        const { lastAccepted } = await axios({
            method: 'post',
            url: `${fuji.protocol}://${fuji.host}/ext/index/X/tx`,
            data: {
                jsonrpc: "2.0",
                id: 1,
                method:"index.getLastAccepted",
                params: {
                    "encoding":"hex"
                }
            }
        });
        const lastAcceptedIndex = lastAccepted.txIndex;

        const lastOne = await Transactions.findOne({
            where: {txChain: 'X-Chain'},
            order: ['txIndex']
        })
        const range = lastAcceptedIndex - lastOne.txIndex;

        if(range === 0) {
            console.info(`>>> range is ${range}`);
            return;
        }

        const { data } = await axios({
            method: 'post',
            url: `${fuji.protocol}://${fuji.host}/ext/index/X/tx`,
            data: {
                jsonrpc:"2.0",
                id     :1,
                method :"index.getContainerRange",
                params: {
                    startIndex:lastAcceptedIndex + 1,
                    numtoFetch:range + 0,
                    encoding:"hex"
                }
            }
        });

        for ( const one in data ) {
            await Transactions.create({
                txChain: 'X-Chain',
                txId: one.result.id,
                txByte: one.result.bytes,
                txTime: one.result.timestamp,
                txEncod: one.result.encoding,
                txIndex: one.result.index,
            })
        }
        console.info('>>> xTransaction Successfully created');
    } catch (error) {
        console.info(`>>> xTransaction handler error: ${error.message}`);
    }
}
