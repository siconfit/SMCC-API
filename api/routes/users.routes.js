import { Router } from 'express'
import { verifySubscription, mainAuth, secondaryAuth, getMain, getSecondary } from '../controllers/users.controller.js'

const router = Router()

router.get('/subscription/:id', verifySubscription)
router.post('/mainAuth', mainAuth)
router.post('/secondaryAuth', secondaryAuth)
router.get('/main', getMain)
router.get('/secondary', getSecondary)

export default router