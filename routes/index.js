var express = require('express');
var router = express.Router();
var url=require('url');
//var dboperations = require('../config/dboperations');
var Patient = require('../models/patient');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Patient Information System'});
});

router.get('/patient/add-patient',function(req,res,next) {
    res.render('patient/add-patient',{success:req.session.success,errors:req.session.errors });
    req.session.errors=null;
    req.session.success=null;
});

router.post('/patient/add-patient/submit',function(req,res,next)
{
    req.check('firstname','Please provide a valid First-Name in 2-20 letters').notEmpty().isAlpha().isLength({min:2,max:20});
    req.check('lastname','Please provide a valid Last-Name in 2-20 letters').notEmpty().isAlpha().isLength({min:1,max:20});
    req.check('dateofbirth','Please provide a valid Birth-Date').notEmpty().isDate();
    req.check('phone','Please provide a valid Phone-No.').notEmpty().isMobilePhone('en-IN');
    req.check('description','Please provide Description between 100-200 chars').notEmpty().isAlphanumeric().isLength({min:100,max:200});


        var errors = req.validationErrors();
        if(errors){
            req.session.errors = errors;
            req.session.success = false;
        }
        else{
            req.session.success = true;
        }
        //console.log(req.session.errors);

       if(!errors) {


           var flag = 0;
           Patient.findOne({
               'firstName': req.body.firstname,
               'lastName': req.body.lastname,
               'phone': req.body.phone
           }, function (err, patient) {

               if (err) {
                   console.log(err);
                   req.session.errors = "Something went wrong. Please try again";
                   req.session.success = false;
                   flag=0;
               }
               else if (patient) {
                   req.session.errors = "Patient with same firstname, lastname and phone number already exists!";
                   req.session.success = false;
                   //console.log(req.session.success);
                   flag=0;
               }
               else {
                   flag = 1;
               }
           });

           if (flag === 1) {
               var newPatient = new Patient({
                   firstName: req.body.firstname,
                   lastName: req.body.lastname,
                   dateOfBirth: req.body.dateofbirth,
                   age: req.body.age,
                   gender: req.body.gender,
                   phone: req.body.phone,
                   description: req.body.description
               });

               newPatient.save(function (err, result) {

                   if (err) {
                       console.log(err);
                       req.session.errors = "Something went wrong. Please try again";
                       req.session.success = false;
                   }
               });

           }
       }
    res.redirect('/patient/add-patient');
});

router.get('/patient/retrieve-patient',function (req,res,next) {
    res.render('patient/retrieve-patient');

});

router.get('/patient/retrieve-patient/submit',function(req,res,next){

        var firstname=req.query['firstname'];

            if(firstname==='') {
                var nofound = "Patient not found!!";
                res.render('patient/retrieve-patient',{nofoundmessage:nofound});
                console.log('Inside null');
            }
            else {
                Patient.find({'firstName': {'$regex':firstname}}, function (err, docs) {
                    if(docs.length===0){
                        var nofound = "Patient not found!!";
                    }
                    res.render('patient/retrieve-patient', {patients: docs,nofoundmessage:nofound});

                });
            }

});

router.get('/patient/description-search',function(req,res,next){

    var firstname = req.query['firstname'];
    var lastname = req.query['lastname'];
    var phone = req.query['phone'];

    if(firstname==null || lastname==null || phone==null){
        res.redirect('/patient/retrieve-patient');
    }
    else
    {
        Patient.findOne({'firstName':firstname,'lastName':lastname, 'phone':phone},function(err,docs) {
            console.log(docs);
            res.render('patient/description', {patients: docs});

        });
    }
});

router.get('/patient/description',function(req,res,next){
    var firstname = req.query['firstname'];
    var lastname = req.query['lastname'];
    var phone = req.query['phone'];

    if(firstname==null || lastname==null || phone==null){
        res.redirect('/patient/retrieve-patient');
    }
});

module.exports = router;
