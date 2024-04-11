import { Router } from "express"
import { withAuth } from "../middleware/authHandler.js"

const router = Router()

import { getResults, getResult, createResults, updateResult, deleteResult } from "../controllers/resultsController.js"

router.get('/', withAuth, getResults)
router.get('/:resultId', withAuth, getResult)
router.post('/', withAuth, createResults)
router.patch('/:resultId', withAuth, updateResult)
router.delete('/:resultId', withAuth, deleteResult)

export default router