import { Router } from "express"
import { getPayments, searchPayments, createPayment, confirmPayment, postponePayment } from "../controllers/payments.controller.js"

const router = Router()

router.get("/credit/:id", getPayments)
// router.get("/:id", getPayment)
router.post("/search", searchPayments)
router.post("/", createPayment)
router.put("/confirm/:id", confirmPayment)
router.put("/postpone/:id", postponePayment)
// router.delete("/:id", deletePayment)

export default router