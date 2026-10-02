let Tournament = require('../models/tournaments')

const controller = {
  getTournaments: function (req, res) {
    Tournament.find({}).exec()
      .then(tournamentsList => {
        if (!tournamentsList) return res.status(404).send({message: "No data found"})
        return res.status(200).json(tournamentsList)
      })
      .catch(err => res.status(500).send({message: `Error: ${err}`}))
  },
  getTournament: function (req, res) {
    let tournamentId = req.params.id
    if (tournamentId == null) return res.status(404).send({message: "tournament not found"})

    Tournament.findById(tournamentId).exec()
      .then(data => {
        if (!data) return res.status(404).send({message: "tournament not found"})
        return res.status(200).json(data)
      })
      .catch(err => res.status(500).send({message: `Internal error-> ${err}`}))
  },
  saveTournament: function (req, res) {
    let tournaments = new Tournament()
    const {name, year, country, teams, champion} = req.body
    if (name && year) {
      tournaments.name = name
      tournaments.year = year
      tournaments.country = country
      tournaments.teams = teams
      tournaments.champion = champion

      tournaments.save()
        .then(storedTournament => {
          storedTournament
            ? res.status(200).json({tournament: storedTournament})
            : res.status(404).send({message: "Error saving the document"})
        })
        .catch(error => res.status(500).send({message: "Error while saving the document"}))
    } else {
      return res.status(400).send({message: "Data is not right"})
    }
  },
  updateTournament: function (req, res) {
    let tournamentId = req.params.id
    let update = req.body

    Tournament.findByIdAndUpdate(tournamentId, update, {returnDocument: 'after'})
      .then(updatedTournament => {
        if(!updatedTournament) return res.status(404).send({message: "The document does not exist"})
        return res.status(200).send({tournament: updatedTournament})
      })
      .catch(error => res.status(500).send({message: `Error while updating ${error}`}))
  },
  deleteTournament: function (req, res) {
    let tournamentId = req.params.id

    Tournament.findByIdAndDelete(tournamentId)
      .then(removedTournament => {
        if (!removedTournament) return res.status(404).send({message: "The tournament does not exist"})
        return res.status(200).send({tournament: removedTournament})
      })
      .catch(err => res.status(500).send({message: "Error while deleting"}))
  }
}

module.exports = controller