let mongoose = require('mongoose')
let Schema = mongoose.Schema

let PlayerSchema = Schema ({
  name: {type : String , required : true},
  posicion: String,
  dorsal: Number,
  equipo: {type : String , required : true },
  nationality: String,
  age: Number,
  height: Number,
  weight: Number,
  goals: Number,
  assists: Number,
  matches_played: Number,
  photo_url: String,

})

module.exports = mongoose.model('Players', PlayerSchema, 'players')