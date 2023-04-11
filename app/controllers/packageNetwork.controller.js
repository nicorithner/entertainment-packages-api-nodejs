const db = require("../db/models");
const PackageNetwork = db.packageNetwork;
const Op = db.Sequelize.Op;
// Create and Save a new Package
exports.create = (req, res) => {
  if (!req.body.NetworkId && !req.body.PackageId) {
    res.status(400).send({
      message: "Must include a network and a package id",
    });
    return;
  }
  const package_network = {
    NetworkId: req.body.NetworkId,
    PackageId: req.body.PackageId,
  };

  PackageNetwork.create(package_network)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Something went wrong while creating packageNetwork ${data.name}`,
      });
    });
};

// Retrieve all Packages from the database.
exports.findAll = (req, res) => {
  PackageNetwork.findAll({
    where: {},
    truncate: false,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while retrieving packageNetworks",
      });
    });
};

// Find a single Package with an id. Includes networks
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const package_network = await PackageNetwork.findOne({
      where: { id: id }
    });

    if (!package_network) {
      throw new Error(`Couldn't find packageNetwork id ${id}`);
    }

    res.send(package_network);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Something went wrong while retrieving packageNetwork with id=${id}`,
    });
  }
};

// Update a Package by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  PackageNetwork.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PackageNetwork was updated successfully.",
        });
      } else {
        res.send({
          message: `Couldn't update packageNetwork with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Something went wrong while updating packageNetwork with id=${id}`,
      });
    });
};

// Delete a Package with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PackageNetwork.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PackageNetwork was deleted successfully!",
        });
      } else {
        res.send({
          message: `Couldn't delete packageNetwork with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Couldn't detele packageNetwork with id=${id}`,
      });
    });
};

// Delete all Packages from the database.
exports.deleteAll = (req, res) => {
  PackageNetwork.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} PackageNetwork were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all packageNetwork.",
      });
    });
};
