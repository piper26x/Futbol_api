let mongoose = require('mongoose')
const app = require('./app')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1:27017/Futbol')
  .then(() => {
    console.log('Database connected successfully')

    app.listen(app.get('port'), () => {
      console.log(`Server running at http://localhost:${app.get('port')}`)
    })
  })
  .catch(err => console.error(err))