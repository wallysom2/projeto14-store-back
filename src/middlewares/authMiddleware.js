import mongo from '../db/db.js';

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(400);
  }

  try {
    const session = await mongo.collection('sessions').findOne({
      token,
    });

    if (!session) {
      return res.status(401);
    }

    const user = await mongo.collection('users').findOne({
      _id: session.userId,
    });

    res.locals.session = session;
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}

export { authMiddleware };