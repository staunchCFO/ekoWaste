//!  Require the models since the controller will depend on them 

exports.index = function(req , res , next){ 
    res.render('index' , {title : 'Todo'})
}