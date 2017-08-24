import express from 'express';
import mongoose from 'mongoose';
import Customer from '../.././models/user-model';
import UserClub from '../.././models/user-club-model';
import CustomerRepository from '../.././database/repositories/customer.repository';
import ClubRepository from '../.././database/repositories/club.repository';
import UserClubRepository from '../.././database/repositories/userClub.repository';
import ClubModel from '../.././models/club-model';

const router = express.Router();

router.get('/', (req, res, next) => {
    ClubRepository.getAllClubs()
    .then( clubs => {
        if(clubs) {
            res.status(200).json(clubs);
        }
        else {
            console.log( "club.js: no clubs ");
            res.status(200).json(clubs);
        }
    })
    .catch(err => { 
        console.log(err);
        res.status(500).json(clubs);
    });
});


  router.post('/deleteCustomer', (req, res, next) => {
    const club = req.body.club;
    const customer = req.body.user;

    console.log("in club- deleteCustomer ");
    console.log(club);

    CustomerRepository.removeClubByClubId(customer, club.id)
    .then(customerUpdated => {
        ClubRepository.removeCustomerByCustomerId(club, customer._id)
        .then(clubUpdated => {
            res.status(200).json(true);
        })
        .catch(err => {
            console.log('Club was not updated', err);
            res.status(500).json(false);
        })
    })
    .catch(err => {
      console.log('Customer was not updated', err);
      res.status(500).json(false);
    });
  });


router.get('/user/:id', (req, res, next) => {
    const id = req.params.id;

    CustomerRepository.findCustomerById(id)
    .then(customer => {
        ClubModel.find({_id: { $in: customer.clubs }}).then(clubs => {
            res.status(200).json({ clubs : clubs });
        });
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    ClubRepository.findClubById(id)
    .then(club => {
        res.status(200).json({ clubId : club._id });
    })
    .catch(err => {
        console.log("error in club.js-/:id-", err);
        res.status(500).json({clubId : false });
    })
});



router.get('/credits', (req, res, next) => {
    ClubRepository.getAllCredits()
    .then( clubs => {
        if(clubs) {
            console.log("From server: clubs/credit...");
            res.status(200).json(clubs);
        }
        else {
            console.log( "club.js: no credits ");
            res.status(200).json(clubs);
        }
    })
    .catch(err => { 
        console.log(err);
        res.status(500).json(clubs);
    });
});

router.post('/addManualClub', (req, res, next) => {
    const customer = req.body.user;
    const clubObj = req.body.club;

    var club = new ClubModel();
    club.id = clubObj.id;
    club.img = clubObj.img;
    club.name = clubObj.name;
    club.address = clubObj.address;
    club.phoneNumber = clubObj.phoneNumber;
    club.openingHours = clubObj.openingHours;
    club.usersClub = clubObj.usersClub;
    club.sales = clubObj.sales;
    club.branches = clubObj.branches;
    club.isManual = clubObj.isManual;

    
    

    console.log("From server..addManualClub ");

    ClubRepository.addClub(club)
    .then(clubRes => {
        customer.clubs.push(clubRes);
        CustomerRepository.updateCustomer(customer.id, customer)
        .then(customerUpdated => {
            console.log("return from updateCustomer");
        const userClub = new UserClub();
          userClub.clubId = clubRes._id;
          userClub.customerId = customer._id;
          userClub.points = 0;
          UserClubRepository.addUserClub(userClub);
          clubRes.usersClub.push(userClub);
          ClubRepository.updateClub(clubRes.id, clubRes);
          
          res.status(200).json({
              isUpdated: true,
              customer: customerUpdated,
              club: clubRes
             });
        })
        .catch(err => {
          console.log('Customer was not updated', err);
          res.status(500).json({isUpdated: false});
        });
    })
    .catch(err => {
        console.log('Club was not updated', err);
        res.status(500).json({isUpdated: false});
    })
  });

  
router.post('/addToCustomer', (req, res, next) => {
    const club = req.body.club;
    const customer = req.body.user;
    const userClub = new UserClub();

    userClub.clubId = club._id;
    userClub.customerId = customer._id;
    userClub.points = 0;

    CustomerRepository.updateCustomer(customer.id, customer)
    .then(customerUpdated => {
      console.log("return from updateCustomer:\n" + customerUpdated);
      UserClubRepository.addUserClub(userClub);
      club.usersClub.push(userClub);
      ClubRepository.updateClub(club.id, club);
      
      res.status(200).json(true);
    })
    .catch(err => {
      console.log('Customer was not updated', err);
      res.status(500).json(false);
    });
  });



export default router;