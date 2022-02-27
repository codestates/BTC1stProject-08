const express = require('express');
const trans = require('../../controllers/transaction');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.send('respond with a resource');
});

router.get('/alltransactions', trans.alltransaction);

module.exports = router;
