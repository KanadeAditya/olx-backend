const mongoose = require('mongoose');
// "description" : "Almost brand new, rarely used",
// "category" : "clothing",
// "image" : "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7fbc5e94-8d49-4730-a280-f19d3cfad0b0/custom-nike-air-max-90-by-you.png",
// "location" : "india",
// "postedAt" : "2023-02-01",
// "price" : "7999"

const classifiedschema = mongoose.Schema({
    name : {type : String , required : true},
    description : {type : String , required : true},
    category : {type : String , required : true},
    image : {type : String , required : true},
    location : {type : String , required : true},
    postedAt : {type : Date , required : true},
    price : {type : Number , required : true},
})

const ClassfieldsModel = mongoose.model('classifieds',classifiedschema);

module.exports = {ClassfieldsModel}