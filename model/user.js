//! model for users of our application 
const mongoose = require('mongoose') 
const Schema   = mongoose.Schema 

const userSchema = new Schema({
	name : {
		type : String , 
		min : 2 , 
		max : 20 , 
		required : [true , 'name should be min of 2 characters or max of 20']
	} , 
	email : {type : String  , required : true } , 
    password : {type : String , required : true }  , 
	date_of_birth : {type : Date , default : Date.now()}
	
})  
//! Add some virtual to help us get the user 
userSchema.virtual('username').get(function() {
	return this.name 
})
//! Get the url of a user 
userSchema.virtual('url').get(function() {
	return '/user/' + this._id //! Nothingless , will still try to use the username in accessing the staff  
})

//! create the model to export  
module.exports = mongoose.model('User' , userSchema)
