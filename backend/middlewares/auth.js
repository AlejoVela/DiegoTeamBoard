const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  let jwToken = req.header('Authorization');
  if(!jwToken) return res.status(400).send('Authorization denied: No Token');

  jwToken = jwToken.split(' ');
  if(!jwToken) return res.status(400).send('Authorization denied: No Token');

  try {
    let payload = await jwt.verify(jwToken, process.env.SECRET_KEYWORD);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send('Authorization denied: Invalid Token');
  }
};

module.exports = auth;