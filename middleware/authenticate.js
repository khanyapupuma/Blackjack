import {compare} from 'bcrypt'
import { selectUserDb } from '../model/usersDb.js'
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'

config()
const authenticateUser = async (req, res, next) => {
    const { emailAdd, userPass } = req.body;
    const user = await selectUserDb(emailAdd);
    if (!user) {
      return res.status(401).send('Invalid credentials!');
    }
  
    const isValid = await bcrypt.compare(userPass, user.userPass);
    if (!isValid) {
      return res.status(401).send('Invalid credentials!');
    }
  
    req.isAuthenticated = true;
    req.token = generateToken(user); // generate a token for the user
    next();
  };
const verifyAToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalid' });
        } else {
            req.body.user = decoded.emailAdd;
            next();
        }
    });
};


export {authenticateUser,verifyAToken}