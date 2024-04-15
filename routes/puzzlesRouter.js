import { Router } from 'express'
import { withAuth } from '../middleware/authHandler.js'

const router = Router()

import { getPuzzles, getPuzzle, createPuzzles, updatePuzzle, deletePuzzle } from "../controllers/puzzlesController.js"

router.get('/', getPuzzles)
router.get('/:puzzleId', getPuzzle)
router.post('/', withAuth, createPuzzles)
router.patch('/:puzzleId', withAuth, updatePuzzle)
router.delete('/:puzzleId', withAuth, deletePuzzle)

export default router