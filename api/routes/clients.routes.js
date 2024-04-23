import { Router } from "express"
import { getClients, getClient, createClient, updateClient, deleteClient } from "../controllers/clients.controller.js"

const router = Router()

router.get('/clients', getClients)
router.get('/clients/:id', getClient)
router.post('/clients', createClient)
router.put('/clients', updateClient)
router.delete('/clients', deleteClient)

export default router