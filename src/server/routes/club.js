import express from 'express';
import mongoose from 'mongoose';
import Customer from '../.././models/user-model';
import Club from '../.././models/club-model';
import UserClub from '../.././models/user-club-model';
import CustomerRepository from '../.././database/repositories/customer.repository';
import ClubRepository from '../.././database/repositories/club.repository';
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



export default router;