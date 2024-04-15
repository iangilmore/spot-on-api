import { Router } from "express"
import { withAuth } from "../middleware/authHandler.js"

const router = Router()

import { getPuzzleCards, getPuzzleCard, createPuzzleCards, updatePuzzleCard, deletePuzzleCard } from "../controllers/puzzleCardsController.js"

router.get('/', getPuzzleCards)
router.get('/:puzzleCardId', getPuzzleCard)
router.post('/', withAuth, createPuzzleCards)
router.patch('/:puzzleCardId', withAuth, updatePuzzleCard)
router.delete('/:puzzleCardId', withAuth, deletePuzzleCard)

export default router