import ClubModel from '../../models/club-model';
import CreditModel from '../../models/credit-model';

export default {

    addClub(club) {
        club.save();
    },
    findClubById(id) {
        return new Promise((resolve, reject) => {
            ClubModel.findOne({id: id}, (err, club) => {
                if (err) reject(err);
                else resolve(club);
            });
        });
    },
    findClubByObjectId(id) {
        return new Promise((resolve, reject) => {
            ClubModel.findOne({_id: id}, (err, club) => {
                if (err) reject(err);
                else resolve(club);
            });
        });
    },
    getAllClubs() {
        return new Promise((resolve, reject) => {
            ClubModel.find({}, (err, clubs) => {
                if(err) reject(err);
                else resolve(clubs);
            });
        });
    },
     getAllCredits() {
        return new Promise((resolve, reject) => {
            CreditModel.find({}, (err, credits) => {
                if(err) reject(err);
                else resolve(credits);
            });
        });
    },
    removeCustomerById(club, customerId){
        let index = 0;
        let i = 0;
        club.usersClub.forEach((userClub) => {
            if(userClub.customerId == customerId)
                index = i;
            i++;
        });

        club.usersClub.splice(index, 1);
        club.save();
    },
    addSale(club, sale)
    {
         club.sales.push(sale);
         club.save();
    },
    findSale(club, saleId)
    {
        return club.sales.find(sale => sale.id == saleId)
    },
    removeSale(club, saleId)
    {
        let i = 0;
        let index = 0;
        club.sales.forEach(function(sale) {
            if(sale.id == saleId)
            {
                index = i;
            }
            i++;
        });
        club.sales.splice(index, 1);
        club.save();
    },
    addPointsToClub(club, customerId, points){
         club.usersClub.forEach(function(userClub) {
                if(customerId.equals(userClub.customerId))
                {
                    userClub.points =  parseInt(userClub.Points) + parseInt(points);
                }
             });
             club.save();
   },
   RemovePointsFromClub(club, customerId, points){
         club.usersClub.forEach(function(userClub) {
                if(customerId.equals(userClub.customerId))
                {
                    userClub.points =  parseInt(userClub.points) - parseInt(points);
                }
             });
             club.save();
   },
    changeInfo(clubId, itemIndex, newItem)
    {
        this.findClubById(clubId)
        .then(club => {
            if(club)
            {
                club[itemIndex] = newItem;
                club.save();
            }
            else { console.log("club not found"); }
        })
        .catch(err => { console.log(err); });
     },
    changeSaleInfo(clubId, saleId, itemIndex, newItem)
     {
        this.findClubById(clubId)
        .then(club => {
            if(club)
            {
                let sale = this.findSale(club, saleId)
                if(sale){
                    sale[itemIndex] = newItem;
                    club.save();
                }
                else{
                    console.log("Sale wasnt found");
                }

            }
            else { console.log("Club not found"); }
        })
        .catch(err => { console.log(err); });
     },
     addBranch(clubId, branchId)
     {
         this.findClubById(clubId)
         .then(club => {
             if(club)
             {
                this.findClubById(branchId)
                .then(branch => {
                    if(branch)
                    {
                        if(club.branches.indexOf(branch._id) == -1)
                            {
                                club.branches.push(branch._id);
                                club.save();
                            }
                    }
                    else {console.log("Branch wasnt found"); }
                })
                .catch(err => { console.log(err); })
             }
             else {console.log("Club wasnt found"); }
         })
         .catch(err => { console.log(err); });
     },
     removeBranch(clubId, branchId)
     {
         this.findClubById(clubId)
         .then(club => {
             if(club)
             {
                 this.findClubById(branchId)
                 .then(branch => {
                     if(branch)
                     {
                         let index = club.branches.indexOf(branch._id);
                         club.branches.splice(index, 1);
                         club.save();
                     }
                     else { console.log("Branch wasnt found"); }
                 })
                 .catch(err => { console.log(err); })
             }
             else { console.log("Club wasnt found"); }
         })
         .catch(err => { console.log(err); });
     }
}
