import mongoose from 'mongoose';
import Crypto from '../services/crypto.service';

const Schema = mongoose.Schema;

const SuperManagerSchema = new Schema({
    id: Number,
    userName:String,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
},    
    );

SuperManagerSchema.pre('save', function(next) {
    var superManager = this;
    let passwordModified = superManager.isModified('password');
    if (!passwordModified)
        return next();

    Crypto.encrypt(superManager.password).then((value) => {
        superManager.password = value;
        next();
    });
});


export { SuperManagerSchema };
export default mongoose.model('SuperManager', SuperManagerSchema);
