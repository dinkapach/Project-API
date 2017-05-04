import ManagerModel from '../../models/manager-model';
import clubModel from './club.repository';


export default {
    addManager(manager) {
        manager.save();
    },
    removeManager(manager){
        manager.remove();
    },
    findManagerById(id) {
        return new Promise((resolve, reject) => {
            ManagerModel.findOne({id: id}, (err, manager) => {
                if (err) reject(err);
                else resolve(manager);
            });
        });
    },
    findManagerByEmail(email) {
        return new Promise((resolve, reject) => {
            ManagerModel.findOne({email: email}, (err, manager) => {
                if(err) reject(err);
                else resolve(manager);
            });
        });
    },
    addClub(manager, clubId){
        manager.clubs.push(clubId);
        manager.save();
    },
    removeClubById(manager, clubId){
        var index;
        var i =0;
        
        manager.clubs.forEach(function(id) {
            if(clubId == id )
                index = i;
            i++;
        }, this);

        manager.clubs.splice(index, 1);
        manager.save();
        //TODO : delete this club also
    },
     addSale(clubId, sale){
        return clubModel.findClubById(clubId)
        .then(club => {
             club.sales.push(sale);          
             club.save();    
             })
        .catch(err => {
            console.log(err);  
        })
    },
    removeSale(clubId, sale){
       return clubModel.findClubById(clubId)
        .then(club => {
             club.sales.pop(sale);
             club.save();
         })
        .catch(err => {
        console.log(err);  
        })
    },
    addPointsToCustomerById(customerId, clubId, numOfPoints){
        clubModel.findClubById(clubId)
        .then(club =>{
                club.UsersClub.findOne({customerId: customerId}, (err, customer) => {
                if(err){
                    console.log("CustomerId not found");
                }
                else{
                    customer.Points += numOfPoints;
                    console.log("adding points to costumer!");
                }
            });
        })
        .catch(err => {
        console.log(err);  
        })
    },
    subscribePointsToCustomerById(customerId, club, numOfPoints){
        clubModel.findClubById(clubId)
        .then(club =>{
                club.UsersClub.findOne({customerId: customerId}, (err, customer) => {
                if(err){
                    console.log("CustomerId not found");
                }
                else{
                    customer.Points -= numOfPoints;
                    console.log("addsubscribei points to costumer!");
                }
            });
        })
        .catch(err => {
        console.log(err);  
        })
    },
    addBranchToClub(clubId, branchId){
        clubModel.findClubById(clubId)
        .then(club =>{
            club.branches.push(branchId);
            club.save();
        })
        .catch(err =>{
            console.log(err);
        })
    },
    removeBranchFromClub(clubId, branchId){
        clubModel.findClubById(clubId)
        .then(club =>{
            club.UsersClub.findOne({ObjectId: branchId}, (err, branch) => {
                if(err){
                    console.log("Branch doesn't exist");
                }
                else{
                    club.branches.pop(branch);
                    club.save();
                    console.log("branch removed");
                }
             });
        })
        .catch(err =>{
            console.log(err);
        })
    }
}
