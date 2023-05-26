const router = require("express").Router()
const { handleRegister, handleLogin } = require("../Controller/AuthController");

router.post("/register",handleRegister);
router.post("/login",handleLogin);
module.exports = router 


