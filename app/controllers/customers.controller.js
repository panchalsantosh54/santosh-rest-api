const customers = require("../models/customers.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: "Customers email can not be empty",
    });
  }

  // Create a Customer
  const customer = new customers({
    // name: req.body.name || "Untitled Customer",
    name: req.body.name,
    email: req.body.email,
    city: req.body.city
  });

  // Save Customers in the database
  customer
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the customer.",
      });
    });
};

// Retrieve and return all Customers from the database.
exports.findAll = (req, res) => {
  
    //const customer = new customers();

    customers.find()
    .then((customer) => {
      //  customer.email  = customer.email.toLowerCase();
      res.send(customer);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving customer.",
      });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {

    const customer = new customers();
    customer = customers.findById(req.params.customerId);
    // customer.email  = customer.email.toLowerCase();
      if (!customer) {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.customerId,
        });
      }
      res.send(customer);

  customers.findById(req.params.customerId)
    .then((customer) => {

        // customer.email  = customer.email.toLowerCase();
      if (!customer) {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.customerId,
        });
      }
      res.send(customer);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.customerId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving customer with id " + req.params.customerId,
      });
    });
};

// Update a customer identified by the CustomerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.email) {
    return res.status(400).send({
      message: "Customer email can not be empty",
    });
  }
  // Find customer and update it with the request body
  customers.findByIdAndUpdate(
    req.params.customerId,
    {
    //   name: req.body.name || "Untitled Customer",
      name: req.body.name, 
      email: req.body.email,
      city: req.body.city
    },
    { new: true }
  )
    .then((customer) => {
      if (!customer) {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.customerId,
        });
      }
      res.send(customer);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.customerId,
        });
      }
      return res.status(500).send({
        message: "Error updating customer with id " + req.params.customerId,
      });
    });
};

// Delete a customer with the specified CustomerId in the request
exports.delete = (req, res) => {
  customers.findByIdAndRemove(req.params.customerId)
    .then((customer) => {
      if (!customer) {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.customerId,
        });
      }
      res.send({ message: "Customer deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.customerId,
        });
      }
      return res.status(500).send({
        message: "Could not delete customer with id " + req.params.customerId,
      });
    });
};