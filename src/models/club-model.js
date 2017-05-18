import mongoose from 'mongoose';
import { UserClubSchema } from './user-club-model';
import { SaleSchema } from './sale-model';
import ClubModelValidator from './validations/club-model-schema-validations';

const Schema = mongoose.Schema;

const ClubSchema = new Schema({
    id: Number,
    name: String,
    address: String,
    phoneNumber: String,
    img: String,
    openingHours: [Date, Date],
    usersClub: [UserClubSchema],
    sales: [SaleSchema],
    branches: [mongoose.Schema.Types.ObjectId]
});

const ClubsApiSchema = new Schema({
    clubId : mongoose.Schema.Types.ObjectId,
    endpoint: String,  // url
});

//const ClubModel = mongoose.model('Club', ClubSchema);
//const ClubsApiModel = mongoose.model('ClubsApi', ClubsApiSchema);

ClubModelValidator.runClubModelValidations(ClubSchema); 
 export { ClubSchema, ClubsApiSchema };
 export default mongoose.model('Club', ClubSchema);


// export {
//     ClubSchema,
//     ClubsApiModel,
//     ClubModel
// }