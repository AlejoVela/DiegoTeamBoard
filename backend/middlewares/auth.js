const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  let jwToken = req.header('Authorization');
  if(!jwToken) return res.status(400).send('Process Failed: No Token');

  jwToken = jwToken.split(' ');
  if(!jwToken) return res.status(400).send('Process Failed: No Token');

  try {
    let payload = await jwt.verify(jwToken, process.env.SECRET_KEYWORD);
    req.
  } catch (error) {
    
  }
};

module.exports = auth;