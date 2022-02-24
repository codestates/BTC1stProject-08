const express = require('express');
const userControllers = require('../../controllers/users');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.send('respond with a resource');
});

router.post('/register', userControllers.findUser);
router.post('/createWallet', userControllers.createWallet);

module.exports = router;
