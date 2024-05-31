import { Router } from "express"
import { getRelationsUser, createRelation } from "../controllers/users_clients.controller.js"

const router = Router()

// router.get('/', getRelations)
// router.get('/:id', getRelation)
router.get('/user/:id', getRelationsUser)
router.post('/', createRelation)
// router.put('/:id', updateRelation)
// router.delete('/:id', deleteRelation)

export default router