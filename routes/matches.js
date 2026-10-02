const { Router } = require('express')
const matchesController = require('../controllers/matches')

const router = Router()

router.get('/', matchesController.getMatches)
router.get('/:id', matchesController.getMatch)
router.post('/save-match', matchesController.saveMatch)
router.put('/edit-match/:id', matchesController.updateMatch)
router.delete('/delete-match/:id', matchesController.deleteMatch)

module.exports = router