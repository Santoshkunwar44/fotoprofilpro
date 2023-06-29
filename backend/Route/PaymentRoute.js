const {checkout} = require("../Controller/PaymentController");

const router = require("express").Router()

router.post("/get_redirect_url",checkout);
module.exports = router;