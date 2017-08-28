import express from 'express';
import SuperManagerRepository from '../.././database/repositories/super.manager.repository';

const router = express.Router();

router.post('/', (req, res, next) => {
//     const password = req.body.password;
//     const email = req.body.email;
//     console.log("email: " + email + "pass: " + password);
//     CustomerRepository.findCustomerByEmail(email)
//     .then(customer => {
//       console.log(customer);
//       if(customer){
//         Crypto.isMatch(password, customer.password)
//         .then(match => {
//           console.log(match);
//             if(match) {
//                 console.log("customer logged in");
//                 res.status(200).json(customer);
//             } 
//             else { 
//               res.status(400).json("wrong password");
//               console.log("wrong password"); 
//             }
//         })
//         .catch(err => { 
//           console.log(err); 
//           res.status(500).json(err);
//         })
//       }
//       else {
//         res.status(400).json(customer);
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).end();
//    });
  });


export default router;
