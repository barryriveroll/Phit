const db = require("../models");
const ObjectId = require("mongodb").ObjectID;

module.exports = {
  createUser: function(req, res) {
    db.User.create(req.body)
      .then(userData => res.json(userData))
      .catch(err => res.json(err));
  },

  findUser: function(req, res) {
    db.User.findOne({ email: req.params.email })
      .then(dbData => res.json(dbData))
      .catch(err => console.log(err));
  },
  pushWorkOut: function(req, res) {
    db.User.findByIdAndUpdate(req.body.userId, {
      $push: { workouts: req.body.id }
    })
      .then(data => res.json(data))
      .catch(err => console.log(err));
  },
  findUserWorkOuts: function(req, res) {
    if (req.params.id !== "null") {
      db.User.find({ _id: ObjectId(req.params.id) })
        .populate("workouts")
        .then(data => res.json(data))
        .catch(err => console.log(err));
    }
  },
  findWorkOutsByWeek: function(req, res) {
    let { week, name, user, type } = req.params;
    week = parseInt(week);
    type === "resistance"
      ? db.WorkOut.aggregate([
          { $unwind: "$resistance" },
          {
            $match: {
              $and: [
                { "resistance.name": name },
                { week: week },
                { user: user }
              ]
            }
          }
        ]).then(workOutData => res.json(workOutData))
      : db.WorkOut.aggregate([
          { $unwind: "$cardio" },
          {
            $match: {
              $and: [{ "cardio.name": name }, { week: week }, { user: user }]
            }
          }
        ]).then(workOutData => res.json(workOutData));
  },

  findWorkOutsByMonth: function(req, res) {
    let { month, name, user, type } = req.params;
    month = parseInt(month);
    type === "resistance"
      ? db.WorkOut.aggregate([
          { $unwind: "$resistance" },
          {
            $match: {
              $and: [{ "resistance.name": name }, { month }, { user }]
            }
          }
        ]).then(workOutData => res.json(workOutData))
      : db.WorkOut.aggregate([
          { $unwind: "$cardio" },
          {
            $match: {
              $and: [{ "cardio.name": name }, { month }, { user }]
            }
          }
        ]).then(workOutData => res.json(workOutData));
  },

  updateSettings: function(req, res) {
    db.User.findByIdAndUpdate(req.body.id, {
      $set: {
        [req.body.setting]: req.body.settingValue
      }
    })
      .then(data => res.json(data))
      .catch(err => console.log(err));
  },

  uploadPicture: function(req, res) {
    db.User.findByIdAndUpdate(req.body.id, {
      picture: req.body.photo
    }).catch(err => console.log(err));
  },

  findProfile: function(req, res) {
    db.User.find({ username: req.params.username })
      .then(user => {
        res.json(user);
      })
      .catch(err => console.log(err));
  },

  updateProfileAbout: function(req, res) {
    db.User.findByIdAndUpdate(req.body.id, req.body.updateProfile)
      .then(data => {
        res.json({ "🙄": "Stop looking for this 😤" });
      })
      .catch(err => console.log(err));
  }
};
