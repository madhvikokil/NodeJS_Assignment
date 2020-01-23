import jwt from 'jsonwebtoken';

class TokenVerification {
    tokenCheck = (req, res, next) => {
      const token = req.headers.token;
      if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
      jwt.verify(token, process.env.TOKEN, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        req.user = decoded;
        next();
      });
    };
}

export default new TokenVerification();
