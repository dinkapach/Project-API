import mongoose from 'mongoose';
import Crypto from '../services/crypto.service';
import { ClubSchema } from './club-model';
import ClubModel from './club-model';
import { CreditSchema } from './credit-model';
import { ReceiptSchema } from './receipt-model';
import CustomerSchemaValidator from './validations/user-schema-validations';

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    id: Number,
    userName:String,
    firstName: String,
    lastName: String,
    password: String,
    address: String,
    email: String,
    age: Number,
    phoneNumber: String,
    img : String,
    birthday: String,
    clubs: [{type : mongoose.Schema.Types.ObjectId, ref : 'Club'}],
    credits: [CreditSchema],
    receipts: [ReceiptSchema]}
    );

CustomerSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password'))
        return next();

    Crypto.encrypt(user.password).then((value) => {
        user.password = value;
        next();
    });
});

CustomerSchema.index({id: 1});
CustomerSchemaValidator.runCustomerValidations(CustomerSchema);

export { CustomerSchema };
export default mongoose.model('Customer', CustomerSchema);
