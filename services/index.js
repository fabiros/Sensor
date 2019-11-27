import bcrypt from 'bcrypt-nodejs';
import Logger from '../lib';

const hashPassword = (password, cb) => {
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        return cb(err, hash);
    });
};

export { hashPassword };
export default hashPassword;
