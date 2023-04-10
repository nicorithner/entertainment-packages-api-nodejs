const db = require("../db/models");
const Show = db.show;
const Network = db.network;
const Package = db.package;
const PackageNetwork = db.packageNetwork;
const Op = db.Sequelize.Op;

// Create and Save a new Show
exports.create = (req, res) => {
  if (!req.body.title || !req.body.imdb_rating) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  const show = {
    title: req.body.title,
    imdb_rating: req.body.imdb_rating,
    NetworkId: req.body.NetworkId,
  };

  Show.create(show)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Something went wrong while creating show ${data.name}`,
      });
    });
};

// Retrieve all Shows from the database.
exports.findAll = async (req, res) => {
  let query_network_id = req.query.network_id || null;
  let package_id = req.query.package_id || null;

  console.log("network_id: ", query_network_id);
  console.log("packageId: ", package_id);

  switch (true) {
    case query_network_id != null:
      Show.findAll({
        where: { NetworkId: query_network_id },
        truncate: false,
      })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Something went wrong while retrieving shows",
          });
        });
      break;

    case package_id != null:
      // Goal: Get shows filtered by package
      // package has many networks and networks have shows
      // packages are linked to networks via packageNetwork.
      // -----------------------
      // 1. get networks associated to the given package id.
      // const networks = await Network.findAll({
      //   include: {
      //     model: PackageNetwork,
      //     include: Package,
      //     where: {
      //       // PackageNetwork.package_id = package_id
      //       PackageId: package_id
      //     },
      //   },
      // });
      console.log('shows: ', JSON.stringify(networks, null, 2));
      // -----------------------
      // 2. get shows for those networks
      Show.findAll({ where: {}, turncate: false })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Something went wrong while retrieving shows",
          });
        });

      break;
    default:
      Show.findAll({ where: {}, truncate: false })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Something went wrong while retrieving shows",
          });
        });
      break;
  }
};

// Find a single Show with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Show.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find show with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Something went wrong while retrieving show with id=${id}`,
      });
    });
};

// Update a Show by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Show.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Show was updated successfully.",
        });
      } else {
        res.send({
          message: `Couldn't update show with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Something went wrong while updating show with id=${id}`,
      });
    });
};

// Delete a Show with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Show.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Show was deleted successfully!",
        });
      } else {
        res.send({
          message: `Couldn't delete show with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Couldn't detele show with id=${id}`,
      });
    });
};

// Delete all Shows from the database.
exports.deleteAll = (req, res) => {
  Show.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Shows were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all shows.",
      });
    });
};
