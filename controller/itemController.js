//! Require the project dependencies
let Item = require('../model/item')
let User = require('../model/user') 


//! Get the form for creating an item 
exports.get_create_item_form = (req , res , next) => {
	res.render('Not Implemented yet') 
}
//! Handle the submission of the form 
exports.post_create_item = (req , res , next) => {
	let item = new Item({
		name : req.body.name , 
		created_by : req.body.user 
	})
	item.save((err , success) => {
		if(err) {
			res.send('Error')
		}
		res.redirect(item.url)
	})
}
//! Handle item delete 
exports.delete_item = (req , res , next) => {
	Item.findOneAndRemove({'name' : name} , function(err , success) {
		if ( err )  {
			return next(err) 
		}
		res.send('Item deleted')
	})
}
//! Handling item update 
exports.update_item = (req , res,next) => {
	Item.findOneAndUpdate({created_by : 'userId'} , 
		{'$set' : {
		'name' : newName }
		} , function(err , success) {
			if (err) {
				return next(err) 
			}
			res.send('Update was successful')
		})
}
