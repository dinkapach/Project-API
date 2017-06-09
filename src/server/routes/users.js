import express from 'express';
import Customer from '../.././models/user-model';
import Credit from '../.././models/credit-model';
import CustomerRepository from '../.././database/repositories/customer.repository';

const router = express.Router();

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  
  const id = req.params.id;
  CustomerRepository.findCustomerById(id)
  .then(customer => {
    if(customer) {
      res.status(200).json(customer);
    }
    else { 
      console.log("user not found");
      res.status(200).json({customer: customer});
    }
  })
  .catch(err => { 
    console.log(err); 
    res.status(500).end();
  });

});

router.post('/update', (req, res, next) => {
  const customerUpdate = req.body.customerUpdate;
  const customerId = req.body.customerId;
  console.log(customerId, customerUpdate);
  res.status(200).json(true);
  // CustomerRepository.updateCustomer(customerId, customerUpdate)
  // .then(customerUpdated => {
  //   console.log("return from updateCustomer:\n" + customerUpdated);
  //   res.status(200).json(customerUpdated);
  // })
  // .catch(err => {
  //   console.log('Customer was not updated', err);
  //   res.status(500).json(false);
  // });
});

router.post('/addCredit', (req, res, next) => {
  const userId = req.body.userId;
  // const clubId = req.body.clubId;
  // const totalPrice = req.body.totalPrice;
  // const numOfItems = req.body.numOfItems;
  var credit = new Credit();
  credit.id = 3;
  credit.dateOfPurchase = "1/1/16";
  credit.dateOfExpired = "1/2/16";
  credit.items = [];
  credit.totalCredit = 12;

  console.log(credit);
  // res.status(200).json(true);
  CustomerRepository.addCustomerCredit(userId)
  .then(userUpdated => {
    res.status(200).json(true);
  })
  .catch(err => {
    console.log('credit was not updated', err);
    res.status(500).json(false);
  });
});

export default router;
