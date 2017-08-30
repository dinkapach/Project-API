import express from 'express';
import Manager from '../.././models/manager-model';
import ManagerRepository from '../.././database/repositories/manager.repository';
import Sale from '../.././models/sale-model';
import CustomerRepository from '../.././database/repositories/customer.repository';
import ClubRepository from '../.././database/repositories/club.repository';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({response : "OK!"});
});

router.post('/addSale', (req, res, next) => {
  const clubId = req.body.clubId;
  const saleObj = req.body.sale;
  console.log(saleObj);
  console.log(saleObj.points);
  const sale = new Sale({
    "id": saleObj.id,
    "name": saleObj.name,
    "img": saleObj.img,
    "description": saleObj.description,
    "points": saleObj.points,
    "price": saleObj.price
  })
  
  ManagerRepository.addSale(clubId, sale)
  .then(saleUpdated => {
    console.log("blue");
    res.status(200).json(true);
  })
  .catch(err => {
    console.log('User was not updated', err);
    res.status(500).json(false);
  });
})

router.post('/addPointsToCustomerById', (req, res, next) => {
  const customerId = req.body.customerId;
  const clubId = req.body.clubId;
  const numOfPoints = req.body.numOfPoints;
 
   ManagerRepository.addPointsToCustomerById(customerId, clubId, numOfPoints )
  .then(pointsUpdated => {
    console.log("blue");
    res.status(200).json(true);
  })
  .catch(err => {
    console.log('User was not updated', err);
    res.status(500).json(false)
  });
})

router.post('/subscribePointsToCustomerById', (req, res, next) => {
  console.log("manager js func post subscribe");
  const customerId = req.body.customerId;
  const clubId = req.body.clubId;
  const numOfPoints = req.body.numOfPoints;
 
   ManagerRepository.subscribePointsToCustomerById(customerId, clubId,numOfPoints )
  .then(pointsUpdated => {
    console.log("after manager repository");
    res.status(200).json(true);
  })
  .catch(err => {
    console.log('User was not updated', err);
    
    res.status(500).json(false);
  });
})

router.get('/getCustomerDetails/:customerId', (req, res, next) => {
  const customerId = req.params.customerId;
  console.log('customer id js : ' + customerId);
  ManagerRepository.findCustomerDetalisById(customerId)
  .then(customer => {
    console.log("din: " ,customer )
    if(customer) {
      
      res.status(200).json(customer);

    }
    else { 
      console.log("user not found");
      res.status(404).json({customer: customer});
    }
  })
  .catch(err => { 
    console.log(err); 
    res.status(500).end();
  });
});

router.post('/deleteCustomer', (req, res, next) => {
    const user =  req.body.user;
    const clubObjectId = req.body.clubId

    ClubRepository.findClubByObjectId(clubObjectId)
    .then(club => {
      club.usersClub = club.usersClub.filter( userClub => { //remove user from usersClub
        return userClub.customerId != user._id
      })
      ClubRepository.updateClub(club.id, club)  // update club after remove userClub
      .then(updatedClub => {
        user.clubs = user.clubs.filter(currClubObjectId => { // remove club from user
          return currClubObjectId != clubObjectId;
        })
        CustomerRepository.updateCustomer(user.id, user) // updated user after remove club from user
        .then( updatedUser => { res.status(200).json(true); })
        .catch( err => {
          console.log("err deleteCustomer->updateCustomer: ", err);
          res.status(500).json(false);
        })
      })
      .catch( err => {
        console.log("err deleteCustomer->updateClub: ", err);
        res.status(500).json(false);
      });
    })
    .catch( err => {
      console.log("err deleteCustomer->findClubByObjectId: ", err);
      res.status(500).json(false);
    });
  });


export default router;