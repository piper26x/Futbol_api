let mongoose = require('mongoose')
let Schema = mongoose.Schema

let TournamentsSchema = Schema ({
  name: {type : String , required : true},
  year: {type : Number, required : true},
  country: String,
  teams: String,
  champion: String,

})

module.exports = mongoose.model('Tournaments', TournamentsSchema, 'tournaments')