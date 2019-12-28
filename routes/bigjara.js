const express = require('express');
const router = express.Router();
//! Get the controllers for the application 
const userController = require('../controller/user_controller') 
const itemController = require('../controller/itemController') 
/*! Setup the routing mechaninsm for the application*/
//! A router will take a route and a callback to handle request to that route 

//! Get request for the home page 
router.get('/'  , userController.index)

//! Get request for registering as a user 
router.get('/signup' , userController.get_signup_form)
//! post request for registering as a user 
router.post('/signup' , userController.post_signup_form) 
//! get request to fetch a single user 

//! This path is for testing how to use the fetch get request API
router.get('/fetch' , userController.fetch_users) 
//! get request to login 
router.get('/login' , userController.get_login_form) 
//! post request to login 
router.post('/login' , userController.post_login_form)
//! Log the user out 
router.get('/logout' , userController.get_logout_page)

router.get('/user/:id' , userController.get_user_detail) 
//! get the delete a user 
router.get('/user/:id/delete' , userController.get_user_delete)
//! delete a user 
//! get request to create an item for a particular user 
//router.get('/user/:id/item , userController.get_create_item_form) 
//! post request to create an item for a particular user
router.get('/user/:id/item/:id' , (req , res , next) => {
	res.send('Not implemented yet') 
})
router.post('/user/:id', itemController.post_create_item) 
module.exports = router;
