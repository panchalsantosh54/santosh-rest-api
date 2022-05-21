module.exports = (app) => 
{
    const customers = require('../controllers/customers.controller.js');

    // Create a new customer
    app.post('/customers', customers.create);

    // retrive all customer
    app.get('/customers', customers.findAll);

    // retrive a single customer with customer id
    app.get('/customers/:customerId', customers.findOne);

    // update customer with CustomerId
    app.put('/customers/:customerId', customers.update);

    // select customer with customerId
    app.delete('/customers/:customerId', customers.delete);

}
