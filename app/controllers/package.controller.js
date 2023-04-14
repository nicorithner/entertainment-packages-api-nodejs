const db = require("../db/models");
const Package = db.package;
const Network = db.network;

// Create and Save a new Package
exports.create = async (req, res) => {
  if (!req.body.name || !req.body.price) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  const package = {
    name: req.body.name,
    price: req.body.price,
  };

  try {
    const newPackage = await Package.create(package);
    res.send(newPackage);
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        `Something went wrong while creating package ${package.name}`,
    });
  }
};

// Retrieve all Packages from the database.
exports.findAll = async (req, res) => {
  try {
    const packages = await Package.findAll({
      where: {},
      truncate: false,
    });
    res.send(packages);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Something went wrong while retrieving packages",
    });
  }
};

// Find a single Package with an id. Includes networks
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const package = await Package.findOne({
      where: { id: id },
      include: Network,
    });

    if (!package) {
      throw new Error(`Couldn't find package id ${id}`);
    }

    res.send(package);
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        `Something went wrong while retrieving package with id=${id}`,
    });
  }
};

// Update a Package by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  const num = await Package.update(req.body, {
    where: { id: id },
  });

  try {
    Package.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Package was updated successfully.",
      });
    } else {
      res.send({
        message: `Couldn't update package with id=${id}`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        `Something went wrong while updating package with id=${id}`,
    });
  }
};

// Delete a Package with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  const num = await Package.destroy({
    where: { id: id },
  });
  try {
    if (num == 1) {
      res.send({
        message: "Package was deleted successfully!",
      });
    } else {
      res.send({
        message: `Couldn't delete package with id=${id}`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || `Couldn't detele package with id=${id}`,
    });
  }
};

// Delete all Packages from the database.
exports.deleteAll = async (req, res) => {
  try {
    const nums = await Package.destroy({
      where: {},
      truncate: false,
    });
    res.send({ message: `${nums} Packages were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all packages.",
    });
  }
};
