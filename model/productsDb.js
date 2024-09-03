import {pool} from '../config/config.js'

const getProductsDb = async()=>{
    let [data] = await pool.query("SELECT * FROM Movies ")
    return data
}

 
const selectProductsDb =  async(prodID)=>{
    let [[data]] = await pool.query('SELECT *FROM Movies WHERE prodID = ?',[prodID])
    return data; 
    
    
}
const deleteProductDb=async(prodID)=>{
    await pool.query(' DELETE FROM Movies WHERE prodID = ?',[prodID])
       }

       const insertProductDb =async(prodName,Quantity,Amount,Category,prodURL,prodDescription)=>{
        let [data] =await pool.query(`
            INSERT INTO products(prodName,Quantity,Amount,Category,prodURL,prodDescription)
            VALUES (?,?,?,?,?,?)
            `,[prodName,Quantity,Amount,Category,prodURL,prodDescription])
         return data
        }  
       
const updateProductDb=async(prodID,prodName,Quantity,Amount,Category,prodURL,prodDescription )=>{
        
        await pool.query('UPDATE products SET prodName = ?, Quantity= ?, Amount= ?, Category = ?, prodURL= ?, prodDescription=? WHERE prodID = ?', [prodID,prodName,Quantity,Amount,Category,prodURL,prodDescription]);

      }; 
export {getProductsDb,selectProductsDb,deleteProductDb,updateProductDb,insertProductDb}