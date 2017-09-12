import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { ClubSchema } from './club-model';
import { ClubManuallySchema } from './club-manually-model';

const ReceiptSchema = new Schema({
    isManual : Boolean,
    clubId: mongoose.Schema.Types.Mixed,
    img : String
    
});

export {ReceiptSchema};
export default mongoose.model('Receipt', ReceiptSchema);