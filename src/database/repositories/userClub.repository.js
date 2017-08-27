import UserClubModel from '../../models/user-club-model';

export default {
    addUserClub(userClub){
        return UserClubModel.create(userClub);
    },

    deleteUserClub(userClub){
        return new Promise((resolve, reject) => {
        UserClubModel.
        findOneAndUpdate({ id : userClubId }, userClubUpdated, { upsert: true, new: true }, (err, obj) => {
          if (err){
            console.log(err);
            reject(err);
        }
        resolve(obj);
        });
      });
    },
    updateUserClub(userClubId, userClubUpdated) {
        return new Promise((resolve, reject) => {
            UserClubModel.findOneAndUpdate({ id : userClubId }, userClubUpdated, { upsert: true, new: true }, (err, obj) => {
            if (err){
                console.log(err);
                reject(err);
            }
            resolve(obj);
            });
        });
    },
}
