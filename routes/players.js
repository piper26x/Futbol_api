const { Router } = require('express')
const playersController = require('../controllers/players')

const router = Router()

router.get('/', playersController.getPlayers)
router.get('/:id', playersController.getPlayer)
router.post('/save-player', playersController.savePlayer)
router.put('/edit-player/:id', playersController.updatePlayer)
router.delete('/delete-player/:id', playersController.deletePlayer)

module.exports = router