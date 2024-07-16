import { Router } from "express"
import { getPeriods, getPeriod, createPeriod, updatePeriod, deletePeriod } from "../controllers/collection_period.controller.js"
const router = Router()

router.get('/', getPeriods)
router.get('/:id', getPeriod)
router.post('/', createPeriod)
router.put('/:id', updatePeriod)
router.delete('/:id', deletePeriod)

export default router