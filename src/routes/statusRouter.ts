import Router from 'express'
import statusController from '../controllers/statusController'
import JWTCheck from '../middleware/authMiddleware'
const router = Router()

router.post('/', JWTCheck, statusController.create)
router.get('/', JWTCheck, statusController.getAll)
router.delete('/:id', JWTCheck, statusController.delete)

export default router