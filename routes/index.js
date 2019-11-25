import { Router } from 'express'
import User from './../routes/index'

const router = Router()

router.get('/', (req, res) => {
    res.send('HELLO WORLD')
})

export default router