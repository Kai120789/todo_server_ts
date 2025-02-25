import Router from 'express'
import userController from '../controllers/userController'
import JWTCheck from '../middleware/authMiddleware'
const router = Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/', JWTCheck, userController.check)
router.delete('/logout', JWTCheck, userController.logout)

export default router