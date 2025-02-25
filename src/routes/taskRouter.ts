import Router from 'express'
import taskController from '../controllers/taskController'
import JWTCheck from '../middleware/authMiddleware'
const router = Router()

router.post('/', JWTCheck, taskController.create) // create task
router.put('/:id', JWTCheck, taskController.updateTask) // update task
router.get('/', JWTCheck, taskController.getAll) // get all tasks
router.get('/:id', JWTCheck, taskController.getOne) // get task by id
router.delete('/:id', JWTCheck, taskController.delete) // delete task by id

export default router