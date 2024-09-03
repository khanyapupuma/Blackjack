import express from 'express'
import {getProducts,selectProduct,deleteProduct, updateProduct,insertProduct} from '../controller/productsController.js'

const router = express.Router()
router.get('/',getProducts)
router.get('/:id',selectProduct)
router.delete('/delete/:id',deleteProduct)
router.post('/addProduct',insertProduct)

router.patch('/update/:id',updateProduct)




export default router