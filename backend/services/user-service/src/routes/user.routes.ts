import { Router } from 'express'
import { createUser , loginUser , logoutUser } from '../controllers/user.controller'

const router = Router();

router.post('/create', createUser as any)
router.post('/login', loginUser as any )
router.get('/logout', logoutUser as any)

export default router
