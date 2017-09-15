import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CreditSchema = new Schema({
    id: Number,
    clubId: Number,
    dateOfPurchase: Date,
    dateOfExpired: Date,
    items: [String],
    totalCredit: Number,
    img : String
});

export {CreditSchema};
export default mongoose.model('Credit', CreditSchema);