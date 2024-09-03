import {compare} from 'bcrypt'
import { selectUsersDb } from '../model/usersDb.js'
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'

config()
const checkUser=async(req,res,next)=>{
    const {emailAdd, userPass} =req.body
    let hashedP =(await selectUsersDb(emailAdd)).userPass
    console.log(hashedP);

let result = await compare(userPass,hashedP )
console.log(result);

        if(result ==true) {
            let token =jwt.sign({emailAdd:emailAdd},process.env.SECRET_KEY)
            req.body.token =token
             next()
        }else{
            res.send("Please sign in with the correct  Password/Email  !!")
        }
}
const verifyAToken =(req,res,next)=>{
    jwt.verify(token ,process.env.SECRET_KEY,(err,decoded)=>{
        if(err){
            res.json({message:'Token invalid'})
        }else{
              req.body.user =decoded.emailAdd
           next()
        }
    })
}

export {checkUser,verifyAToken}