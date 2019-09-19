var express = require("express");
var router  = express.Router({mergeParams: true});
var Item = require("../models/item");
var Comment = require("../models/comment");
var middleware = require("../middleware");


//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    console.log(req.params.id);
    Item.findById(req.params.id, function(err, item){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {item: item});
        }
    });
});

//Comments Create
router.post("/", middleware.isLoggedIn,function(req, res){
   Item.findById(req.params.id, function(err, item){
       if(err){
           console.log(err);
           res.redirect("/items");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
			   req.flash("error", "Something went wrong");
               console.log(err);
           } else {
			   //add username and id to comment
			   comment.author.id = req.user._id;
			   comment.author.username = req.user.username;
			   comment.save();
               item.comments.push(comment);
               item.save();
			   req.flash("success", "Successfully added comment");
               res.redirect('/items/' + item._id);
           }
        });
       }
   });
});


//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById (req.params.comment_id, function(err, foundComment) {
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {item: req.params.id, comment: foundComment});
		}
	});
});

//COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/items/" + req.params.id);
		}
	});
});

//DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if (err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted");
			res.redirect("/items/" + req.params.id);
		}
	});
});



module.exports = router;