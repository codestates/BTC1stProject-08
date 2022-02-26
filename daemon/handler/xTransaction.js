const axios = require('axios');
const { Transactions } = require("../database");
const { fuji } = require('../dictionary/avalanchego.dictionary');


const getLastIndexFromAva = async () =>  {
    try {
        const {data} = await axios({
            method: 'post',
            url: `${fuji.protocol}://${fuji.host}/ext/index/X/tx`,
            data: {
                jsonrpc: "2.0",
                id: 0,
                method: "index.getLastAccepted",
                params: {
                    "encoding": "hex"
                }
            }
        });
        console.log('data.index', data.result.index);
        return data.result.index;
    } catch (error) {
        console.log(`>>> get last index Error ${ error }`);
    }
}

const getLastIndexFromDB = async () => {
    try {
        const lastOne = await Transactions.findOne({
            where: {
                txChain: 'X-Chain',
            },
            order: ['txIndex']
        });

        if (!lastOne) {
            return 0;
        }

        return lastOne.txIndex;
    } catch(error) {
        console.log(`>>> get last one Error ${ error }`);
    }
}


module.exports = async () => {
    try {
        const lastIndexFromAva = await getLastIndexFromAva();
        const lastIndexFromDB = await getLastIndexFromDB();
        const range = lastIndexFromAva - lastIndexFromDB;
        if(range <= 0) {
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
                    startIndex: lastIndexFromAva + 1,
                    numtoFetch: range,
                    encoding:"hex"
                }
            }
        });

        const promiseList = data.result.containers.map(container => Transactions.create({
            txChain: 'X-Chain',
            txId: container.id,
            txByte: container.bytes,
            txTime: container.timestamp,
            txEncod: container.encoding,
            txIndex: container.index,
        }));
        await Promise.all(promiseList);
        console.info('>>> xTransaction Successfully created');
    } catch (error) {
        console.info(`>>> xTransaction handler error: ${error.message}`);
    }
}
