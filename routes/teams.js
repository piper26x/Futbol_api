const { Router } = require('express')
const teamsController = require('../controllers/teams')

const router = Router()

router.get('/', teamsController.getTeams)
router.get('/:id', teamsController.getTeam)
router.post('/save-team', teamsController.saveTeam)
router.put('/edit-team/:id', teamsController.updateTeam)
router.delete('/delete-team/:id', teamsController.deleteTeam)

module.exports = router