import express from 'express';
import Manager from '../.././models/manager-model';
import ManagerRepository from '../.././database/repositories/manager.repository';
import Sale from '../.././models/sale-model';


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
   console.log("7777777777777777777");
  const customerId = req.body.customerId;
  const clubId = req.body.clubId;
  const numOfPoints = req.body.numOfPoints;
 
   ManagerRepository.addPointsToCustomerById(customerId, clubId,numOfPoints )
  .then(pointsUpdated => {
    console.log("blue");
    res.status(200).json(true);
  })
  .catch(err => {
    console.log('User was not updated', err);
    res.status(500).json(false);
  });
})
export default router;
