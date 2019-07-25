const db = require("../../models");

module.exports = {
  findSavedWorkOuts: function(req, res) {
    db.WorkOut.find({ name: { $ne: null } })
      .sort({ name: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findAllWorkOuts: function(req, res) {
    db.WorkOut.find()
      .sort({ date: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findWorkoutById: function(req, res) {
    db.WorkOut.findById(req.params.id)
      .then(dbData => {
        res.json(dbData);
      })
      .catch(err => {
        console.log(err + "I am findworkoutsbyid");
      });
  },

  findWorkOutsByDate: function(req, res) {
    db.WorkOut.find({ date: req.params.date, user: req.params.id }).then(
      workOutData => res.json(workOutData)
    );
  },

  addExercise: function(req, res) {
    db.WorkOut.update({ date: req.body.date }, req.body, { upsert: true });
  },

  saveWorkOut: function(req, res) {
    if (req.body.name) {
      db.WorkOut.updateOne(
        { name: req.body.name, user: req.body.user },
        { $set: { name: null } }
      ).then(result => {
        console.log(result);
        db.WorkOut.updateOne(
          { date: req.body.date, user: req.body.user },
          { $set: req.body },
          { upsert: true, runValidators: true }
        )
          .then(dbData => {
            res.json(dbData);
          })
          .catch(err => {
            console.log(err);
            res.send(err);
          });
      });
    } else {
      db.WorkOut.updateOne(
        { date: req.body.date, user: req.body.user },
        { $set: req.body },
        { upsert: true, runValidators: true }
      )
        .then(dbData => {
          res.json(dbData);
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        });
    }
  }
};
