const db = require("../db/models");
const Network = db.Network;
const Op = db.Sequelize.Op;

// Create and Save a new Network
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  const network = {
    name: req.body.name,
  };

  Network.create(network)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Something went wrong while creating network ${data.name}`,
      });
    });
};

// Retrieve all Networks from the database.
exports.findAll = (req, res) => {
  Network.findAll({
    where: {},
    truncate: false,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while retrieving networks",
      });
    });
};

// Find a single Network with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Network.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find network with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Something went wrong while retrieving network with id=${id}`,
      });
    });
};

// Update a Network by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Network.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Network was updated successfully.",
        });
      } else {
        res.send({
          message: `Couldn't update network with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Something went wrong while updating network with id=${id}`,
      });
    });
};

// Delete a Network with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Network.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Network was deleted successfully!",
        });
      } else {
        res.send({
          message: `Couldn't delete network with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Couldn't detele network with id=${id}`,
      });
    });
};

// Delete all Networks from the database.
exports.deleteAll = (req, res) => {
  Network.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Networks were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all networks.",
      });
    });
};
