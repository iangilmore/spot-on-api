import { Router } from 'express'
import { withAuth } from '../middleware/authHandler.js'

const router = Router()

import { auth, handleCallback, logOut, getUser, updateUser, deleteUser } from '../controllers/usersController.js'

router.get('/auth', auth)
router.get('/callback', handleCallback)
router.get('/log-out', logOut)
router.get('/', withAuth, getUser)
router.patch('/', withAuth, updateUser)
router.delete('/', withAuth, deleteUser)

export default router