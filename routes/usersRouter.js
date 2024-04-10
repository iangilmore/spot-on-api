import { Router } from 'express'
import { withAuth } from '../middleware/authHandler.js'

const router = Router()

import { auth, handleCallback, logOut, getUser } from '../controllers/usersController.js'


// User
router.get('/auth', auth)
router.get('/callback', handleCallback)
router.get('/log-out', logOut)
router.get('', withAuth, getUser)
// router.put('', withAuth, updateUser)
// router.delete('', withAuth, deleteUser)

// Puzzle


// PuzzleCard


// Result



export default router