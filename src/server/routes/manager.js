import express from 'express';
import Manager from '../.././models/manager-model';
import ManagerRepository from '../.././database/repositories/manager.repository';
import Sale from '../.././models/sale-model';
import CustomerRepository from '../.././database/repositories/customer.repository';
import ClubRepository from '../.././database/repositories/club.repository';

const router = express.Router();

router.get('/:managerId', (req, res, next) => {
  const managerId = req.params.managerId;
  console.log('get manager : + ' + managerId);
  ManagerRepository.findManagerById(managerId)
  .then(manager => {
    if(manager) {
      ClubRepository.getClubWithPopulatedCustomers(manager.clubId)
      .then(club =>{
        if(club){
          console.log("club: ", club);
          res.status(200).json({
            manager: manager,
            club: club
          });
        }
        else{
          console.log("club not found"); 
          res.status(400).json("club not found");
        }
      })
      .catch(err => {
        console.log(err); 
        res.status(500).json(err);
      });
    }
    else { 
      console.log("user not found");
      res.status(404).json({manager: manager});
    }
  })
  .catch(err => { 
    console.log(err); 
    res.status(500).end();
  });
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

  console.log(sale);
  console.log("club Id is: ", clubId)

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
  const clubObjId = req.body.clubObjId;
  const numOfPoints = req.body.numOfPoints;

  ManagerRepository.addPointsToCustomerById(customerId, clubObjId, numOfPoints)
    .then(newPoints => {
      console.log("clubUpdated:", newPoints);
      res.status(200).json({isUpdated: true, newPoints:newPoints });
    })
    .catch(err => {
      console.log('User was not updated', err);
      res.status(500).json({isUpdated: false})
    });
})

router.post('/subscribePointsToCustomerById', (req, res, next) => {
  console.log("manager js func post subscribe");
  const customerId = req.body.customerId;
  const clubObjId = req.body.clubObjId;
  const numOfPoints = req.body.numOfPoints;

  ManagerRepository.subscribePointsToCustomerById(customerId, clubObjId, numOfPoints)
    .then(newPoints => {
      console.log("clubUpdated:", newPoints);
      res.status(200).json({isUpdated: true, newPoints:newPoints });
    })
    .catch(err => {
      console.log('User was not updated', err);
      res.status(500).json({isUpdated: false})
    });
})

router.get('/getCustomerDetails/:customerId', (req, res, next) => {
  const customerId = req.params.customerId;
  console.log('customer id js : ' + customerId);
  ManagerRepository.findCustomerDetalisById(customerId)
    .then(customer => {
      console.log("din: ", customer)
      if (customer) {
        res.status(200).json(customer);
      }
      else {
        console.log("user not found");
        res.status(404).json({ customer: customer });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

router.get('/getCustomers/:clubId', (req, res, next) => {
  const clubId = req.params.clubId;
  console.log('club id js : ', req.params.clubId);
  ManagerRepository.findCustomers(clubId)
    .then(customers => {
      console.log("din: ", customers)
      if (customers) {
        res.status(200).json(customers);
      }
      else {
        console.log("club not found");
        res.status(404).json({ customers: customers });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

router.post('/editSale', (req, res, next) => {
  const saleUpdate = req.body.saleUpdate;
  const clubId = req.body.clubId;
  console.log('edit sale: club id' + clubId);
  console.log(clubId, saleUpdate);

  ManagerRepository.editClubSale(clubId, saleUpdate)
    .then(saleUpdate => {
      console.log("return from updateClub:\n", saleUpdate);
      res.status(200).json(saleUpdate);
    })
    .catch(err => {
      console.log('Club was not updated', err);
      res.status(500).json(false);
    });
});

router.post('/deleteCustomer', (req, res, next) => {
  const userObjectId = req.body.userObjectId;
  const clubObjectId = req.body.clubId
  
  ClubRepository.findClubByObjectId(clubObjectId)
    .then(club => {
      club.usersClub = club.usersClub.filter(userClub => { //remove user from usersClub
        return userClub.customerId != userObjectId
      })
      ClubRepository.updateClub(club.id, club)  // update club after remove userClub
        .then(updatedClub => {
          CustomerRepository.findCustomerByObjectId(userObjectId)
            .then(user => {
              console.log("usersClub: ", userObjectId)
              user.clubs = user.clubs.filter(currClubObjectId => { // remove club from user
                return currClubObjectId != clubObjectId;
              })
              CustomerRepository.updateCustomer(user.id, user) // updated user after remove club from user
                .then(updatedUser => { res.status(200).json(true); })
                .catch(err => {
                  console.log("err deleteCustomer->updateCustomer: ", err);
                  res.status(500).json(false);
                })
            })
            .catch(err => {
              console.log("err deleteCustomer->findCustomerByObjectId: ", err);
              res.status(500).json(false);
            })
        })
        .catch(err => {
          console.log("err deleteCustomer->updateClub: ", err);
          res.status(500).json(false);
        });
    })
    .catch(err => {
      console.log("err deleteCustomer->findClubByObjectId: ", err);
      res.status(500).json(false);
    });
});

router.post('/updateClubInfo', (req, res, next) => {
  const clubUpdate = req.body.clubUpdate;
  const clubId = req.body.clubId;
  console.log("from updateCustomerInfo: ", clubId, clubUpdate);

  ClubRepository.updateClub(clubId, clubUpdate)
    .then(clubUpdate => {
      console.log("return from updateClub:\n" + clubUpdate);
      res.status(200).json(clubUpdate);
    })
    .catch(err => {
      console.log('Club was not updated', err);
      res.status(500).json(false);
    });
});

router.post('/updateManagerInfo', (req, res, next) => {
  const managerUpdate = req.body.managerUpdate;
  const managerId = req.body.managerId;
  console.log("from update Manager nfo: ", managerId, managerUpdate);

  ManagerRepository.updateManager(managerId, managerUpdate)
  .then(managerUpdated => {
    console.log("return from updateCustomer:\n" , managerUpdated);
    res.status(200).json(managerUpdated);
  })
  .catch(err => {
    console.log('Customer was not updated', err);
    res.status(500).json(false);
  });
});

router.post('/changePassword', (req, res, next) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const managerId = req.body.managerId;
  console.log("currentPassword: " + currentPassword + "newPassword: " + newPassword + "managerId" + managerId);

  ManagerRepository.changePassword(managerId, currentPassword, newPassword)
  .then(manager => {
    if(manager) {
      console.log("success" + manager);
      res.status(200).json(manager);
    }
    else { 
      console.log("manager not found" + manager);
      res.status(400).json(false);
    }
  })
  .catch(err => { 
    console.log("password not match" + err); 
    res.status(400).json(false).end();
  });
});

export default router;