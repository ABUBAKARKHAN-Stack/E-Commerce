import { Router } from 'express'
import { createUser, getUser, loginUser, verifyUser, forgotPassword, resetPassword, logoutUser, updateUser, updateUserPassword, deleteUser, getWishList, sendContactMessage } from '../controllers/user.controller'
import authCheck from '../middlewares/auth.middleware';
import { verifyEmailMiddleware } from '../middlewares/verifyEmail.middleware';
import { resetPasswordMiddleware } from '../middlewares/resetPassword.middleware';

const router = Router();

router.post('/create', createUser)
router.post('/login', loginUser)
router.get('/verify/:email/:token', verifyEmailMiddleware, verifyUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPasswordMiddleware, resetPassword)
router.get('/get-profile', authCheck, getUser)
router.patch('/update/profile', authCheck, updateUser)
router.patch('/update/password', authCheck, updateUserPassword)
router.get('/logout', authCheck, logoutUser)
router.delete('/:id/delete', authCheck, deleteUser);
router.get('/wishlist', authCheck, getWishList);
router.post('/contact', sendContactMessage)

export default router
