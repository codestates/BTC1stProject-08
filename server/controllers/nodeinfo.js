const {router} = require('../routes');
const axios = require('axios');
const { asyncWrapper } = require('../utils/asyncWrapper');
const { localNode } = require('../config/dev');
const config = require(__dirname + '/../config/key');

const node = asyncWrapper(async (req) => {
    const netid = await getNetworkId();
    const netname = await getNetworkName();
    const nodeid = await getNodeId();
    const nodeversion = await getNodeVersion();

    const data = {
        networkID : netid,
        networkName : netname,
        nodeID : nodeid,
        nodeVersion : nodeversion
    }

    return {
        status: 200,
        message: '성공',
        data: data,
    };
});





const getNetworkId = async () =>  {
    try {
        const {data} = await axios({
            method: 'post',
            url: `${localNode.protocol}://${localNode.host}:${localNode.port}/ext/info`,
            data: {
                jsonrpc: "2.0",
                id: 1,
                method :"info.getNetworkID",
                params :{
                }
            }
        });
        return data.result.networkID;
    } catch (error) {
        console.log(`>>> get network Id ${ error }`);
    }
}

const getNetworkName = async () =>  {
    try {
        const {data} = await axios({
            method: 'post',
            url: `${localNode.protocol}://${localNode.host}:${localNode.port}/ext/info`,
            data: {
                jsonrpc: "2.0",
                id: 1,
                method :"info.getNetworkName",
                params :{
                }
            }
        });
        return data.result.networkName;
    } catch (error) {
        console.log(`>>> get network Name ${ error }`);
    }
}

const getNodeId = async () =>  {
    try {
        const {data} = await axios({
            method: 'post',
            url: `${localNode.protocol}://${localNode.host}:${localNode.port}/ext/info`,
            data: {
                jsonrpc: "2.0",
                id: 1,
                method :"info.getNodeID",
                params :{
                }
            }
        });
        return data.result.nodeID;
    } catch (error) {
        console.log(`>>> get Node Id ${ error }`);
    }
}


const getNodeVersion = async () =>  {
    try {
        const {data} = await axios({
            method: 'post',
            url: `${localNode.protocol}://${localNode.host}:${localNode.port}/ext/info`,
            data: {
                jsonrpc: "2.0",
                id: 1,
                method :"info.getNodeVersion",
                params :{
                }
            }
        });
        return data.result;
    } catch (error) {
        console.log(`>>> get Node version ${ error }`);
    }
}





module.exports = {
    node,
};