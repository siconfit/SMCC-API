import { Router } from "express"
import { adminAuth, createMain, createSecondary } from "../controllers/superadmin.controller.js"

const router = Router()

router.post("/adminAuth", adminAuth)
router.post("/create-main", createMain)
router.post("/create-secondary", createSecondary)

export default router