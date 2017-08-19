import express from 'express';
import mongoose from 'mongoose';
import Customer from '../.././models/user-model';
import CustomerRepository from '../.././database/repositories/customer.repository';

const router = express.Router();

router.get('/', (req, res, next) => {
//   res.status(200).json({response : "OK!"});
    const id = req.id;
    res.status(200).json({response : "OK!"});
});

export default router;