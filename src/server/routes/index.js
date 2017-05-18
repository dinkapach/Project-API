import express from 'express';
import mongoose from 'mongoose';
import Customer from '../.././models/user-model';
import CustomerRepository from '../.././database/repositories/customer.repository';
import Crypto from '../.././services/crypto.service';
import dateTimeFunctions from '../.././helpers/datetime.functions';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).json({response : "OK!"});
});

router.post('/', (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;

  CustomerRepository.findCustomerByEmail(email)
  .then(customer => {
    if(customer){
      Crypto.isMatch(password, customer.password)
      .then(match => {
          if(match) {
              console.log("customer logged in");
              res.status(200).json(customer);
          } 
          else { 
            res.status(200).json(null);
            console.log("wrong password"); 
          }
      })
      .catch(err => { 
        console.log(err); 
      })
    }
    else {
      res.status(200).json(customer);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).end();
 });
});


router.post('/singup', (req, res, next) => {
  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const address = req.body.address;
  const email = req.body.email;
  const phone = req.body.phone;
  const birthday = req.body.birthday;
  //TODO#username

  const customer = new Customer({
      id: id,
      username: firstName,
      firstName: firstName,
      lastName: lastName,
      password: password,
      address: address,
      email: email,
      age: dateTimeFunctions.calculateAge(birthday),
      phoneNumber: phone,
      img : "",
      birthday: birthday,
      clubs: [],
      credits: [],
      receipts: []
  });

  console.log(customer);
  CustomerRepository.addCustomer(customer);

  res.status(200).json({isAuth: true});

})

export default router;