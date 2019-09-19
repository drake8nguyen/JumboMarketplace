var express = require("express");
var router  = express.Router();
var Item = require("../models/item");
var middleware = require("../middleware");

router.get("/", function(req, res){
    Item.find({}, function(err, allItems){
       if(err){
           console.log(err);
       } else {
          res.render("items/index",{items:allItems});
       }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
    var newItem = {name: name, image: image, description: desc, author: author};
	console.log(req.user);
    Item.create(newItem, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
			console.log(newlyCreated);
            res.redirect("/items");
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("items/new"); 
});

router.get("/:id", function(req, res){
    Item.findById(req.params.id).populate("comments").exec(function(err, foundItem){
        if(err){
            console.log(err);
        } else {
            console.log(foundItem);
            res.render("items/show", {item: foundItem});
        }
    });
});

router.get("/:id/edit", middleware.checkItemOwnership, function(req, res) {
		Item.findById(req.params.id, function(err, foundItem) {
			res.render("items/edit", {item: foundItem});
		});		
});

router.put("/:id", function(req, res){
	Item.findByIdAndUpdate(req.params.id, req.body.item, function(err, updatedItem) {
		if (err) {
			res.redirect("/items");
		} else {
			res.redirect("/items/" + req.params.id); 
		}
	});
	//redirect to show page
});


// DESTROY ROUTE
router.delete("/:id", function(req, res){
	Item.findByIdAndRemove(req.params.id, function(err){
		if (err) {
			res.redirect("/items");
		} else {
			res.redirect("/items");
		}
	});
});

module.exports = router;
