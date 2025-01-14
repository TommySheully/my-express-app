import { Router } from 'express'
import { createUserBd, deleteUserBd, getUserBdById, getUsersBd, updateUserBd } from '../controllers/user-bg-controller'
import { validateUserBd } from '../validations/users-bd'
import { validationMiddleware } from '../middlewares/users-bd'
import { checkEmailMiddleware } from '../middlewares/check-email'

const router = Router()

router.get('/', getUsersBd)
router.get('/:id', getUserBdById)
router.delete('/:id', deleteUserBd)

router.use(validationMiddleware)

router.post('/', validateUserBd, checkEmailMiddleware, createUserBd)
router.put('/:id', validateUserBd, updateUserBd)

export default router
