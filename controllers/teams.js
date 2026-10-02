let Team = require('../models/teams');

const controller = {
  getTeams: function (req, res) {
    Team.find({}).exec()
      .then(teamsList => {
        if (!teamsList) return res.status(404).send({message: "No data found"})
        return res.status(200).json(teamsList)
      })
      .catch(err => res.status(500).send({message: `Error: ${err}`}))
  },
  getTeam: function (req, res) {
    let teamId = req.params.id
    if (teamId == null) return res.status(404).send({message: "team not found"})

    Team.findById(teamId).exec()
      .then(data => {
        if (!data) return res.status(404).send({message: "team not found"})
        return res.status(200).json(data)
      })
      .catch(err => res.status(500).send({message: `Internal error-> ${err}`}))
  },
  saveTeam: function (req, res) {
    let teams = new Team()
    const {
      name,
      year_foundation,
      stadium,
      lema,
      country,
      city,
      coach,
      titles,
      colors,
      logo_url
    } = req.body

    if (name && year_foundation) {
      teams.name = name
      teams.year_foundation = year_foundation
      teams.stadium = stadium
      teams.lema = lema
      teams.country = country
      teams.city = city
      teams.coach = coach
      teams.titles = titles
      teams.colors = colors
      teams.logo_url = logo_url

      teams.save()
        .then(storedTeam => {
          storedTeam
            ? res.status(200).json({team: storedTeam})
            : res.status(404).send({message: "Error saving the document"})
        })
        .catch(error => res.status(500).send({message: "Error while saving the document"}))
    } else {
      return res.status(400).send({message: "Data is not right"})
    }
  },
  updateTeam: function (req, res) {
    let teamId = req.params.id
    let update = req.body

    Team.findByIdAndUpdate(teamId, update, {returnDocument: 'after'})
      .then(updatedTeam => {
        if(!updatedTeam) return res.status(404).send({message: "The document does not exist"})
        return res.status(200).send({team: updatedTeam})
      })
      .catch(error => res.status(500).send({message: `Error while updating ${error}`}))
  },
  deleteTeam: function (req, res) {
    let teamId = req.params.id

    Team.findByIdAndDelete(teamId)
      .then(removedTeam => {
        if (!removedTeam) return res.status(404).send({message: "The team does not exist"})
        return res.status(200).send({team: removedTeam})
      })
      .catch(err => res.status(500).send({message: "Error while deleting"}))
  }
}

module.exports = controller