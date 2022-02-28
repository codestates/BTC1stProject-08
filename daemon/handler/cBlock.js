const axios = require('axios');
const { Transactions } = require("../database");
const { fuji } = require('../dictionary/avalanchego.dictionary');


const getLastIndexFromAva = async () =>  {
    try {
        console.log(`${fuji.protocol}://${fuji.host}/ext/index/C/block`);
        const {data} = await axios({
            method: 'post',
            url: `${fuji.protocol}://${fuji.host}/ext/index/C/block`,
            data: {
                jsonrpc: "2.0",
                id: 1,
                method: "index.getLastAccepted",
                params: {
                    "encoding": "hex"
                }
            }
        });
        return data.result.index;
    } catch (error) {
        console.log(`>>> 네트워크에서 마지막 트랜잭션 인덱스를 가져오지 못했습니다. ${ error }`);
        return 1;
    }
}

const getLastIndexFromDB = async () => {
    try {
        const lastOne = await Transactions.findOne({
            where: {
                txChain: 'C-Chain',
            },
            order: [['txIndex', 'DESC']]
        });

        if (!lastOne) {
            return 0;
        }

        return lastOne.txIndex;
    } catch(error) {
        console.log(`>>> Database에서 마지막 트랜잭션 인덱스 값을 가져오지 못했습니다. ${ error }`);
        return 0;
    }
}


module.exports = async () => {
    try {
        const lastIndexFromAva = await getLastIndexFromAva();
        const lastIndexFromDB = (await getLastIndexFromDB()|0);
        const tempRangerange = lastIndexFromAva - lastIndexFromDB;

        if(tempRangerange <= 0) {
            console.info(`>>> 새로운 데이터가 없습니다. ${tempRangerange}`);
            return;
        }

        const { data } = await axios({
            method: 'post',
            url: `${fuji.protocol}://${fuji.host}/ext/index/C/block`,
            data: {
                jsonrpc:"2.0",
                id     :1,
                method :"index.getContainerRange",
                params: {
                    startIndex: Number(lastIndexFromDB) + 1, //바꿔야함
                    numtoFetch: 10,
                    encoding:"hex"
                }
            }
        });

        data.result.containers.map(container => console.log("컨테이너", container));

        const promiseList = data.result.containers.map(container => Transactions.create({
            txChain: 'C-Chain',
            txId: container.id,
            txByte: container.bytes,
            txTime: container.timestamp,
            txEncod: container.encoding,
            txIndex: container.index,
        }));
        await Promise.all(promiseList);
        console.info('>>> cTransaction Successfully created');
    } catch (error) {
        console.info(`>>> cTransaction handler error: ${error}`);
    }
}
