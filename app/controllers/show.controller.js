const db = require("../db/models");
const Show = db.Show;
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
exports.findAll = (req, res) => {
  Show.findAll({
    where: {},
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
        message:
          err.message || "Some error occurred while removing all shows.",
      });
    });
};
