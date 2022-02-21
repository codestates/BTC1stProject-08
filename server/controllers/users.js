const {router} = require('../routes');
const { asyncWrapper } = require('../utils/asyncWrapper');

const findUser = asyncWrapper(async (req) => {
    console.log(req.body);
});

module.exports = findUser;
