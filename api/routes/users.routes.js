import { Router } from 'express'
import { verifySubscription, mainAuth, secondaryAuth, getMain, getSecondary, createMain, createSecondary } from '../controllers/users.controller.js'

const router = Router()

router.post('subscription/:id', verifySubscription)
router.post('/mainAuth', mainAuth)
router.post('/secondaryAuth', secondaryAuth)
router.get('/main', getMain)
router.get('/secondary', getSecondary)
router.post('/main', createMain)
router.post('/secondary', createSecondary)

export default router