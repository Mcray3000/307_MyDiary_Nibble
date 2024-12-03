import jwt from "jsonwebtoken";

export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader;

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (error, decoded) => {
        if (error) {
          console.log("JWT error:", error);
          res.status(401).end(); 
        }
        const user_name = decoded.username;
        req.user_name = user_name;
        console.log(req.user_name);
        next();
        }
    );
  }
}