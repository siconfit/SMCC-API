import { Router } from "express"
import { getCredits, getCredit, getClientCredits, createCredit, updateCredit, deleteCredit } from "../controllers/accounts.controller.js"

const router = Router()

router.get("/", getCredits)
router.get("/:id", getCredit)
router.get('/client/:id', getClientCredits)
router.post("/", createCredit)
router.put("/:id", updateCredit)
router.delete("/:id", deleteCredit)

export default router