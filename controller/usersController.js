import { getUsersDb,selectUsersDb,insertUserDb,deleteUserDb,updateUserDb,selectUserDb} from '../model/usersDb.js'
import {hash} from 'bcrypt'

const getUsers =async(req,res)=>{
    try{
    res.json(await getUsersDb())
    }catch(e){
        res.status(500).send('Server error!')
    }
}

const selectUser = async(req,res)=>{
    // console.log(req.params.id);
    try{
     res.json(await selectUserDb(req.params.id))
    }catch(e){
        res.status(400).send('Unable to get user !')
    }
    // res.send('Endpoint reached !')
}


const insertUser =async(req,res)=>{
    let {firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile}= req.body
    let existingEmail = (await selectUsersDb(emailAdd)).emailAdd
    if (emailAdd == existingEmail) {
        res.status(403).send('Email already exists')
        return
    } else{
        userRole = 'user'
        userProfile = 'https://codjoelmayer.github.io/projectImages/images/profile-Image.png'

        hash(userPass,10,async(err,hashedP)=>{
            if(err) throw err
            console.log(hashedP);

            try{
                await insertUserDb(firstName,lastName,userAge,Gender,userRole,emailAdd,hashedP,userProfile)
                res.send('Data was inserted successfully !')
            }catch(e){
                res.status(400).send('All fields must be filled in , re-insert data !')
            }
        })
    }
}
const deleteUser = async(req,res)=>{
    try{
       await deleteUserDb(req.params.id)
    res.status(200).send({
        status : res.statusCode,
        msg:  'User deleted successfully !'

    })
    }catch(e){
        res.status(400).send(
            {   
                status :  res.statusCode,
                failedMsg : 'Invalid User !'
            }
        )
    }
}
    const updateUser=async(req,res)=>{
       try{

        let {firstName,lastName,userAge,Gender,emailAdd,userProfile}=req.body
        console.log(req.body);

        let user =await selectUserDb(req.params.id)
        firstName? firstName=firstName: firstName = user.firstName
        lastName? lastName=lastName: lastName = user.lastName
        userAge? userAge=userAge: userAge = user.userAge
        Gender ? Gender=Gender: Gender = user.Gender
        emailAdd ?  emailAdd= emailAdd:  emailAdd = user.emailAdd
        userProfile ?   userProfile=  userProfile:   userProfile = user.userProfile
        res.json({
            results: await updateUserDb(firstName,lastName,userAge,Gender,emailAdd,userProfile, req.params.id),
            msg: 'Data was successfully updated ! '
        })}catch(e){
            res.status(500).send('Server error !!')
        }
    }

    const loginUser = async (req, res) => {
        if (req.isAuthenticated) {
          res.json({ message: "Successfully Logged in!!", token: req.token });
        } else {
          res.status(401).send('Invalid credentials!');
        }
      };


export{getUsers,selectUser,insertUser,deleteUser,loginUser,updateUser}