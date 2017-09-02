import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { ClubSchema } from './club-model';
import { ClubManuallySchema } from './club-manually-model';

const ReceiptSchema = new Schema({
    isManual : Boolean,
    clubId: mongoose.Schema.Types.Mixed,
    //clubManually: mongoose.Schema.Types.Mixed,
    img : String
    

    // id: Number,
    // clubID: Number, 
    // dateOfPurchase: Date,
    // items: [String],
    // totalCredit: Number
});

export {ReceiptSchema};
export default mongoose.model('Receipt', ReceiptSchema);