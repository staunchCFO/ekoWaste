const express = require('express');
const router = express.Router();
const indexController = require('../controller/indexController') 
const userController  = require('../controller/user_controller')
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
router.get('/' , indexController.index) 
router.get('/signup' , userController.get_signup_form) 
router.post('/signup' , userController.post_signup_form) 
router.get('/login' , userController.get_login_form) 
router.post('/login' , userController.post_login_form)
router.get('/logout' , userController.get_logout_page)
router.get('/dashboard' ,userController.get_dashboard )
router.get('/staff' , userController.get_staff)
module.exports = router;
