import { Router } from "express"
import { adminAuth, createMain, createSecondary, getMain, getSecondary } from "../controllers/superadmin.controller.js"

const router = Router()

router.post("/adminAuth", adminAuth)
router.post("/create-main", createMain)
router.post("/create-secondary", createSecondary)
router.get("/get-main", getMain)
router.get("/get-secondary/:id", getSecondary)

export default router