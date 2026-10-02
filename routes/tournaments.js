const { Router } = require('express')
const tournamentsController = require('../controllers/tournaments')

const router = Router()

router.get('/', tournamentsController.getTournaments)
router.get('/:id', tournamentsController.getTournament)
router.post('/save-tournament', tournamentsController.saveTournament)
router.put('/edit-tournament/:id', tournamentsController.updateTournament)
router.delete('/delete-tournament/:id', tournamentsController.deleteTournament)

module.exports = router