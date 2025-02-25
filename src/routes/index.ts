import Router from 'express'
const router = Router()
import userRouter from './userRouter'
import statusRouter from './statusRouter'
import boardRouter from './boardRouter'
import taskRouter from './taskRouter'

router.use('/user', userRouter)
router.use('/status', statusRouter)
router.use('/board', boardRouter)
router.use('/task', taskRouter)

export default router