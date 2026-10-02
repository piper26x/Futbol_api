let mongoose = require('mongoose')
let Schema = mongoose.Schema

let TeamsSchema = Schema ({
  name: { type : String , required : true },
  year_foundation: {  type : Number, required : true }, 
  stadium: String,
  lema: String,
  country: String,
  city: String,
  coach: String,
  titles: Number,
  colors: String,
  logo_url: String,

})

module.exports = mongoose.model('Teams', TeamsSchema, 'teams')