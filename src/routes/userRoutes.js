const express = require('express')
const controls = require('../controls/userControls')
const verifyToken = require('../middleware/verifyToken')
const admin = require('../middleware/adminToken')
const route = express.Router()

route.route('/')
.get(controls.allUsers)
route.route('/dashboard')
.get(verifyToken, admin,controls.dashboard)

route.route('/:id')
.get(controls.userById)

route.route('/attendance/:id')
    .get(verifyToken , admin , controls.attendance)

route.route('/register')
    .post( controls.register)
route.route('/qr/:id')
    .post( controls.QR)
route.route('/login')
    .post( controls.login)

route.route('/completedata/:id')
    .patch(verifyToken,admin, controls.completeData)


module.exports = route