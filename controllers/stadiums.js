let Stadium = require('../models/stadiums')

const controller = {
  getStadiums: function (req, res) {
    Stadium.find({}).exec()
      .then(stadiumsList => {
        if (!stadiumsList) return res.status(404).send({message: "No data found"})
        return res.status(200).json(stadiumsList)
      })
      .catch(err => res.status(500).send({message: `Error: ${err}`}))
  },
  getStadium: function (req, res) {
    let stadiumId = req.params.id
    if (stadiumId == null) return res.status(404).send({message: "stadium not found"})

    Stadium.findById(stadiumId).exec()
      .then(data => {
        if (!data) return res.status(404).send({message: "stadium not found"})
        return res.status(200).json(data)
      })
      .catch(err => res.status(500).send({message: `Internal error-> ${err}`}))
  },
  saveStadium: function (req, res) {
    let stadiums = new Stadium()
    const {name, city, capacity, year_built, team} = req.body
    if (name && city) {
      stadiums.name = name
      stadiums.city = city
      stadiums.capacity = capacity
      stadiums.year_built = year_built
      stadiums.team = team

      stadiums.save()
        .then(storedStadium => {
          storedStadium
            ? res.status(200).json({stadium: storedStadium})
            : res.status(404).send({message: "Error saving the document"})
        })
        .catch(error => res.status(500).send({message: "Error while saving the document"}))
    } else {
      return res.status(400).send({message: "Data is not right"})
    }
  },
  updateStadium: function (req, res) {
    let stadiumId = req.params.id
    let update = req.body

    Stadium.findByIdAndUpdate(stadiumId, update, {returnDocument: 'after'})
      .then(updatedStadium => {
        if(!updatedStadium) return res.status(404).send({message: "The document does not exist"})
        return res.status(200).send({stadium: updatedStadium})
      })
      .catch(error => res.status(500).send({message: `Error while updating ${error}`}))
  },
  deleteStadium: function (req, res) {
    let stadiumId = req.params.id

    Stadium.findByIdAndDelete(stadiumId)
      .then(removedStadium => {
        if (!removedStadium) return res.status(404).send({message: "The stadium does not exist"})
        return res.status(200).send({stadium: removedStadium})
      })
      .catch(err => res.status(500).send({message: "Error while deleting"}))
  }
}

module.exports = controller