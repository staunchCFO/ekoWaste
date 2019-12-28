//! Require the project dependencies 
let User = require('../model/user')
let Item = require('../model/item') 


//! Get the home page for the application 
exports.index = (req , res , next) => {
	User.find() 
	.sort([['name' , 'descending']])
	.populate('user')
	.exec(function(err , user_list) {
		if (err) {
			return next(err) 
		}
		//!res.json(user_list) 
		if ( user_list.length == 0 ) {
			res.render('index' , {users : user_list ,
  		        title : 'ekoWaste - Dispose with ease' , 
				totalUsers : 0}
			)
		}
		res.render('index' , {users : user_list ,
  		        title : 'ekoWaste - Dispose with ease' , 
				totalUsers : user_list.length}
			)
	})
}
//! Fetching users 
exports.fetch_users = (req , res , next) => {
	User.find() 
	.sort([['name' , 'descending']])
	.populate('user')
	.exec(function(err , user_list) {
		if (err) {
			return next(err) 
		}
		//!res.json(user_list) 
		if ( user_list.length == 0 ) {
			let user_list = {
				name : null 
			}
			res.json(user_list)
		}
		res.json(user_list)
	})
}
//! Controller function for handling a get request for sign up form 
exports.get_signup_form = (req , res) => {
    res.render('signup' , {title : 'Create an account with us!!'})
} 
			
//! Handling form submission of sign up form 
exports.post_signup_form = (req , res) => {
   //! Create a new user object from the User model 
   //! You can perform validation on each field before inserting 
   let userName = req.body.name 
   let user = new User({
    name : userName.toLowerCase() , 
    email : req.body.email  , 
    password : req.body.password
   })
   user.save((err , success) => {
	    if (err) {
		    res.render('signup' , {title : 'Get Started for free' , regError : err})
		}
		//!res.redirect(303 , '/login')
		res.render('registration-success' , {email : req.body.email}) 
		
   }) 
   
} 
//! Display detail for a specific user 
exports.get_user_detail = (req , res , next) => {
		    User.findById(req.params.id , function(err , user){
				if (err) {
					return next(err) 
				}
				Item.find({'created_by' : user._id} , function(err , item) {
					if (err) {
						return next(err) 
					}
					let itemArray = [].push(item)
			        res.render('user_detail' , {result : user , items : item})
				}) 
			})
		}
	

//! Get the login form 
exports.get_login_form = (req , res) => {
    res.render('login' , {title : 'Login to your account'})
} 
//! Handle post request from login form 
exports.post_login_form = (req , res) => {
    User.findOne({email : req.body.email , password : req.body.password} , function(err , user) {
            if (err) { 
			    res.render('login' , {title : 'Login to your account' , error : 'Sorry , please try again'})
			}
            if (user == null || !user) {
				res.render('login' , {title : 'Login to your account' , error : 'Invalid Login details'})
            }
            //! Set cookie if the request was successful			
            //!res.cookie('user' , req.body.email) 
				//! Need to clear cookie before sending any other 
			if ( user ) {
                res.redirect(user.url)
			}
        })
}

// Controller for staff
exports.get_staff = (req , res) => {
	res.render('staff' , {title : 'Staff homepage'})
}

//! Controller for dashboard
exports.get_dashboard = (req , res) => {
    //res.send('Not implemented yet') 
    if ( req.cookies.user) { 
        let user = req.cookies.user
        User.findOne({email : user} , function(err , result) {
            if (err) { 
			    res.render('error')
			}
            res.render('users' , {info : result}) 
        })
    }
    
}
//! Get logout route 
exports.get_logout_page = (req , res) => {
    //!res.clearCookie('user') 
    res.redirect(303 , '/login')
}
exports.get_user_delete = (req , res , next) => {
	
	//!check if the user has created some items 
	Item.find({'created_by' : req.params.id} , function(err , items) {
		if (err) {
			return next(err) 
		}
		Item.deleteMany({'created_by' : req.params.id} , function(err) {
			if (err) {
				return next(err) 
			}
			User.findByIdAndRemove(req.params.id , function(err) {
				if (err) {
					return next(err) 
				}
				res.redirect(303 , '/')
			})
		})
	})
				
}


















//! Request to update a user 
exports.update_user_detail = (req , res , next) => {
	User.findOneAndUpdate({'email' : email } , 
		{'$set' : {
			email : req.body.email 
		}
		})
}





//! Get request for deleting a user 
exports.update_user_form = (req , res) => {
	let user = User.findOne({'email' : email} , function(err , success) {
		if (err) {
			return next(err) 
		}
	   res.render('user_update_form' , {user : user})
	})
}
//! Get request to delete a user 
exports.delete_user = (req , res , next) => {
	User.findOneAndRemove({'email' : email} , function(err , success) {
		if (err) {
			return next(err) 
		}
		res.redirect('/')
	})
}