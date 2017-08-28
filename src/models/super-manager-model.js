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
    console.log("on pre save customer schema");
    let passwordModified = superManager.isModified('password');
    console.log("pass modified: "+passwordModified);
    if (!passwordModified)
        return next();

    Crypto.encrypt(superManager.password).then((value) => {
        superManager.password = value;
        next();
    });
});


export { SuperManagerSchema };
export default mongoose.model('SuperManager', SuperManagerSchema);
