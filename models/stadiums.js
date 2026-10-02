let mongoose = require('mongoose')
let Schema = mongoose.Schema

let StadiumsSchema = Schema ({
  name: {type : String , required : true},
  city: {type : String , required : true},
  capacity: Number,
  year_built: Number,
  team: String,

})

module.exports = mongoose.model('Stadiums', StadiumsSchema, 'stadiums')