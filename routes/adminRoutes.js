const express = require('express');
const router = express.Router();

const {authenticate} = require('../middlewares/authenticateMiddleware')
const { adminMiddleware } = require('../middlewares/isAdminMiddleware');

const { getAllUsers, getAllContacts, deleteUser, editUser, getSingleUser, deleteContact } = require('../controllers/admin-controllers');
router.get('/users',authenticate, adminMiddleware, getAllUsers )
router.get('/contacts',authenticate, adminMiddleware, getAllContacts )
router.delete('/user/delete/:id',authenticate, adminMiddleware, deleteUser )
router.put('/user/edit/:id',authenticate, adminMiddleware, editUser )
router.get('/user/:id',authenticate, adminMiddleware, getSingleUser )
router.delete('/contact/delete/:id',authenticate, adminMiddleware, deleteContact )

module.exports = router; 