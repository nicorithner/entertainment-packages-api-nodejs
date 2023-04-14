const db = require("../db/models");
const Network = db.Network;
const Op = db.Sequelize.Op;

// Create and Save a new Network
exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  const network = {
    name: req.body.name,
  };

  try {
    const newNetwork = await Network.create(network);
    res.send(newNetwork);
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        `Something went wrong while creating network ${data.name}`,
    });
  }
};

// Retrieve all Networks from the database.
exports.findAll = async (req, res) => {
  try {
    const networks = await Network.findAll({
      where: {},
      truncate: false,
    });
    res.send(networks);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Something went wrong while retrieving networks",
    });
  }
};

// Find a single Network with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const package = await Network.findByPk(id);
    if (package) {
      res.send(package);
    } else {
      res.status(404).send({
        message: `Cannot find network with id=${id}`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        `Something went wrong while retrieving network with id=${id}`,
    });
  }
};

// Update a Network by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Network.update(req.body, {
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "Network was updated successfully.",
      });
    } else {
      res.send({
        message: `Couldn't update network with id=${id}`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        `Something went wrong while updating network with id=${id}`,
    });
  }
};

// Delete a Network with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Network.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Network was deleted successfully!",
      });
    } else {
      res.send({
        message: `Couldn't delete network with id=${id}`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || `Couldn't detele network with id=${id}`,
    });
  }
};

// Delete all Networks from the database.
exports.deleteAll = async (_req, res) => {
  try {
    const nums = await Network.destroy({
      where: {},
      truncate: false,
    });
    res.send({ message: `${nums} Networks were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all networks.",
    });
  }
};
