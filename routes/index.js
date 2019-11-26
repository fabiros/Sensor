import { Router} from 'express'
import User from './../routes/index'

const router = Router()

const register = (req, res, next) => {
  if (!req.params.username) return next(new Error('Username must be set.'))
  if (!req.params.password) return next(new Error('Password must be set.'))
  if (!req.params.email) return next(new Error('Email must be set.'))

  User.findByName(req.params.username, function (err, user) {
    if (err) return next(err)

    // if user not found register
    if (!user) {
      User.register(req.body.username, req.body.password, req.body.email, req.body.ldap, function (err, user) {
        user.createDate = new Date()
        // send if triggered but not for ldap users
        if (req.body.send && !user.ldap) {
          // send credentials email if requested
          agenda.now('sendCredentials', {
            user: user.username,
            email: user.email,
            password: req.body.password,
            baseUri: req.getBaseUrl()
          })
        }
        res.json({
          status: 'ok'
        })
      })
    } else return next(new Error('User already registered'))
  })
}



// Routes
router.get('/', (req, res) => {
    res.send('HELLO WORLD')
})

router.post('/', (req, res) => {
    res.send('HELLO WORLD')
})

export default router