import express from 'express';
import { ProductsGet } from '../controllers/productsController.js'
import { shopAuthorization } from '../middlewares/shopMiddleware.js';


const shopRouter=express.Router()

const server = express();

server.use(shopAuthorization)

shopRouter.get('/produtos',shopAuthorization,ProductsGet)

export default  shopRouter