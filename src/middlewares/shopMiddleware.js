import db from  "../db/db.js";

async function shopAuthorization(req,res,next){
    const token=req.headers.authorization
    if (!token){return res.status(401).send('token não encontrado!')}
        const session = await mongo.collection('sessions').findOne({token});
        if(!session){return res.status(401).send('token inválido')}
    const user=await db.collection('users').find({_id:session.userId}).toArray();
    if(!user) { return res.status(401).send('usuário não encontrado')};
    next()
}

export {shopAuthorization}