const router = require('express')();
const auth = require("./auth");
const product = require("./product");
const order = require("./orders");
const contractor = require("./contractors");

router.use('/auth', auth);
router.use('/products', product);
router.use('/orders', order);
router.use('/contractors', contractor);



module.exports = router;