const { Router } = require('express')
const coachesController = require('../controllers/coaches')

const router = Router()

router.get('/', coachesController.getCoaches)
router.get('/:id', coachesController.getCoach)
router.post('/save-coach', coachesController.saveCoach)
router.put('/edit-coach/:id', coachesController.updateCoach)
router.delete('/delete-coach/:id', coachesController.deleteCoach)

module.exports = router