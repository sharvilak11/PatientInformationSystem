var Patient = require('../models/patient')
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/hospital');

var patients =[
    new Patient({

    firstName: 'Sharvilak',
    lastName : 'Thakore',
    dateOfBirth :new Date("1993-08-31"),
    age: 23,
    gender : 'Male',
    phone: '8141909989',
    description: 'Anterior Cruciate Ligament'

    }),
        new Patient({
            firstName: 'Vedank',
            lastName : 'Patel',
            dateOfBirth :new Date("1993-09-24"),
            age: 23,
            gender : 'Male',
            phone: '7899957629',
            description: 'Pneumonia'
        })
    ];

var flag=0;
for(var i=0;i<patients.length;i++)
{
    patients[i].save(function(err,result){
        flag++;
        if(flag===patients.length){
            exit();
        }
    });

}
function exit() {
    mongoose.disconnect();
}