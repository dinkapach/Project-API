import express from 'express';
import mongoose from 'mongoose';
import Customer from '../.././models/user-model';
import CustomerRepository from '../.././database/repositories/customer.repository';
import ManagerRepository from '../.././database/repositories/manager.repository';
import SuperManagerRepository from '../.././database/repositories/super.manager.repository';
import Crypto from '../.././services/crypto.service';
import dateTimeFunctions from '../.././helpers/datetime.functions';
import birthdayReminder from './../../helpers/birthdayRemainders.functions';
import ClubRepository from '../.././database/repositories/club.repository';
const router = express.Router();

router.get('/testDin', (req, res, next) => {
  birthdayReminder.findBirthday();
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
            res.status(400).json("wrong password");
            console.log("wrong password"); 
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
    if(manager){
      Crypto.isMatch(password, manager.password)
      .then(match => {
        console.log(match);
          if(match) {
            ClubRepository.getClubWithPopulatedCustomers(manager.clubId)
            .then(club =>{
              if(club){
                console.log("manager logged in");
                res.status(200).json({
                  manager: manager,
                  club: club
                });
              }
              else{
                console.log("wrong password"); 
                res.status(400).json("club not found");
              }
            })
            .catch(err => {
              console.log(err); 
              res.status(500).json(err);
            });
          } 
          else { 
            console.log("wrong password"); 
            res.status(400).json("wrong password");
          }
      })
      .catch(err => { 
        console.log(err); 
        res.status(500).json(err);
      });
    }
    else {
      console.log('manager not found'); /////// how to say to user 
      res.status(400).json(manager);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).end();
 });
});

router.post('/super', (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;

  console.log("email: " + email + "pass: " + password);

  SuperManagerRepository.findSuperManagerByEmail(email)
  .then(superManager => {
    console.log(superManager);
    if(superManager){
      Crypto.isMatch(password, superManager.password)
      .then(match => {
        console.log(match);
          if(match) {
              console.log("superManager logged in");
              res.status(200).json(superManager);
          } 
          else { 
            res.status(400).json("wrong password");
            console.log("wrong password"); 
          }
      })
      .catch(err => { 
        console.log(err); 
        res.status(500).json(err);
      })
    }
    else {
      res.status(400).json(superManager);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).end();
 });
});

export default router;