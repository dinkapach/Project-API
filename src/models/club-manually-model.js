import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClubManuallySchema = new Schema({
    id: Number,
    name:String,
    address: String,
    phoneNumber: String,
    img : String,
    points: Number
},    
    );

export { ClubManuallySchema };
export default mongoose.model('ClubManually', ClubManuallySchema);