import db from "../db/db.js";
import itens from '../itens/itens.js'



async function ProductsGet(req,res){
   await db.collection('products').drop()
    await db.collection('products').insertMany(itens)
const produtos= await db.collection('products').find().toArray()

    res.send(produtos)

}



export {ProductsGet}