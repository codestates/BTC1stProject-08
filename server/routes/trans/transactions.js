const express = require('express');
const trans = require('../../controllers/transaction');
const nodeinfo = require('../../controllers/nodeinfo');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.send('respond with a resource');
});

router.get('/alltransactions', trans.alltransaction);

router.get('/xtransactions', trans.xTransactions);
router.get('/ptransactions', trans.pTransactions);
router.get('/ctransactions', trans.cTransactions);
router.get('/transaction', trans.transaction);

router.get('/networkinfo', nodeinfo.node)


module.exports = router;
