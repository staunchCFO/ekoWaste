//! model for items in our application  
const mongoose = require('mongoose') 
const Schema   = mongoose.Schema 
const ItemSchema = new Schema({
	name : {
		type : String , 
		required : true , 
		minLength : [3 , 'Length too short'] , 
		maxLength : [10 , 'Length too long']
	} , 
	date_created : {
		type : Date , 
		default : Date.now()
	} , 
	status : {type: String , default : "Pending"} , 
	created_by : {
		type : Schema.Types.ObjectId , 
		ref  : 'User'
	}
})
//! Add virtuals to the schema 
//! Get the url of a particular item 
ItemSchema.virtual('url').get(function() {
	//!return '/user/' + this.created_by + '/item/' + this._id
	return '/user/' + this.created_by 
})
//! create the model to export  
module.exports = mongoose.model('Item' , ItemSchema)
