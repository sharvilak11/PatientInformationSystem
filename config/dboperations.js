/**
 * Created by Sharvilak on 26-02-2017.
 */
var Patient = require('../models/patient');

var insert_patient =function(firstname, lastname, dateofbirth, age, gender, phone, description){
    console.log(this.firstname);
    Patient.findOne({
        'firstname':firstname,
        'lastname':lastname,
        'dateofbirth':dateofbirth
    },function(err,patient){
        if(err) {
            return err;
        }
        if (patient){
            return 'Patient with same firstname,lastname and date of birth already exists.';
        }
        var newPatient = new Patient();
        newPatient.firstName = firstname;
        newPatient.lastName = lastname;
        newPatient.dateOfBirth = new Date(dateofbirth);
        newPatient.age = age;
        newPatient.gender = gender;
        newPatient.phone = phone;
        newPatient.description = description;

        newPatient.save(function(err,result){
            if(err) {
                return err;
            }
            return 'Patient has been added successfully';
        });
    });
}

exports.insertrecord = insert_patient;