import express from 'express';
import SuperManagerRepository from '../.././database/repositories/super.manager.repository';
import ManagerRepository from '../.././database/repositories/manager.repository';
import ClubRepository from '../.././database/repositories/club.repository';
import CustomerRepository from '../.././database/repositories/customer.repository';
import DateTimeHelper from '../.././helpers/datetime.functions';


const router = express.Router();

////////////////////////////// CUSTOMER STUFF ///////////////////////////////////////////////

router.get('/customerArr', (req, res, next) => {
  
    CustomerRepository.getAllCustomers()
    .then(customerArr => {
      if(customerArr) {
        res.status(200).json({isAuth: true, customerArr: customerArr});
      }
      else {
        res.status(500).json({ isAuth: false });
      }
    })
    .catch(err => {
      res.status(500).json({ isAuth: false });
    });
  
  });

  
  router.post('/deleteCustomerFromDB', (req, res, next) => {
    const userId = req.body.userId;

    CustomerRepository.findCustomerById(userId)
    .then(customerFromDB => {
      CustomerRepository.removeCustomerFromDB(customerFromDB._id)
      .then(removedCustomer => {
        console.log(" customer removed ");
        res.status(200).json(true);
      })
      .catch(err => {
        console.log("customer not removed, err: ", err);
        res.status(500).json(false);
      })
    })
    .catch( err => {
      console.log("customer not found, err: ", err);
      res.status(500).json(false);
    })  
});


///////////////////////////// CLUBS  STUFF /////////////////////////////////////////////////

router.get('/clubArr', (req, res, next) => {
  
    ClubRepository.getAllClubs()
    .then(clubArr => {
      if(clubArr) {
        res.status(200).json({isAuth: true, clubArr: clubArr});
      }
      else {
        res.status(500).json({ isAuth: false });
      }
    })
    .catch(err => {
      res.status(500).json({ isAuth: false });
    });
  
  });


  router.post('/updateClub', (req, res, next) => {
    const club = req.body.club;

    ClubRepository.updateClub(club.id, club)
    .then( updatedClub => {
      if(updatedClub){
        res.status(200).json(true);
      }
      else{
        console.log("updateClub -> Repository.updateclub-> club probably undifine:", updatedClub);
        res.status(500).json(false);
      }
    })
    .catch(err => {
      console.log(" err in updated club from super manager.js: ", err);
      res.status(500).json(false);
    })
   
});

  
  router.post('/deleteClub', (req, res, next) => {
    const club = req.body.club;

    ClubRepository.findClubById(club.id)
    .then(clubFromDB => {
      ClubRepository.RemoveClub(clubFromDB._id)
      .then(removedClub => {
        console.log(" club removed ");
        res.status(200).json(true);
      })
      .catch(err => {
        console.log("club not removed, err: ", err);
        res.status(500).json(false);
      })
    })
    .catch( err => {
      console.log("club not found, err: ", err);
      res.status(500).json(false);
    })  
});

router.post('/deleteClubRemoveFromManager', (req, res, next) => {
  const club = req.body.club;
  const managerId = req.body.managerId;

  ClubRepository.findClubById(club.id)
  .then(clubFromDB => {
    ClubRepository.RemoveClub(clubFromDB._id)
    .then(removedClub => {
      ManagerRepository.findManagerById(managerId)
      .then(manager => {
        manager.clubId = 0;
        console.log("deleteClubRemoveFromManager -> manager: ", manager)
        ManagerRepository.updateManager(manager.id, manager)
        .then(updatedManager => { res.status(200).json(true); })
      })
      .catch(err => {
        console.log("deleteClubRemoveFromManager->updateManager, err: ", err);
        res.status(500).json(false);
      })
      .catch(err => {
        console.log("deleteClubRemoveFromManager-> findManagerById, err: ", err);
        res.status(500).json(false);
      })
     
    })
    .catch(err => {
      console.log("club not removed, err: ", err);
      res.status(500).json(false);
    })
  })
  .catch( err => {
    console.log("club not found, err: ", err);
    res.status(500).json(false);
  })

});





//////////////////////////////////// MANAGERS //////////////////////////////////////

router.get('/managerArr', (req, res, next) => {

  ManagerRepository.getAllManagers()
  .then(managerArr => {
    if(managerArr) {
      res.status(200).json({isAuth: true, managerArr: managerArr});
    }
    else {
      res.status(500).json({ isAuth: false });
    }
  })
  .catch(err => {
    res.status(500).json({ isAuth: false });
  });

});

router.post('/updateManager', (req, res, next) => {
  const manager = req.body.manager;

  ManagerRepository.updateManager(manager.id, manager)
  .then( updatedManager => {
    res.status(200).json(true);
  })
  .catch( err => {
    console.log("err to update manager: ", err);
    res.status(500).json(false);
  })

});


