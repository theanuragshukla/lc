const { Router } = require("express");

const { getMyRank, getStanding, getFriendsStanding, updateStanding } = require("../../controllers/standingController");
const { checkAuth } = require("../../controllers/authController");

const router = Router();

router.get('/my-rank', getMyRank);
router.get('/page/:page', getStanding);
router.post('/friends', getFriendsStanding);
// router.get('/update', updateStanding);

module.exports = router;
