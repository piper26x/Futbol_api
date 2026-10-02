const { Router } = require('express')
const stadiumsController = require('../controllers/stadiums')

const router = Router()

router.get('/', stadiumsController.getStadiums)
router.get('/:id', stadiumsController.getStadium)
router.post('/save-stadium', stadiumsController.saveStadium)
router.put('/edit-stadium/:id', stadiumsController.updateStadium)
router.delete('/delete-stadium/:id', stadiumsController.deleteStadium)

module.exports = router