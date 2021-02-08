const mongoose = require("mongoose");
const card = require("./models/bountyLeaflet");
const comment = require("./models/comment");

const data = [
    {   
        name: "มังกี้ ดี. ลูฟี่",
        imgurl:"https://cdn.majorcineplex.com/uploads/content/images/1%28119%29.JPG",
        decs1: "หมวกฟาง (Straw Hat)",
        decs2: "1,500,000,000 เบรี"
    },
    {   name: "โรโรโนอา โซโร",
        imgurl:"https://cdn.majorcineplex.com/uploads/content/images/2%28112%29.JPG",
        decs1: "นักล่าโจรสลัด (Pirate Hunter)",
        decs2: "320,000,000 เบรี"
    },
    {   name: "นามิ",
        imgurl:"https://cdn.majorcineplex.com/uploads/content/images/3%2897%29.JPG",
        decs1: "แมวขโมย (Cat Burglar)",
        decs2: "66,000,000 เบรี"
    },
    {   name: "อุซป",
        imgurl:"https://cdn.majorcineplex.com/uploads/content/images/4%2883%29.JPG",
        decs1: "โซเงคิงส์ (Sogeking), ก็อดอุซป (God Usopp)",
        decs2: "200,000,000 เบรี"
    },
    {   name: "ซันจิ",
        imgurl:"https://cdn.majorcineplex.com/uploads/content/images/5%2874%29.JPG",
        decs1: "ขาดำ (Black Leg)",
        decs2: "330,000,000 เบรี"
    },
    {   name: "โทนี่ โทนี่ ช็อปเปอร์",
        imgurl:"https://cdn.majorcineplex.com/uploads/content/images/6%2864%29.JPG",
        decs1: "ผู้ชอบกินขนมหวาน (Cotton Candy Lover)",
        decs2: "100 เบรี"
    },
    {   name: "นิโค โรบิน",
        imgurl:"https://cdn.majorcineplex.com/uploads/content/images/7%2860%29.JPG",
        decs1: "เด็กปีศาจ (Devil Child)",
        decs2: "130,000,000 เบรี"
    },
    {   name: "แฟรงกี้",
        imgurl:"https://cdn.majorcineplex.com/uploads/content/images/8%2853%29.JPG",
        decs1: "ไซบอร์ค (Cyborg)",
        decs2: "94,000,000 เบรี"
    },
    {   name: "บรู๊ค",
        imgurl:"https://cdn.majorcineplex.com/uploads/content/images/9%2840%29.JPG",
        decs1: "โซลคิงส์ (Soul King)",
        decs2: "83,000,000 เบรี"
    },
    {   name: "จินเบ",
        imgurl:"https://cdn.majorcineplex.com/uploads/content/images/10%28166%29.jpg",
        decs1: "ชายชาตรีแห่งท้องทะเล (Knight of the Sea)",
        decs2: "438,000,000 เบรี"
    }
]

function seedDB(){
    card.remove({}, function(err){
        if(err){
            console.log("Remove database error!");
        } 
        console.log("Drop database success");
        data.forEach(function(seed){
            card.create(seed, function(err,card){
                if(err){
                    console.log("Add card error!");
                } else{
                    console.log("Add a card");
                    comment.create(
                        {
                            text: "มันสุดยอดมาก",
                            username: "kluaynum1150"
                        }, function(err,comment){
                            if(err){
                                console.log(err);
                            } else{
                                card.comment.push(comment);
                                card.save();
                                console.log("comment added");
                            }
                        }
                    );
                }
            });
        });
    });
}

module.exports = seedDB;