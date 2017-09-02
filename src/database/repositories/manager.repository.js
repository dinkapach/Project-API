import ManagerModel from '../../models/manager-model';
import ClubModel from '../../models/club-model';
import CustomerModel from '../../models/user-model';
import ClubRepository from '../.././database/repositories/club.repository';

export default {
    addManager(manager) {
        manager.save();
    },
    removeManager(managerId) {
        return new Promise((resolve, reject) => {
            ManagerModel.findOneAndRemove({ id : managerId }, (err, obj) => {
            if (err){
                console.log("Error in remove manager");
                reject(err);
            }
            resolve(obj);
            });
        });
    },
    findManagerById(id) {
        return new Promise((resolve, reject) => {
            ManagerModel.findOne({ id: id }, (err, manager) => {
                if (err) reject(err);
                else resolve(manager);
            });
        });
    },
    findManagerByEmail(email) {
      
        return new Promise((resolve, reject) => {
            ManagerModel.findOne({ email: email }, (err, manager) => {
                if (err) reject(err);
                else resolve(manager);
                    
            });
        });
    
    },
    updateManager(managerId, managerUpdate) {
        return new Promise((resolve, reject) => {
            ManagerModel.findOneAndUpdate({ id : managerId }, managerUpdate, { upsert: true, new: true }, (err, obj) => {
            if (err){
                console.log("Error in update manager");
                reject(err);
            }
            resolve(obj);
            });
        });
    },
    getAllManagers() {
        return new Promise((resolve, reject) => {
            ManagerModel.find({}, (err, clubs) => {
                if(err) reject(err);
                else resolve(clubs);
            });
        });
    },
    removeClubFromUaerClubsByClubId(customer, clubId){
        return new Promise((resolve, reject) => {
            customer.clubs = customer.clubs.filter(club =>{
                return club.id != clubId;
            })
            CustomerModel.findOneAndUpdate({ id : customer.id }, customer, { upsert: true, new: true }, (err, obj) => {
                if (err){
                    console.log(err);
                    reject(err);
                }
                resolve(obj);
                });
            });
            
    },
    addClub(manager, clubId) {
        manager.clubs.push(clubId);
        manager.save();
    },
    removeClubById(manager, clubId) {
        var index;
        var i = 0;

        manager.clubs.forEach(function (id) {
            if (clubId == id)
                index = i;
            i++;
        }, this);

        manager.clubs.splice(index, 1);
        manager.save();
        //TODO : delete this club also
    },
    addSale(clubId, sale) {
        return ClubRepository.findClubByObjectId(clubId)
            .then(club => {
                console.log ('manager repository add sale ');
                club.sales.push(sale);
                club.save();
            })
            .catch(err => {
                console.log(err);
            })
    },
    removeSale(clubId, sale) {
        return ClubModel.findClubById(clubId)
            .then(club => {
                club.sales.pop(sale);
                club.save();
            })
            .catch(err => {
                console.log(err);
            })
    },

    editClubSale(clubId, saleUpdate) {

        return new Promise((resolve, reject) => {
            ClubModel.update({_id: clubId, 'sales._id': saleUpdate._id},
            {$set: { "sales.$": saleUpdate }})
            .then(sale => resolve(sale))
            .catch(err => reject(err));
        });
    },
      findClub(customer, clubId, prop)
     {
         return customer[prop].find(club=>club.id == clubId);
     },
      getIndexOfClub(customer, clubId, prop)
     {
        let index =0;
        let i = 0;
        customer[prop].forEach(function(club) {
            if(club.id == clubId)
                index = i;
            i++;
        });
        return index; 
     },
      findCustomerById(customerId) {

        return new Promise((resolve, reject) => {
            CustomerModel.findOne({id : customerId}).populate('clubs')
            .then(customer => resolve(customer))
            .catch(err => reject(err));
        });
    },

removeClubByClubId(customerId, clubId, prop){
   this.findCustomerById(customerId)
        .then(customer => {
            if(customer)
            {
                let i = this.getIndexOfClub(customer, clubId, prop);
                let club = this.findClub(customer, clubId, prop)
                if(club){
                    let index = club.items.indexOf(oldItem);
                    customer[prop][i].items.splice(index, 1);
                    customer.save();
                }
                else{ console.log("customer repository - remove club by clubid - club wasnt found"); }
            }
            else { console.log("customer repository - remove club by clubid  -Customer not found"); }
        })
        .catch(err => { console.log(err); });
},
    addPointsToCustomerById(customerId, clubId, numOfPoints) {
        
        return ClubModel.findClubById(clubId)
            .then(club => {
                if (club) {
                    club.usersClub.forEach(function (userClub) {
                        CustomerModel.findCustomerById(customerId)
                            .then(customer => {
                                if (customer) {
                                    if (customer._id.equals(userClub.customerId)) {
                                        userClub.points = parseInt(userClub.points) + parseInt(numOfPoints);
                                        console.log("points: ", userClub.points);
                                        club.save();
                                    }
                                  
                                }
                                else {
                                    console.log("customer not found");
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });


                    })
                }
                else {
                    console.log("no clubs");
                }
            })
            .catch(err => {
                console.log(err);
            })
    },
    subscribePointsToCustomerById(customerId, clubId, numOfPoints)  {
        
        return ClubModel.findClubById(clubId)
            .then(club => {
                if (club) {

                    club.usersClub.forEach(function (userClub) {
                        CustomerModel.findCustomerById(customerId)
                            .then(customer => {
                                if (customer) {
                                    if (customer._id.equals(userClub.customerId)) {
                                        if (parseInt(userClub.points) < parseInt(numOfPoints)){
                                            console.log("customer not have enough points");
                                        }
                                        else {
                                            userClub.points = parseInt(userClub.points) - parseInt(numOfPoints);
                                            console.log("points after suscribe: ", userClub.points);
                                            club.save();
                                        }
                                    }
                                  
                                }
                                else {
                                    console.log("customer not found");
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });


                    })
                }
                else {
                    console.log("no clubs");
                }
            })
            .catch(err => {
                console.log(err);
            })
    },
    addBranchToClub(clubId, branchId) {
        ClubModel.findClubById(clubId)
            .then(club => {
                club.branches.push(branchId);
                club.save();
            })
            .catch(err => {
                console.log(err);
            })
    },
    findCustomerDetalisById(customerId) {
        return new Promise((resolve, reject) => {
            CustomerModel.find({_id : customerId})
            .populate('customer')
            .then(customer => resolve(customer))
            .catch(err => reject(err));
        });
    },
    findCustomers(clubId) {
        return new Promise((resolve, reject) => {
            console.log("clubId: in repo: " + clubId);
            ClubModel.findOne({id : clubId})
            .populate({path: 'usersClub', model: 'Customer', })
            .then(customer => resolve(customer))
            .catch(err => reject(err));
        });
    },

    removeBranchFromClub(clubId, branchId) {
        ClubModel.findClubById(clubId)
            .then(club => {
                club.UsersClub.findOne({ ObjectId: branchId }, (err, branch) => {
                    if (err) {
                        console.log("Branch doesn't exist");
                    }
                    else {
                        club.branches.pop(branch);
                        club.save();
                        console.log("branch removed");
                    }
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
}