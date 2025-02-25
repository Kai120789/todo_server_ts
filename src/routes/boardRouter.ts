import Router from 'express'
import boardsController from '../controllers/boardController'
import JWTCheck from '../middleware/authMiddleware'
const router = Router()

router.post('/', JWTCheck, boardsController.create) // create board
router.put('/:id', JWTCheck, boardsController.update) // update board
router.get('/', JWTCheck, boardsController.getAll) // get all boards
router.get('/:id', JWTCheck, boardsController.getOne) // get board by id
router.delete('/:id', JWTCheck, boardsController.delete) // delete board by id

router.post('/add/:boardId', JWTCheck, boardsController.addUserToBoard) // add user to board
router.get('/user/:userId', JWTCheck, boardsController.getAllBoardsByUserID) // get all boards

export default router