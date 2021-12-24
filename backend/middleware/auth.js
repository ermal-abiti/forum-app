import jwt from "jsonwebtoken";
import { config as cnf } from "dotenv";
import { LocalStorage } from "node-localstorage";

const localStorage = new LocalStorage('./');

cnf();

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["authorization"] || req.headers["token"] || req.cookies['token'] || localStorage.getItem('token');

  if (!token) {
    return res.status(403).send("You need to be authenticated to access this endpoint!");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;