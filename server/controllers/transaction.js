const {router} = require('../routes');
const { Transactions } = require("../database");
const { asyncWrapper } = require('../utils/asyncWrapper');
 

const alltransaction = asyncWrapper(async (req) => {
    let pageNum = req.query.page; // 요청 페이지 넘버
    let offset = 0;

    if (pageNum > 1) {
        offset = 20 * (pageNum - 1);
    }

    let tras = await Transactions.findAll({
    // pagination
        offset: offset,
        limit: 20
    });

    return {
        // 여기서 리턴하면 response 갑니다....
        status: 200,
        message: '성공',
        data: tras,
    };
});


module.exports = {
    alltransaction,
};
