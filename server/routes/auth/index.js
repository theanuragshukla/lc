const { Router } = require("express");
const { loginPost, signupPost, checkAuth } = require("../../controllers/authController");


const router = Router()

router.post('/login', loginPost)
router.post('/signup', signupPost)
router.get('/verify',checkAuth);

module.exports = router
