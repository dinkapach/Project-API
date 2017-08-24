import express from 'express';
import mongoose from 'mongoose';
import Customer from '../.././models/user-model';
import Manager from '../.././models/manager-model';
import CustomerRepository from '../.././database/repositories/customer.repository';
import ManagerRepository from '../.././database/repositories/manager.repository';
import Crypto from '../.././services/crypto.service';
import dateTimeFunctions from '../.././helpers/datetime.functions';

const router = express.Router();

router.get('/testDin', (req, res, next) => {
  console.log("hello world");
  res.status(200).json("customerUpdated");
});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).json({response : "OK!"});
});

router.post('/', (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;
  console.log("email: " + email + "pass: " + password);
  CustomerRepository.findCustomerByEmail(email)
  .then(customer => {
    console.log(customer);
    if(customer){
      Crypto.isMatch(password, customer.password)
      .then(match => {
        console.log(match);
          if(match) {
              console.log("customer logged in");
              res.status(200).json(customer);
          } 
          else { 
             console.log("wrong password"); 
            res.status(400).json("wrong password");
          
          }
      })
      .catch(err => { 
        console.log(err); 
        res.status(500).json(err);
      })
    }
    else {
      res.status(400).json(customer);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).end();
 });
});

router.post('/manager', (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;
  console.log("email: " + email + "pass: " + password);
  ManagerRepository.findManagerByEmail(email)
  .then(manager => {
    console.log('manager: '+ manager);
    if(manager != null){
      Crypto.isMatch(password, manager.password)
      .then(match => {
        console.log(match);
          if(match) {
              console.log("manager logged in");
              res.status(200).json(manager);
          } 
          else { 
            console.log("wrong password"); 
            res.status(400).json("wrong password");
            
          }
      })
      .catch(err => { 
        console.log(err); 
        res.status(500).json(err);
      })
    }
    else {
      console.log( 'not manager'); /////// how to say to user 
      res.status(400).json(manager);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).end();
 });
});

export default router;