let mongoose = require('mongoose')
let Schema = mongoose.Schema

let CoachesSchema = Schema ({
  name: {type : String, required : true},
  nationality: {type : String, required : true},
  age: Number,
  team: String,
  titles: Number,

})

module.exports = mongoose.model('Coaches', CoachesSchema, 'coaches')