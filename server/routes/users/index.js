const { Router } = require("express");

const { fetchUsers, searchUsers, regSearchUsers, fetchUser } = require("../../controllers/usersController");

const router = Router()

router.get('/', fetchUsers)
router.get('/search', searchUsers )
router.get('/profile/:username', fetchUser)
router.get("/autocomplete", regSearchUsers)

module.exports = router
