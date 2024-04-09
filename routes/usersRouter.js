import { Router } from 'express'
import { withAuth } from '../middleware/authHandler.js'

const router = Router()

import { signIn, handleCallback, getUser } from '../controllers/usersController.js'

router.get('/auth', signIn)
router.get('/callback', handleCallback)
router.get('', withAuth, getUser)
export default router