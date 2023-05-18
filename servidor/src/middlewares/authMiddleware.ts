import { Request, Response, NextFunction } from 'express'
import jwt, { TokenExpiredError } from 'jsonwebtoken';
//const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'pigmeo123'
import dotenv from 'dotenv'
dotenv.config();

// decode token

const getIdUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        console.log('HEADER', authHeader)
        if (authHeader && authHeader !== "null") {
            const token = authHeader.split(" ")[1];
            console.log('TOKEN ', token)
            jwt.verify(authHeader, secretKey,(err: any, user: any) => {
                if (err) {
                  return res
                    .status(403)
                    .send({ success: false, message: "Token Expired" });
                }
                console.log('REQUEST OBJ ', req);
                //req.user = user;
            next();
        });
        }else {
            res.status(403).json({ success: false, message: "UnAuthorized" });
        }
      //const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //req.body.userId = decoded.userId;
    } catch (error) {
      res.send({
        message: "error",
        success: false,
      });
    }
  };

  export { getIdUser }