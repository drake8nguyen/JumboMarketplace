var Item = require("../models/item");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkItemOwnership = function(req, res, next) {
	//ís user loggedin?
	if (req.isAuthenticated()) {
		Item.findById(req.params.id, function(err, foundItem) {
			if (err) {
				req.flash("error", "Item Not Found");
				res.redirect("back");
			} else {
				if(foundItem.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You dont have permission to do that");
					res.redirect("back");
				}
			}
		});		
	} else {
		res.redirect("back");
	}
};	

middlewareObj.checkCommentOwnership = function(req, res, next) {
	//ís user loggedin?
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if (err) {
				res.redirect("back");
			} else {
				//does user own the comment?
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});		
		
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
};


//middleware
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};

module.exports = middlewareObj;