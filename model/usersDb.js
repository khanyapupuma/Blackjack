import {pool} from '../config/config.js'

const getUsersDb = async()=>{
    let [data] = await pool.query("SELECT * FROM Users ")
    return data
}
const selectUsersDb =  async(emailAdd)=>{
    let [[data]] = await pool.query('SELECT *FROM Users WHERE emailAdd= ?',[emailAdd])
    return data? data : '';
}
const selectUserDb =  async(userID)=>{
    let [[data]] = await pool.query('SELECT *FROM Users WHERE userID= ?',[userID])
    return data;
}
const insertUserDb =async(firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile)=>{
    let [data] =await pool.query(`
        INSERT INTO Users(firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile)
        VALUES (?,?,?,?,?,?,?,?)
        `,[firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile])
     return data
    }
    const deleteUserDb=async(userID)=>{
        await pool.query(' DELETE FROM Users WHERE userID = ?',[userID])
           }

    const updateUserDb=async(firstName,lastName,userAge,Gender,emailAdd,userProfile, userID)=>{
          await pool.query('UPDATE Users SET firstName = ?, lastName = ?, userAge = ?, Gender = ?, emailAdd = ?  ,userProfile = ? WHERE userID = ?', [firstName,lastName,userAge,Gender,emailAdd,userProfile, userID]);
        };

export {getUsersDb,selectUsersDb,insertUserDb,deleteUserDb,updateUserDb,selectUserDb}