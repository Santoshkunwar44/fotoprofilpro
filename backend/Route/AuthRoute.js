const router = require("express").Router()
const { handleRegister, handleLogin, getLoggedinUser } = require("../Controller/AuthController");

router.post("/register",handleRegister);
router.post("/login",handleLogin);
router.get("/loggedinUser",getLoggedinUser)
module.exports = router 