router.post('/addExistingClubToManager', (req, res, next) => {
  const managerId = req.body.managerId;
  const clubId = req.body.clubId;
  
  console.log("manager id",managerId);

  ClubRepository.findClubById(clubId)
  .then(club => {
    ManagerRepository.findManagerById(managerId)
    .then(manager => {
      if(manager){
      manager.clubId = club._id;
      ManagerRepository.updateManager(manager.id, manager)
      .then(updatedManager => {
        res.status(200).json(true);
      })
      .catch( err => {
        console.log("err addExistingClubToManager-> updateManager: ", err);
        res.status(500).json(false);
      })
    }
    else {
      console.log("addExistingClubToManager-> findManagerById managr probly undifine ");
      res.status(500).json(false);
    }
    })
    .catch( err => {
      console.log("err addExistingClubToManager-> findManagerById: ", err);
      res.status(500).json(false);
    })
  })
  .catch(err => {
    console.log("err addExistingClubToManager-> findClubById: ", err);
    res.status(500).json(false);
  })
 
});

router.post('/deleteManagerWithClub', (req, res, next) => {
  const managerId = req.body.managerId;
  const clubObjectId = req.body.clubId;

    ManagerRepository.removeManager(managerId)
    .then(result => {
      console.log(result);
      ClubRepository.RemoveClub(clubObjectId)
      .then(removedClub => {
        console.log(" club removed ");
        res.status(200).json(true);
      })
      .catch(err => {
        console.log("club not removed, err: ", err);
        res.status(500).json(false);
      })
    })
    .catch(err => {
      console.log("error to delete manager: ", err);
      res.status(500).json(false);
    })

});

router.post('/deleteManagerWithoutClub', (req, res, next) => {
  const managerId = req.body.managerId;

    ManagerRepository.removeManager(managerId)
    .then(result => {
      res.status(200).json(true);
    })
    .catch(err => {
      console.log("error to delete manager: ", err);
      res.status(500).json(false);
    })

});


router.post('/deleteManagerReplaceManagment', (req, res, next) => {
  const newManagerOfClubId = req.body.newManagerOfClubId;
  const managerToRemove = req.body.managerToRemove;
  const clubId = req.body.clubId;

    ManagerRepository.removeManager(managerToRemove)
    .then(result => {
      console.log(result);
     ManagerRepository.findManagerById(newManagerOfClubId)
     .then(manager => {
       manager.clubId = clubId;
       ManagerRepository.updateManager(manager.id, manager)
       .then(updatedManager => {
         if(updatedManager){
           res.status(200).json(true);
         }
         else{
          res.status(500).json(false);
         }
       })
       .catch( err => {
         console.log("error from deleteManagerReplaceManagment->updateManager ", err)
        res.status(500).json(false);
       })
     })
     .catch(err => {
      console.log("error from deleteManagerReplaceManagmen->findManagerById ", err)
      res.status(500).json(false);
     })
    })
    .catch(err => {
      console.log("error to delete manager: ", err);
      res.status(500).json(false);
    })

});


router.post('/addManager', (req, res, next) => {
    const newManager = req.body.newManager;
    
    console.log("newManager:", newManager);

    SuperManagerRepository.createManager(newManager)
    .then(manager => {
      if(manager){
        console.log("from api: manager created");
        res.status(200).json(true);
      }
      else {
        res.status(500).json(false);
      }
    })
    .catch(err => {
      console.log("error from create manager", err);
      res.status(500).json(false);
    })
  });

//add club and update manager
  router.post('/addClub', (req, res, next) => {
    const newClub = req.body.newClub;
    const managerId = req.body.managerId;

    //newClub.openingHours[0] = DateTimeHelper.calculateOpeningHours(newClub.openingHours[0]);
    //newClub.openingHours[1] = DateTimeHelper.calculateOpeningHours(newClub.openingHours[1]);

    console.log("new clubafter convert time:", newClub);

    SuperManagerRepository.createClub(newClub)
    .then(club => {
      if(club){
        console.log("from api: club created");
       ManagerRepository.findManagerById(managerId)
       .then(manager => {
         manager.clubId = club._id;
         ManagerRepository.updateManager(manager.id, manager)
         .then(updatedManager => {
          res.status(200).json(true);
         })
         .catch(err => {
           console.log("error form update manager: ", err);
           res.status(500).json(false);
         });
       })
       .catch(err => {
        console.log("error form find manager: ", err);
        res.status(500).json(false);
       });
      }
      else {
        res.status(500).json(false);
      }
    })
    .catch(err => {
      console.log("error from create newClub:");
      console.log(err);
      res.status(500).json(false);
    });
  });


export default router;
