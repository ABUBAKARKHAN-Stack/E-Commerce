import { Router } from 'express'
import { createAdmin, getAdmin, verifyAdmin, loginAdmin, forgotPassword, resetPassword, logoutAdmin, updateAdmin, updateAdminPassword, deleteAdmin } from '../controllers/admin.controller'
import authCheck from '../middlewares/auth.middleware';
import { resetPasswordMiddleware } from '../middlewares/resetPassword.middleware';
import { verifyEmailMiddleware } from '../middlewares/verifyEmail.middleware';

const router = Router();

router.post('/create', createAdmin)
router.post('/login', loginAdmin)
router.get('/verify/:email/:token', verifyEmailMiddleware, verifyAdmin)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPasswordMiddleware, resetPassword)
router.get('/get-profile', authCheck, getAdmin)
router.patch('/update/profile', authCheck, updateAdmin)
router.patch('/update/password', authCheck, updateAdminPassword)
router.get('/logout', authCheck, logoutAdmin)
router.delete('/:id/delete', deleteAdmin)

export default router
