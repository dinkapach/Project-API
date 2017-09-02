import CustomerRepository from './../database/repositories/customer.repository';

export default {
    
    findBirthday() {
        console.log("on findBirthday");
        CustomerRepository.findBirthdaysToday()
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }

}