var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    firstName: {type:String, required: true},
    lastName : {type:String, required: true},
    dateOfBirth : {type:Date, required: true},
    age: {type: Number,min: 1,max:100, required: true},
    gender : {type: String, enum:['Male','Female'],required: true},
    phone: {type: String,required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model('Patient',schema);