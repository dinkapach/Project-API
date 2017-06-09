import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReceiptSchema = new Schema({
    id: Number,
    clubID: Number, 
    dateOfPurchase: Date,
    items: [String],
    totalCredit: Number
});

export {ReceiptSchema};
export default mongoose.model('Receipt', ReceiptSchema);