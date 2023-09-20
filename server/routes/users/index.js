const { Router } = require("express");

const { fetchUsers, searchUsers, regSearchUsers } = require("../../controllers/usersController");

const router = Router()


router.get('/', fetchUsers)

router.get('/search', searchUsers )

router.get("/autocomplete", regSearchUsers)

module.exports = router
