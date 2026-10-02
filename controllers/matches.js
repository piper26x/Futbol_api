let Match = require('../models/matches')

const controller = {
  getMatches: function (req, res) {
    Match.find({}).exec()
      .then(matchesList => {
        if (!matchesList) return res.status(404).send({message: "No data found"})
        return res.status(200).json(matchesList)
      })
      .catch(err => res.status(500).send({message: `Error: ${err}`}))
  },
  getMatch: function (req, res) {
    let matchId = req.params.id
    if (matchId == null) return res.status(404).send({message: "match not found"})

    Match.findById(matchId).exec()
      .then(data => {
        if (!data) return res.status(404).send({message: "match not found"})
        return res.status(200).json(data)
      })
      .catch(err => res.status(500).send({message: `Internal error-> ${err}`}))
  },
  saveMatch: function (req, res) {
    let matches = new Match()
    const {home_team, away_team, date, stadium, home_score, away_score, competition} = req.body
    if (home_team && away_team) {
      matches.home_team = home_team
      matches.away_team = away_team
      matches.date = date
      matches.stadium = stadium
      matches.home_score = home_score
      matches.away_score = away_score
      matches.competition = competition

      matches.save()
        .then(storedMatch => {
          storedMatch
            ? res.status(200).json({match: storedMatch})
            : res.status(404).send({message: "Error saving the document"})
        })
        .catch(error => res.status(500).send({message: "Error while saving the document"}))
    } else {
      return res.status(400).send({message: "Data is not right"})
    }
  },
  updateMatch: function (req, res) {
    let matchId = req.params.id
    let update = req.body

    Match.findByIdAndUpdate(matchId, update, {returnDocument: 'after'})
      .then(updatedMatch => {
        if(!updatedMatch) return res.status(404).send({message: "The document does not exist"})
        return res.status(200).send({match: updatedMatch})
      })
      .catch(error => res.status(500).send({message: `Error while updating ${error}`}))
  },
  deleteMatch: function (req, res) {
    let matchId = req.params.id

    Match.findByIdAndDelete(matchId)
      .then(removedMatch => {
        if (!removedMatch) return res.status(404).send({message: "The match does not exist"})
        return res.status(200).send({match: removedMatch})
      })
      .catch(err => res.status(500).send({message: "Error while deleting"}))
  }
}

module.exports = controller