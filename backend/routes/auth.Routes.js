const express = require('express')
const { registerUser } = require('../controllers/auth.Controller')
const router = express.Router()

router.route('/register').post(registerUser)
// router.route('/login').post()

module.exports = router