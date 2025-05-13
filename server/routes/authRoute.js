const router = require("express").Router();

const {registerUser,loginUser,userDetails,logout,updateUser} =  require("../controller/authController")
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/me").get(userDetails).patch(updateUser);
router.route("/logout").get(logout);

module.exports = router;