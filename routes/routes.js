// ! INSTANTIATING ROUTER
const express = require('express')
const router = express.Router();

// ! IMPORTING CONTROLLERS
const {home, register, login, contact, user, services} = require('../controllers/controller')

// !IMPORTING VALIDATION MIDDLEWARE nad SIGNUP SCHEMA
const signupSchema = require('../validator/validator')
const validate = require('../middlewares/validationMiddleware')
const {authenticate} = require('../middlewares/authenticateMiddleware')

// ! DEFINING ROUTES
router.get('/', home)
router.post('/register',validate(signupSchema), register)
router.post('/login', login)
router.post('/contact', contact) 
router.get('/user', authenticate, user)
router.get('/services', services)

module.exports = router;