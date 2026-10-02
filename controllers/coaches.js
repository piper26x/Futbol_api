let Coach = require('../models/coaches')

const controller = {
  getCoaches: function (req, res) {
    Coach.find({}).exec()
      .then(coachesList => {
        if (!coachesList) return res.status(404).send({message: "No data found"})
        return res.status(200).json(coachesList)
      })
      .catch(err => res.status(500).send({message: `Error: ${err}`}))
  },
  getCoach: function (req, res) {
    let coachId = req.params.id
    if (coachId == null) return res.status(404).send({message: "coach not found"})

    Coach.findById(coachId).exec()
      .then(data => {
        if (!data) return res.status(404).send({message: "coach not found"})
        return res.status(200).json(data)
      })
      .catch(err => res.status(500).send({message: `Internal error-> ${err}`}))
  },
  saveCoach: function (req, res) {
    let coaches = new Coach()
    const {name, nationality, age, team, titles} = req.body
    if (name && nationality) {
      coaches.name = name
      coaches.nationality = nationality
      coaches.age = age
      coaches.team = team
      coaches.titles = titles

      coaches.save()
        .then(storedCoach => {
          storedCoach
            ? res.status(200).json({coach: storedCoach})
            : res.status(404).send({message: "Error saving the document"})
        })
        .catch(error => res.status(500).send({message: "Error while saving the document"}))
    } else {
      return res.status(400).send({message: "Data is not right"})
    }
  },
  updateCoach: function (req, res) {
    let coachId = req.params.id
    let update = req.body

    Coach.findByIdAndUpdate(coachId, update, {returnDocument: 'after'})
      .then(updatedCoach => {
        if(!updatedCoach) return res.status(404).send({message: "The document does not exist"})
        return res.status(200).send({coach: updatedCoach})
      })
      .catch(error => res.status(500).send({message: `Error while updating ${error}`}))
  },
  deleteCoach: function (req, res) {
    let coachId = req.params.id

    Coach.findByIdAndDelete(coachId)
      .then(removedCoach => {
        if (!removedCoach) return res.status(404).send({message: "The coach does not exist"})
        return res.status(200).send({coach: removedCoach})
      })
      .catch(err => res.status(500).send({message: "Error while deleting"}))
  }
}

module.exports = controller