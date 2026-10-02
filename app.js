const express = require('express')
const player_routes = require('./routes/players')
const teams_routes = require('./routes/teams')
const matches_routes = require('./routes/matches')
const tournaments_routes = require('./routes/tournaments')
const stadiums_routes = require('./routes/stadiums')
const coaches_routes = require('./routes/coaches')


const app = express()

// settings
app.set('port', process.env.PORT || 3000)

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
app.use('/api/players', player_routes)
app.use('/api/teams', teams_routes)
app.use('/api/matches', matches_routes)
app.use('/api/tournaments', tournaments_routes)
app.use('/api/stadiums', stadiums_routes)
app.use('/api/coaches', coaches_routes)


module.exports = app