import { Router } from "express"
import { getRelations, getRelation, createRelation, updateRelation, deleteRelation } from "../controllers/users_clients.controller.js"

const router = Router()

router.get('/relations', getRelations)
router.get('/relations/:id', getRelation)
router.post('/relations', createRelation)
router.put('/relations/:id', updateRelation)
router.delete('/relations/:id', deleteRelation)

export default router