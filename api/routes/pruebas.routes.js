import { Router } from "express"
import { getPruebas, getPrueba, createPrueba, updatePrueba, deletePrueba } from "../controllers/pruebas.controller.js"

const router = Router()

router.get('/pruebas', getPruebas)
router.get('/pruebas/:id', getPrueba)
router.post('/pruebas', createPrueba)
router.put('/pruebas/:id', updatePrueba)
router.delete('/pruebas/:id', deletePrueba)

export default router