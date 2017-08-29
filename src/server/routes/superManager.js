import express from 'express';
import SuperManagerRepository from '../.././database/repositories/super.manager.repository';
import ManagerRepository from '../.././database/repositories/manager.repository';
import ClubRepository from '../.././database/repositories/club.repository';
import DateTimeHelper from '../.././helpers/datetime.functions';


const router = express.Router();


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
      console.log("error from create manager");
      res.status(500).json(false);
    })
  });

//add club and update manager
  router.post('/addClub', (req, res, next) => {
    const newClub = req.body.newClub;
    const managerId = req.body.managerId;

    newClub.openingHours[0] = DateTimeHelper.calculateOpeningHours(newClub.openingHours[0]);
    newClub.openingHours[1] = DateTimeHelper.calculateOpeningHours(newClub.openingHours[1]);

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
