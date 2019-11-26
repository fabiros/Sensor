import { Router } from 'express';
import User from '../models';

const router = Router();

const register = (req, res, next) => {
    if (!req.params.username) {
        return next(new Error('Username must be set.'));
    }
    if (!req.params.password) {
        return next(new Error('Password must be set.'));
    }
    if (!req.params.email) {
        return next(new Error('Email must be set.'));
    }

    User.findByName(req.params.username, (error, user) => {
        if (error) {
            return next(error);
        }

        // if user not found register
        if (!user) {
            User.register(
                req.body.username,
                req.body.password,
                req.body.email,
                (err, newUser) => {
                    if (err || !newUser) {
                        return next(
                            new Error(
                                'Something happend. Could not create new User'
                            )
                        );
                    }
                    res.json({
                        status: 'ok',
                    });
                    return next();
                }
            );
        } else {
            return next(new Error('User already registered'));
        }
    });
};

// Routes
router.get('/', (req, res) => {
    res.send('HELLO WORLD');
});

router.post('/', (req, res) => {
    res.send('HELLO WORLD');
});

export default router;
