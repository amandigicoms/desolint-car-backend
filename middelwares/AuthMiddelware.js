import jwt from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );

    req.user = decode;
    next();
  } catch (err) {
    return res.status(500).send({
      message: "Sign in required",
    });
  }
};
