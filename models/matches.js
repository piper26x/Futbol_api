let mongoose = require('mongoose')
let Schema = mongoose.Schema

let MatchesSchema = Schema ({
  home_team: {type :String , required: true},
  away_team: {type : String, required: true},
  date: Date,
  stadium: String,
  home_score: Number,
  away_score: Number,
  competition: String,

})

module.exports = mongoose.model('Matches', MatchesSchema, 'matches')