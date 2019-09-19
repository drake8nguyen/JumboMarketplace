var mongoose = require("mongoose");
var Item = require("./models/item");
var Comment   = require("./models/comment");
 
// var data = [
//     {
//         name: "Epson artisan 837 printer", 
//         image: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/69511857_2447229505369355_9034628384772063232_n.jpg?_nc_cat=102&_nc_oc=AQleEHzYa24Xu7HyWfIxvC4LurY7rKk_xJOo2yzPkLaKmg3lnCKZUWd66dIfXGRScUs&_nc_ht=scontent-lga3-1.xx&oh=c8d264fde348dd838f961b0391d808b2&oe=5DFD5A6A",
//         description: "Price: $40. Has WiFi and Ethernet capabilities. Plus some ink cartridges!! Pick up at Miller Hall. Contact Jake at 781-452-1334"
//     },
//     {
//         name: "Beats Studio3 Midnight Black", 
//         image: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/70278617_2839968062699383_6807966726907494400_n.jpg?_nc_cat=108&_nc_oc=AQmA8V7TxM1HJzbLrMCLrU7ctR-xuox0nal4y8Icxgx6Y8Q-EXqVkPe8J_uqP2vWt_U&_nc_ht=scontent-lga3-1.xx&oh=e5fb005bed36cae6c2c0f9cf4e44106e&oe=5E084ADB",
//         description: "Brand new, unopened in box. Bought at retail price ($349) Looking to get off my hands ASAP and willing to negotiate. Pickup only at 580 Boston Avenue. Contact: Mike at 781-441-2452"
//     },
//     {
//         name: "Desk Lamp", 
//         image: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/69691705_10206323080992220_2354332653114621952_n.jpg?_nc_cat=109&_nc_oc=AQlh1depp48wpjPJwDEHvDQluusDzJwqk8sgPBY8o8QHd2aNHB0ClbgQ3pVkvD6ji64&_nc_ht=scontent-lga3-1.xx&oh=9a4f17c00ae902f586f84909d864790a&oe=5E0B0497",
//         description: "$15. 2 years old. Contact Natalie at 617-131-5245"
//     }
// ]
 
function seedDB(){
   Item.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed items!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
            data.forEach(function(seed){
                Item.create(seed, function(err, item){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added an item");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    item.comments.push(comment);
                                    item.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;