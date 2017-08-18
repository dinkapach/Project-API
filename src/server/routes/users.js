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

router.post('/updateCustomerInfo', (req, res, next) => {
  const customerUpdate = req.body.customerUpdate;
  const customerId = req.body.customerId;
  console.log(customerId, customerUpdate);
  // res.status(200).json(true);
  CustomerRepository.updateCustomer(customerId, customerUpdate)
  .then(customerUpdated => {
    console.log("return from updateCustomer:\n" + customerUpdated);
    res.status(200).json(customerUpdated);
  })
  .catch(err => {
    console.log('Customer was not updated', err);
    res.status(500).json(false);
  });
});

router.post('/editCredit', (req, res, next) => {
  const creditUpdate = req.body.creditUpdate;
  const customerId = req.body.customerId;
  console.log(customerId, creditUpdate);
  // res.status(200).json(true);
  CustomerRepository.editCustomerCredit(customerId, creditUpdate)
  .then(creditUpdated => {
    console.log("return from updateCustomer:\n" + creditUpdated);
    res.status(200).json(creditUpdated);
  })
  .catch(err => {
    console.log('Credit was not updated', err);
    res.status(500).json(false);
  });
});

router.post('/addCredit', (req, res, next) => {
  const userId = req.body.userId;
  const creditObj = req.body.credit;
  var credit = new Credit();
  credit.id = creditObj.id;
  credit.clubId = creditObj.clubId;
  credit.dateOfPurchase = creditObj.dateOfPurchase;
  credit.dateOfExpired = creditObj.dateOfExpired;
  credit.items = creditObj.items;
  credit.totalCredit = creditObj.totalCredit;

  CustomerRepository.addCustomerCredit(userId, credit)
  .then(userUpdated => {
    console.log('credit was added');
    res.status(200).json(true);
  })
  .catch(err => {
    console.log('credit was not updated', err);
    res.status(500).json(false);
  });
});


router.post('/deleteCredit', (req, res, next) => {
  const userId = req.body.userId;
  const creditObj = req.body.credit;

  console.log("from server-deleteCredit - user id is: ", userId );
  
  CustomerRepository.removeCreditOrReceipt(userId, creditObj.id, "credits" )
  .then(userUpdated => {
    console.log('credit was deleted');
    res.status(200).json({isAuth: true, user: userUpdated});
  })
  .catch(err => {
    console.log('credit was not deleted', err);
    res.status(500).json(false);
  });
});


export default router;
