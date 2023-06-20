const router = require("express").Router()
const { handleRegister, handleLogin, getLoggedinUser, handleLogout } = require("../Controller/AuthController");

router.post("/register",handleRegister);
router.post("/login",handleLogin);
router.get("/loggedinUser",getLoggedinUser)
router.post("/logout",handleLogout)
module.exports = router 


