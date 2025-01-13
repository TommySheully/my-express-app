import { Router } from 'express'
import { createUserBd, deleteUserBd, getUserBdById, getUsersBd, updateUserBd } from '../controllers/user-bg-controller'
import { validateUserBd } from '../validations/users-bd'
import { validationMiddleware } from '../middlewares/users-bd'

const router = Router()

router.post('/', validateUserBd, createUserBd)
router.put('/:id', validateUserBd, updateUserBd)

router.use(validationMiddleware)

router.get('/', getUsersBd)
router.get('/:id', getUserBdById)
router.delete('/:id', deleteUserBd)

export default router
