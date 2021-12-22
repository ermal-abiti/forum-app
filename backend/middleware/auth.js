import jwt from "jsonwebtoken";
import { config as cnf } from "dotenv";

cnf();

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.cookies['token'];

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