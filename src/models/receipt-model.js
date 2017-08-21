import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReceiptSchema = new Schema({
    isManually : Boolean,
    clubId: {type : mongoose.Schema.Types.ObjectId, ref : 'Club'},
    clubManuallyID: {type : mongoose.Schema.Types.ObjectId, ref : 'ClubManually'},
    img : String
    
    // id: Number,
    // clubID: Number, 
    // dateOfPurchase: Date,
    // items: [String],
    // totalCredit: Number
});

export {ReceiptSchema};
export default mongoose.model('Receipt', ReceiptSchema);