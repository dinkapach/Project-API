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

    ClubRepository.findClubById(id)
    .then(club => { 
        if (club){   
             console.log('from server: club/id ' + club.name);
             res.status(200).json(club);
        }
        else{
              console.log('from server: club/id - NoClubs' );
              res.status(200).json(club);
        }
   
    })
        .catch(err => { 
        console.log(err);
        res.status(500).json(club);
    });
});

router.get('/objectid/:clubId', (req, res, next) => {
    const objectId = req.params.clubId;
    
    ClubRepository.findClubByObjectId(objectId)
    .then(club => {
        res.status(200).json(club);
    })
    .catch( err => {
         console.log(err);
        res.status(500).json(club);
    });
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
          userClub.customerId = customer._id;
          userClub.points = 0;
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

    userClub.customerId = customer._id;
    userClub.points = 0;

    CustomerRepository.updateCustomer(customer.id, customer)
    .then(customerUpdated => {
      console.log("return from updateCustomer:\n" + customerUpdated);
      club.usersClub.push(userClub);
      ClubRepository.updateClub(club.id, club);
      
      res.status(200).json(true);
    })
    .catch(err => {
      console.log('Customer was not updated', err);
      res.status(500).json(false);
    });
  });

  router.post('/deleteSale', (req, res, next) => {
  const saleId = req.body.saleId;
  const club = req.body.club;
  console.log("from server-deleteSale - user id is: ", saleId );
  ClubRepository.removeSale(club, saleId)
  .then(clubUpdated => {
    console.log('sale was deleted');
    res.status(200).json({isAuth: true, club: clubUpdated});
  })
  .catch(err => {
    console.log('sale was not deleted', err);
    res.status(500).json(false);
  });
});

router.post('/deleteUser', (req, res, next) => {
  const customerId = req.body.customerId;
  const club = req.body.club;
  console.log("from server-deleteUser - user id is: ", customerId );
  ClubRepository.removeUser(club, customerId)
  .then(clubUpdated => {
    console.log('user was deleted');
    res.status(200).json({isAuth: true, club: clubUpdated});
  })
  .catch(err => {
    console.log('user was not deleted', err);
    res.status(500).json(false);
  });
});


export default router;