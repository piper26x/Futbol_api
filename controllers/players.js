let Player = require('../models/players')

const controller = {
  getPlayers: function (req, res) {
    Player.find({}).exec()
      .then(playersList => {
        if (!playersList) return res.status(404).send({message: "No data found"})
        return res.status(200).json(playersList)
      })
      .catch(err => res.status(500).send({message: `Error: ${err}`}))
  },
  getPlayer: function (req, res) {
    let playerId = req.params.id
    if (playerId == null) return res.status(404).send({message: "player not found"})

    Player.findById(playerId).exec()
      .then(data => {
        if (!data) return res.status(404).send({message: "player not found"})
        return res.status(200).json(data)
      })
      .catch(err => res.status(500).send({message: `Internal error-> ${err}`}))
  },
  savePlayer: function (req, res) {
    let players = new Player()
    const {
      name,
      posicion,
      dorsal,
      equipo,
      nationality,
      age,
      height,
      weight,
      goals,
      assists,
      matches_played,
      photo_url
    } = req.body

    if (name && equipo) {
      players.name = name
      players.posicion = posicion
      players.dorsal = dorsal
      players.equipo = equipo
      players.nationality = nationality
      players.age = age
      players.height = height
      players.weight = weight
      players.goals = goals
      players.assists = assists
      players.matches_played = matches_played
      players.photo_url = photo_url

      players.save()
        .then(storedPlayer => {
          storedPlayer
            ? res.status(200).json({player: storedPlayer})
            : res.status(404).send({message: "Error saving the document"})
        })
        .catch(error => res.status(500).send({message: "Error while saving the document"}))
    } else {
      return res.status(400).send({message: "Data is not right"})
    }
  },
  updatePlayer: function (req, res) {
    let playerId = req.params.id
    let update = req.body

    Player.findByIdAndUpdate(playerId, update, {returnDocument: 'after'})
      .then(updatedPlayer => {
        if(!updatedPlayer) return res.status(404).send({message: "The document does not exist"})
        return res.status(200).send({player: updatedPlayer})
      })
      .catch(error => res.status(500).send({message: `Error while updating ${error}`}))
  },
  deletePlayer: function (req, res) {
    let playerId = req.params.id

    Player.findByIdAndDelete(playerId)
      .then(removedPlayer => {
        if (!removedPlayer) return res.status(404).send({message: "The player does not exist"})
        return res.status(200).send({player: removedPlayer})
      })
      .catch(err => res.status(500).send({message: "Error while deleting"}))
  }
}

module.exports = controller