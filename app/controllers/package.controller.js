const db = require("../db/models");
const Package = db.Package;
const Op = db.Sequelize.Op;

// Create and Save a new Package
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  const package = {
    name: req.body.name,
    price: req.body.price,
  };

  Package.create(package)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Something went wrong while creating package ${data.name}`,
      });
    });
};

// Retrieve all Packages from the database.
exports.findAll = (req, res) => {
  Package.findAll({
    where: {},
    truncate: false,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while retrieving packages",
      });
    });
};

// Find a single Package with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Package.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find package with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Something went wrong while retrieving package with id=${id}`,
      });
    });
};

// Update a Package by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Package.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Package was updated successfully.",
        });
      } else {
        res.send({
          message: `Couldn't update package with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Something went wrong while updating package with id=${id}`,
      });
    });
};

// Delete a Package with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Package.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Package was deleted successfully!",
        });
      } else {
        res.send({
          message: `Couldn't delete package with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Couldn't detele package with id=${id}`,
      });
    });
};

// Delete all Packages from the database.
exports.deleteAll = (req, res) => {
  Package.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Packages were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all packages.",
      });
    });
};
